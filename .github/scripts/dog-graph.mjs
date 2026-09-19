// Dog contribution graph: a pixel dog walks your contribution grid
// and your green squares pop in behind it, row by row.
// Usage in Actions: GITHUB_TOKEN + GITHUB_USER env vars.
// Local demo (random data): node dog-graph.mjs --demo

import { mkdirSync, writeFileSync } from 'node:fs';

const DEMO = process.argv.includes('--demo');
const USER = process.env.GITHUB_USER;
const TOKEN = process.env.GITHUB_TOKEN;
const OUT = 'dist';

// ---------- data ----------
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

async function fetchWeeks() {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{contributionLevel weekday}}}}}}`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'dog-graph' },
    body: JSON.stringify({ query, variables: { login: USER } }),
  });
  const json = await res.json();
  if (json.errors || !json.data) throw new Error(JSON.stringify(json.errors || json));
  return json.data.user.contributionsCollection.contributionCalendar.weeks.map((w) => {
    const col = Array(7).fill(null);
    for (const d of w.contributionDays) col[d.weekday] = LEVELS[d.contributionLevel];
    return col;
  });
}

function demoWeeks() {
  return Array.from({ length: 53 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) =>
      w === 52 && d > 3 ? null : Math.random() < 0.55 ? 0 : 1 + Math.floor(Math.random() * 4)));
}

// ---------- look ----------
const THEMES = {
  light: { empty: '#ebedf0', levels: [null, '#9be9a8', '#40c463', '#30a14e', '#216e39'] },
  dark: { empty: '#161b22', levels: [null, '#0e4429', '#006d32', '#26a641', '#39d353'] },
};

const CELL = 11, STEP = 14, PADX = 14, PADY = 18;

// Pixel dog, 10x8 grid, facing right. [x, y, color]
const TAN = '#d9a066', BROWN = '#8a5a2b', BLACK = '#1b1b1b', COLLAR = '#3b82f6';
const U = 2; // pixel size
const DOG_BODY = [
  // body
  ...[1, 2, 3, 4, 5].flatMap((x) => [3, 4, 5].map((y) => [x, y, TAN])),
  [3, 3, BROWN], [4, 3, BROWN], // back spot
  // head
  ...[6, 7, 8].flatMap((x) => [1, 2, 3].map((y) => [x, y, TAN])),
  [9, 2, TAN], [9, 3, TAN], // snout
  [9, 2, BLACK], // nose
  [8, 1, BLACK], // eye
  [6, 0, BROWN], [6, 1, BROWN], [6, 2, BROWN], // ear
  [6, 4, COLLAR], [6, 5, TAN], // collar + chest
];
const FRAME_A = [[1, 6, TAN], [1, 7, BROWN], [5, 6, TAN], [5, 7, BROWN], [0, 1, TAN], [0, 2, TAN]];
const FRAME_B = [[2, 6, TAN], [2, 7, BROWN], [4, 6, TAN], [4, 7, BROWN], [0, 3, TAN], [0, 2, TAN]];
const DOG_W = 10 * U, DOG_H = 8 * U;

const px = (list) => list.map(([x, y, c]) => `<rect x="${x * U}" y="${y * U}" width="${U}" height="${U}" fill="${c}"/>`).join('');

// ---------- timing (seconds) ----------
const ENTER = 1.2, PER_CELL = 0.06, EXIT = 1.5, HOLD = 3.5, FADE = 0.8;

function build(weeks, theme) {
  const W = weeks.length;
  const width = PADX * 2 + W * STEP - (STEP - CELL);
  const height = PADY + 7 * STEP + 6;
  const N = 7 * W;
  const walkEnd = ENTER + (N - 1) * PER_CELL;
  const exitEnd = walkEnd + EXIT;
  const T = exitEnd + HOLD + FADE;
  const fadeStart = T - FADE;
  const pct = (t) => `${Math.min(100, Math.max(0, (t / T) * 100)).toFixed(3)}%`;

  const cellX = (c) => PADX + c * STEP;
  const cellY = (r) => PADY + r * STEP;
  // Serpentine path: row 0 left->right, row 1 right->left, ...
  const colAt = (k) => { const r = Math.floor(k / W), j = k % W; return r % 2 === 0 ? j : W - 1 - j; };
  const tAt = (k) => ENTER + k * PER_CELL;
  const kOf = (c, r) => r * W + (r % 2 === 0 ? c : W - 1 - c);
  const dogPos = (c, r) => [cellX(c) + CELL / 2 - DOG_W / 2, cellY(r) + CELL / 2 - DOG_H + 4];

  let css = '';
  let cells = '';

  // grid + popping squares
  weeks.forEach((col, c) => col.forEach((lvl, r) => {
    if (lvl === null) return;
    const x = cellX(c), y = cellY(r);
    cells += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="2" fill="${theme.empty}"/>`;
    if (lvl > 0) {
      const t = tAt(kOf(c, r)) + 0.03;
      const id = `c${c}_${r}`;
      css += `@keyframes ${id}{0%,${pct(t)}{opacity:0;transform:scale(.2)}${pct(t + 0.25)}{opacity:1;transform:scale(1.3)}${pct(t + 0.45)},${pct(fadeStart)}{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}`;
      css += `.${id}{animation:${id} ${T}s linear infinite}`;
      cells += `<rect class="pop ${id}" x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="2" fill="${theme.levels[lvl]}"/>`;
    }
  }));

  // dog movement
  const [, y0] = dogPos(0, 0);
  const [, y6] = dogPos(0, 6);
  let move = `0%{transform:translate(${-DOG_W - 10}px,${y0}px)}`;
  for (let k = 0; k < N; k++) {
    const [x, y] = dogPos(colAt(k), Math.floor(k / W));
    move += `${pct(tAt(k))}{transform:translate(${x}px,${y}px)}`;
  }
  move += `${pct(exitEnd)},100%{transform:translate(${width + 10}px,${y6}px)}`;
  css += `@keyframes move{${move}}.move{animation:move ${T}s linear infinite}`;

  // dog facing direction flips at the start of each row
  const RIGHT = `translate(0px,0px) scale(1,1)`, LEFT = `translate(${DOG_W}px,0px) scale(-1,1)`;
  let flip = `0%{transform:${RIGHT}}`;
  for (let r = 1; r < 7; r++) {
    const t = tAt(r * W);
    flip += `${pct(t - 0.02)}{transform:${r % 2 ? RIGHT : LEFT}}${pct(t)}{transform:${r % 2 ? LEFT : RIGHT}}`;
  }
  flip += `100%{transform:${RIGHT}}`;
  css += `@keyframes flip{${flip}}.flip{animation:flip ${T}s linear infinite}`;

  // walking frames
  css += `@keyframes fa{0%{opacity:1}50%{opacity:0}}@keyframes fb{0%{opacity:0}50%{opacity:1}}`;
  css += `.fa{animation:fa .3s steps(1) infinite}.fb{animation:fb .3s steps(1) infinite}`;
  css += `.pop{transform-box:fill-box;transform-origin:center}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<style>${css}</style>
${cells}
<g class="move"><g class="flip">${px(DOG_BODY)}<g class="fa">${px(FRAME_A)}</g><g class="fb">${px(FRAME_B)}</g></g></g>
</svg>`;
}

const weeks = DEMO ? demoWeeks() : await fetchWeeks();
mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/dog-contribution-graph.svg`, build(weeks, THEMES.light));
writeFileSync(`${OUT}/dog-contribution-graph-dark.svg`, build(weeks, THEMES.dark));
console.log('wrote dist/dog-contribution-graph.svg and dist/dog-contribution-graph-dark.svg');
