# 🕷️ WebWealth (FinVerse) — Multi-Agent AI Financial Analysis Platform

<p align="center">
  <b>An explainable, multi-agent AI system that analyzes stocks, cites its evidence, and adapts its verdict to who's asking.</b>
</p>

<p align="center">
  <a href="https://github.com/priyan-6408/webwealth">Repository</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-api-contracts">API Contracts</a> •
  <a href="#-team">Team</a>
</p>

---

## 📌 Table of Contents

1. [Overview](#-overview)
2. [Problem Statement](#-problem-statement)
3. [Our Solution](#-our-solution)
4. [Key Features](#-key-features)
5. [Architecture](#-architecture)
6. [Tech Stack](#-tech-stack)
7. [Repository Structure](#-repository-structure)
8. [System Workflow](#-system-workflow)
9. [Multi-Agent System](#-multi-agent-system)
10. [Retrieval-Augmented Generation (RAG)](#-retrieval-augmented-generation-rag)
11. [API Contracts](#-api-contracts)
12. [Frontend](#-frontend)
13. [Personalization Engine](#-personalization-engine)
14. [Degraded / Failure-Mode Handling](#-degraded--failure-mode-handling)
15. [Quick Start](#-quick-start)
16. [Environment Variables](#-environment-variables)
17. [Testing & QA](#-testing--qa)
18. [Deployment](#-deployment)
19. [Performance Metrics](#-performance-metrics)
20. [Roadmap](#-roadmap)
21. [Team](#-team)
22. [Development Workflow](#-development-workflow)
23. [Contributing](#-contributing)
24. [Acknowledgements](#-acknowledgements)
25. [License](#-license)

---

## 🧭 Overview

**WebWealth** (codename **FinVerse**) is a multi-agent AI system built for a 5-hour hackathon sprint. It takes a stock ticker and a user profile, runs several independent AI agents in parallel to analyze that stock from different angles (technical, fundamental, sentiment, contrarian), grounds every claim in retrieved source documents through a lightweight RAG pipeline, and synthesizes everything into a single, explainable, personalized investment signal — complete with a visible reasoning/decision trace.

The goal was never to build the most complicated system possible. The goal was to build the **most complete, polished, and explainable working demo** achievable in the time available.

> **Note:** This README is a standard template generated from the project's planning document and team workflow notes. Replace placeholder sections (screenshots, live links, exact metrics) with your actual results once available, and correct any detail here that doesn't match what was actually implemented.

---

## ❓ Problem Statement

Retail investors are flooded with financial data but starved of **trustworthy, explainable synthesis**. Existing tools tend to fall into one of two traps:

- **Black-box AI signals** — a single confident number ("Buy: 82% confidence") with no visible reasoning, no cited evidence, and no way to know if the model is hallucinating.
- **Raw data dumps** — charts, filings, and news feeds that give the user *everything* but *synthesize nothing*, leaving the actual analysis work to the user.

There is no easy way for a non-expert investor to get a **multi-perspective, evidence-backed, personalized** view of a stock — one that shows its work, disagrees with itself when the evidence is mixed, and adapts its conclusion depending on whether the user is a conservative retiree or an aggressive day trader.

---

## 💡 Our Solution

WebWealth addresses this with four core ideas:

1. **Multiple independent agents, not one opinion.** Technical, fundamental, sentiment, and contrarian agents each analyze the stock separately and return a structured signal, confidence score, and reasoning — so disagreement between agents is visible rather than hidden.
2. **Evidence over assertion.** A RAG layer retrieves and cites real source documents (earnings filings, disclosures, sector reports) behind every claim, with relevance scores shown in the UI.
3. **Personalization, not a single answer for everyone.** The same stock can produce a different final recommendation for a conservative vs. an aggressive user profile, because risk tolerance is a first-class input to the synthesis step.
4. **Full explainability.** Every step of the pipeline — from raw agent outputs to the final synthesized verdict — is preserved and shown to the user as a decision trace, not thrown away after computing a single number.

---

## ✨ Key Features

- 🤖 **3+ independent AI agents** running in parallel (Technical, Fundamental, Sentiment, Contrarian, Synthesis, Verification)
- 📊 **Signal classification** (BULLISH / BEARISH / NEUTRAL) with per-agent confidence scores
- 📚 **RAG-backed citations** — every insight is traceable to a source document with a relevance score
- 👤 **User-profile-aware output** — different portfolios/risk appetites yield different final recommendations
- 📈 **Market signal dashboard** with live/portfolio view and watchlist support
- 🧩 **Visible decision trace** — see exactly how the agents' outputs were combined into the final verdict
- ⚠️ **Graceful degraded-data handling** — the system stays usable even when a market API fails, a document is missing, or agents disagree
- 🎨 **Responsive, animated dashboard** built with React/Vite
- 🚀 **End-to-end deployable demo** — frontend and backend independently deployed and reachable

---

## 🏗️ Architecture

### High-Level Data Flow

```
                    ┌─────────────────┐
                    │    FRONTEND     │
                    │  (React + Vite) │
                    └────────┬────────┘
                             │  HTTP / JSON
                             ▼
                    ┌─────────────────┐
                    │     BACKEND     │
                    │   (API Layer)   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ AI AGENTS│   │   RAG    │   │  MARKET  │
        │  Module  │   │  Module  │   │   DATA   │
        └────┬─────┘   └────┬─────┘   └────┬─────┘
             │              │              │
             └──────────────┼──────────────┘
                             ▼
                    ┌─────────────────┐
                    │ SYNTHESIS AGENT │
                    │ (personalized)  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   FINAL JSON    │
                    │  (with trace)   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    DASHBOARD    │
                    └─────────────────┘
```

### Design Principle: Agree on the Contract First

Before writing implementation code, every module owner agreed on a **fixed JSON contract** for its inputs and outputs. This let each part of the system be built and tested independently, and integrated early rather than at the very end — the single biggest risk in a multi-person hackathon build.

```
Frontend  →  Backend  →  ONE agent  →  Backend  →  Frontend   (milestone 1)
Frontend  →  Backend  →  ALL agents + RAG + Synthesis  →  Frontend   (final)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), CSS animations, responsive layout |
| Backend | Python (FastAPI/Flask-style REST API) |
| AI Agents | LLM-driven agents with structured JSON outputs |
| RAG | Lightweight document retrieval over a small local corpus |
| Market Data | External market data API with fallback/mock data |
| Version Control | Git + GitHub (branch-per-module workflow) |
| Deployment | Frontend + backend deployed independently (e.g., Vercel/Netlify + Render/Railway — update with actual providers used) |

> Update this table with the exact libraries/frameworks your team actually used (e.g., specific LLM provider, specific market data API, specific deployment platforms).

---

## 📁 Repository Structure

```
webwealth/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── StockSelector/
│   │   │   ├── UserProfile/
│   │   │   ├── MarketSignal/
│   │   │   ├── AgentPanel/
│   │   │   ├── EvidencePanel/
│   │   │   ├── AIConclusion/
│   │   │   ├── RiskPanel/
│   │   │   └── DecisionTrace/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── agents/
│   │   ├── technical_agent.py
│   │   ├── fundamental_agent.py
│   │   ├── sentiment_agent.py
│   │   ├── contrarian_agent.py
│   │   ├── risk_agent.py
│   │   ├── synthesis_agent.py
│   │   └── verification_agent.py
│   ├── rag/
│   │   └── retriever.py
│   ├── data/
│   │   └── market_client.py
│   ├── api/
│   │   └── routes.py
│   └── main.py
│
├── documents/
│   ├── company_earnings.txt
│   ├── corporate_disclosure.txt
│   ├── sector_report.txt
│   └── regulatory_document.txt
│
├── architecture.png
└── README.md
```

### Branching Strategy

```
main
│
├── frontend       → UI/dashboard work
├── ai-agents       → agent logic, prompts, JSON contracts
├── rag-data        → document corpus + retrieval
└── backend         → API layer + integration
```

Only the **Tech Lead / Integration owner** merges into `main`, to keep the mainline stable and avoid one member's changes overwriting another's mid-sprint.

---

## 🔄 System Workflow

1. User selects a stock symbol and (optionally) their user profile on the dashboard.
2. Frontend sends a request to `POST /analyze`.
3. Backend fetches live/mock market data for the symbol.
4. Backend calls the RAG retriever to pull relevant source documents.
5. Backend runs all agents **in parallel**, each receiving the market data and retrieved sources.
6. Each agent returns a structured signal + confidence + reasoning + sources.
7. The **Synthesis Agent** combines all agent outputs, weighted by the user's risk profile, into one final recommendation.
8. The full trace (every agent's raw output, not just the final answer) is returned to the frontend.
9. The dashboard renders the final signal, the evidence panel, the per-agent breakdown, and the decision trace.

---

## 🤖 Multi-Agent System

Each agent is intentionally simple, reliable, and independently testable — **simple + reliable beats complicated + broken** under hackathon time constraints.

### Standard Agent Output Contract

Every agent returns the same shape, regardless of what it analyzes:

```json
{
  "agent": "technical",
  "signal": "BULLISH",
  "confidence": 0.78,
  "reasoning": [
    "Positive momentum",
    "Volume above average"
  ],
  "sources": []
}
```

### Agents Implemented

| Agent | Responsibility |
|---|---|
| **Technical Agent** | Analyzes price action, momentum, and volume-based signals |
| **Fundamental Agent** | Analyzes company financials and filings |
| **Sentiment Agent** | Analyzes news/market sentiment |
| **Contrarian Agent** | Deliberately challenges the majority signal to surface blind spots |
| **Risk Agent** | Evaluates risk factors relative to the user's stated risk tolerance |
| **Synthesis Agent** | Combines all agent outputs + user profile into one final, personalized verdict |
| **Verification Agent** | Cross-checks agent claims against retrieved sources for consistency |

Agents are pure functions from the AI team's perspective — they don't need to know anything about React or HTTP. They only need to guarantee: **input → structured JSON → output.**

---

## 📚 Retrieval-Augmented Generation (RAG)

To ground the agents' claims in real evidence (rather than free-floating LLM assertions), a lightweight RAG layer retrieves relevant snippets from a small local document corpus.

### Document Corpus

```
documents/
├── company_earnings.txt        # Quarterly earnings filings
├── corporate_disclosure.txt    # Corporate disclosures
├── sector_report.txt           # Sector/industry reports
└── regulatory_document.txt     # Regulatory filings
```

### Retrieval Output Contract

```json
{
  "source": "Q1 FY26 Earnings Filing",
  "relevance": 0.91,
  "excerpt": "...",
  "document_id": "REL_001"
}
```

This is surfaced directly in the frontend's Evidence Panel, e.g.:

```
📄 Q1 FY26 Earnings Filing
Relevance: 91%
```

The Fundamental and Sentiment agents consume this retrieval output as part of their reasoning, so every non-technical claim in the final report is traceable back to a specific, citable document.

---

## 🔌 API Contracts

### `POST /analyze`

Runs the full pipeline (market data → RAG → agents → synthesis) for a given stock and user.

**Request**
```json
{
  "symbol": "RELIANCE",
  "user_id": "conservative_01"
}
```

**Response (simplified)**
```json
{
  "symbol": "RELIANCE",
  "final_signal": "BULLISH",
  "final_confidence": 0.74,
  "agents": [
    {
      "agent": "technical",
      "signal": "BULLISH",
      "confidence": 0.78,
      "reasoning": ["Positive momentum", "Volume above average"],
      "sources": []
    }
  ],
  "evidence": [
    {
      "source": "Q1 FY26 Earnings Filing",
      "relevance": 0.91,
      "excerpt": "...",
      "document_id": "REL_001"
    }
  ],
  "decision_trace": []
}
```

### `GET /market/{symbol}`

Returns current/latest market data for the given symbol, with fallback to cached/mock data if the live source fails.

### `GET /portfolio/{user}`

Returns the given user's saved portfolio/watchlist.

> Replace this section with the exact request/response schemas actually implemented, including any authentication headers, pagination, or error response formats added during the build.

---

## 🎨 Frontend

Built with **React + Vite**, structured around a single dashboard composed of independent, mock-data-first components:

- **Header** — navigation and branding
- **StockSelector** — search/select a stock symbol
- **UserProfile** — select or edit the active user's risk profile
- **MarketSignal** — headline BULLISH/BEARISH/NEUTRAL indicator
- **AgentPanel** — per-agent signal, confidence, and reasoning
- **EvidencePanel** — cited source documents with relevance scores
- **AIConclusion** — the synthesized, personalized final verdict
- **RiskPanel** — risk factors relevant to the user's profile
- **DecisionTrace** — step-by-step view of how the final answer was reached

The frontend was built against a mock JSON response first, then wired to the live `/analyze` endpoint once the backend was ready — this let frontend and backend work proceed in parallel without blocking each other.

---

## 👤 Personalization Engine

The same stock analysis can produce **different final recommendations** for different users, because the Synthesis Agent weighs each underlying agent's signal according to the active user's risk profile (e.g., a conservative profile down-weights high-volatility technical signals relative to fundamentals; an aggressive profile does the opposite). This directly satisfies the "different outputs for different users" requirement from the problem statement.

---

## 🛡️ Degraded / Failure-Mode Handling

The system is designed to degrade gracefully rather than crash. QA explicitly tests these failure conditions:

| Failure | Expected Behavior |
|---|---|
| Market API unavailable | Fall back to cached/mock market data with a visible "degraded data" notice |
| Missing document | RAG returns fewer sources rather than failing the whole request |
| Conflicting agent signals | Synthesis surfaces the disagreement explicitly rather than silently averaging it away |
| Invalid stock symbol | Clear, user-facing error message; no unhandled exception |
| Empty portfolio | Dashboard renders an empty state, not a blank/broken screen |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+) and npm
- Python 3.10+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/priyan-6408/webwealth.git
cd webwealth
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app

Navigate to `http://localhost:5173` (default Vite port) in your browser. The frontend will call the backend at the URL configured in your environment variables (see below).

> Update the exact commands above to match your actual `requirements.txt` / `package.json` scripts once finalized.

---

## 🔑 Environment Variables

Create a `.env` file in `backend/` (and `frontend/` if needed):

```
# Backend
MARKET_DATA_API_KEY=your_key_here
LLM_API_KEY=your_key_here
PORT=8000

# Frontend
VITE_API_BASE_URL=http://localhost:8000
```

> Never commit real API keys. Add `.env` to `.gitignore`.

---

## 🧪 Testing & QA

QA followed a checklist derived directly from the hackathon problem statement:

- [ ] 3+ independent agents implemented
- [ ] Agents execute in parallel
- [ ] Signal classification (BULLISH/BEARISH/NEUTRAL) working
- [ ] Confidence scores present on every agent output
- [ ] RAG retrieval implemented
- [ ] Citations visible in the UI
- [ ] User profile affects output
- [ ] Different outputs verified for different user profiles
- [ ] Market signal UI functional
- [ ] Portfolio/watchlist functional
- [ ] Performance metrics captured
- [ ] End-to-end demo runs without manual intervention
- [ ] Degraded-data handling verified (see table above)
- [ ] Architecture summary/diagram prepared

QA's standing rule during the build: whenever a feature was reported "basically done," the next question was always *"Which problem-statement requirement does that satisfy?"* — keeping the team focused on requirements rather than polish for its own sake.

---

## ☁️ Deployment

- **Frontend:** Deployed to `<add deployed frontend URL here>`
- **Backend:** Deployed to `<add deployed backend URL here>`
- **Verification:** Full pipeline tested end-to-end from a separate machine before submission, to confirm it works outside the original development environment.

---

## 📊 Performance Metrics

> Fill in with actual measured numbers from your demo run.

| Metric | Value |
|---|---|
| Average `/analyze` response time | `_ s` |
| Agents run in parallel | `Yes/No` |
| Average agent confidence (sample run) | `_` |
| RAG retrieval latency | `_ s` |
| Number of source documents in corpus | `4` |

---

## 🗺️ Roadmap

Beyond the hackathon sprint, potential next steps include:

- Expanding the document corpus and swapping in a real vector database for RAG
- Adding authentication and persistent multi-user portfolios
- Live market data streaming instead of polling
- Additional specialized agents (macro, ESG, options-flow)
- Backtesting the synthesized signals against historical outcomes
- Mobile-responsive PWA packaging

---

## 👥 Team

| Role | Responsibilities | Machine |
|---|---|---|
| **Tech Lead / Integration** | Backend architecture, API integration, agent connection, Git management, final integration | Any |
| **Frontend Lead** | React/Vite dashboard, agent cards, portfolio visualization, animations, responsive UI | Mac |
| **AI / Agents** | Technical, Fundamental, Sentiment, Contrarian, Synthesis agents; structured JSON outputs | Windows |
| **RAG / Data Engineer** | Financial documents, embeddings/retrieval, citations, market data, data fallback, source verification | Windows |
| **QA + Product + Pitch** | Feature testing, bug hunting, demo data, performance metrics, README, architecture diagram, pitch, requirement tracking | Windows |

> Replace roles with actual team members' names before submission.

---

## 🔀 Development Workflow

The team worked in tightly time-boxed phases to force early integration instead of a risky last-minute merge:

| Phase | Duration | Focus |
|---|---|---|
| Setup | 20 min | Repo, branches, everyone starts assigned module |
| Build (parallel) | 45 min | Frontend skeleton, agent contracts, documents/retrieval, backend API, QA checklist |
| First integrat
