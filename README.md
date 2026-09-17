# Sakshi Dhaliwal

**Software Engineer - ML & AI Intern @ SAP** | Data Science @ SFU (Grad May 2027)

ML & AI engineer building production LLM systems. Focused on AI agents, prompt engineering, LLM evaluation, and applied machine learning.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-sakshi-dhaliwal-5071a224astyle=flat&logo=linkedin)](https://linkedin.com/in/sakshi-dhaliwal) [![GitHub](https://img.shields.io/badge/GitHub-followers-181717?style=flat&logo=github)](https://github.com/yourusername)

---

## Experience

**The thread through my work:** taking ML from raw data all the way to reliable, production-grade systems.

### Software Engineer - ML & AI Intern @ SAP Inc.
*Vancouver, BC | April 2026 - Present*

I build LLM services that people can trust in production. My compliance auditing system pairs a deterministic rule engine with model judgment, so verdicts stay auditable while the LLM handles severity and cross-tour patterns. I also made it fast and cheap to run at scale, turning days of manual audit review across hundreds of sites into minutes.

**Stack:** Node.js, SAP CAP, SAP BTP Cloud Foundry, XSUAA, LLMs

### AI Engineer Intern @ SAP Inc.
*Vancouver, BC | Jan 2026 - April 2026*

I built an incident-triage agent that helps analysts find answers across a huge history of past incidents. The focus was making an agent safe to give real tools to: permissions scoped to the user, human approval before any write, resistance to prompt injection, and runs that recover cleanly when interrupted.

**Stack:** LangGraph, SAP HANA Vector Search, Jira, JWT

### Data Engineer Intern @ SAP Inc.
*Vancouver, BC | Sep 2025 - Dec 2025*

I unified data from disconnected systems like CCURE, Resolver, and ServiceNow into one layered pipeline, giving analytics and AI a single trusted source. That meant resolving the same entities across systems and catching bad data early, before it reached dashboards or models.

**Stack:** SAP Datasphere, SQL, SAP Analytics Cloud, Medallion (Bronze/Silver/Gold) architecture

### Hardware Engineer Intern, Data & Automation Support @ StructureCraft
*Vancouver, BC | May 2024 - Aug 2024*

I turned manufacturing validation logs and operator feedback into a model that flags risky CAD-to-CNC jobs before they reach the machine, and wired it directly into the design tools engineers already use so the risk score shows up in real time.

**Stack:** XGBoost, Python, FastAPI, C#, RhinoCommon

---

## Projects

### [Range of Motion](https://github.com/yourusername/range-of-motion) — Webcam Rehab Scorer

**1st Place: HackPrinceton Spring 2026**

Real-time rehab scoring that calibrates range of motion to each patient's baseline instead of fixed angle thresholds.

- Random Forest on 201 labeled reps from MediaPipe landmarks, 96% accuracy with EMA smoothing and hysteresis
- Per-session calibration to each patient's baseline
- WebSocket stream to a Three.js client at sub-50ms latency, live feedback at 25-30 FPS

**Stack:** FastAPI, MediaPipe, React, Three.js, Docker, MongoDB

---

### [PulseRec](https://github.com/yourusername/pulserec) — Real-Time Recommendation Engine

Personalized feed recommender over 2M interactions.

- Two-tower FAISS retrieval into a Transformer ranker; +18.7% NDCG@10
- Kafka-to-Redis pipeline at 3,400 events/sec; a new click changes the next recommendation within 83ms, no retraining
- Served 620 RPS at 94ms p99 with batching, caching and fallbacks; 8s recovery under injected failures

**Stack:** PyTorch, FAISS, Kafka, Redis, FastAPI

---

### [Orbit](https://github.com/yourusername/orbit) — Self-Service ML Platform

Takes training code to a live endpoint in one CLI command.

- Argo-orchestrated Kubernetes jobs from training to serving
- Reproducibility via content-hashed datasets and pinned code, config and seed; results within 1.2% across reruns
- Promotion gated on PR-AUC and latency; canaries auto-roll back in 24s on drift or latency breach at 480 predictions/sec

**Stack:** Kubernetes, Argo, MLflow, KServe, MinIO, Prometheus

---

### [Synapse](https://github.com/yourusername/synapse) — Multiplayer AI Workspace

Offline-first canvas syncing docs, diagrams and tasks.

- 5K ops/sec across 1,000 concurrent users; 142ms p99 latency
- Yjs CRDT sync with IndexedDB offline editing: 99.99% convergence, 10K conflicting ops merged without data loss in test
- Git-style branching, replay and merge over an operation log; AI canvas edits applied only after schema validation

**Stack:** React, TypeScript, Go, Yjs, PostgreSQL, LangGraph

---

## Technical Stack

**Languages:** Java, Python, C/C++, TypeScript, SQL, R, HTML/CSS

**Backend & Systems:** Spring Boot, Node.js, REST, gRPC, Kafka, Redis, Concurrency, Thread Pools

**Frontend:** React, Next.js

**Databases:** PostgreSQL, MongoDB, Supabase (Auth, RLS), Indexing, Query Optimization

**Cloud & Infrastructure:** AWS (EC2, RDS, S3, IAM), Docker, Kubernetes, Terraform, GitHub Actions, Linux, SAP BTP Cloud Foundry

**ML & Data:** XGBoost, scikit-learn, pandas, NumPy, Feature Engineering, Model Evaluation, FastAPI

---

## Recognition

- **Regeneron ISEF 2026** — 1st Place, AI & Technology for Clinical Trials
- **HackPrinceton Spring 2026** — 1st Place: Range of Motion
- **2x MLH Hackathon Winner** — Best Use of Grok, Best Use of Arm
- **SAP Business Data Cloud Lead** — Internal Certification, SAP Inc. (2026)
- **Design Coordinator** — Women in Clean Tech

---

## Connect

**Email:** ssa431@sfu.ca  
**LinkedIn:** [linkedin.com/in/sakshi-dhaliwal](https://linkedin.com/in/sakshi-dhaliwal)  

Open to ML & AI engineering, LLM applications, AI agents, and prompt engineering collaborations.
