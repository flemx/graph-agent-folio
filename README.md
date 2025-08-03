# Graph-Agent-Folio

A full-stack demo that turns your LinkedIn profile into an **interactive LangGraph agent** and a portfolio website.

```
LinkedIn → LangGraph workflow → FastAPI JSON API → React / Vite UI
```

The backend scrapes / loads LinkedIn data, feeds it through a LangGraph workflow, and exposes structured sections (About, Projects, Experience).  The React front-end visualises the workflow and renders the generated content.

---
## ✨  What this project showcases

* Dynamic, agent-driven portfolio generated from real profile data.
* End-to-end LangGraph example (graph builder, conditional edges, in-memory checkpoint).
* Type-safe React + Tailwind UI with workflow visualisation.
* One-image production build (multi-stage Dockerfile) **or** lean local dev with hot-reload.

---
## 🗂️  Repository layout

```
backend/                FastAPI app + LangGraph agent
└─ app/
   ├─ main.py           FastAPI entry-point (serves API + static bundle)
   └─ agent/            LangGraph workflow & tools
frontend/               Vite / React / shadcn-ui
Dockerfile              Multi-stage build (React → FastAPI)
docker-compose.yml      Compose service for production / staging
langgraph.json          Graph spec for `langgraph dev`
```

---
## 🚀  Quick start (production)

```bash
# 1. Build & run the full stack
docker compose up --build

# FastAPI: http://localhost:8000
# React bundle is served at /
```

The container builds the React bundle, installs Python deps, copies the bundle
into `backend/app/static`, and starts Uvicorn on port **8000**.

---
## 🛠️  Local development workflow

### Prerequisites
* Python 3.12
* Node 20+
* (optional) Make or pnpm

### 1. Set up virtualenv & JS deps
```bash
python -m venv .venv && source .venv/bin/activate
pip install -e backend[dev]      # editable install with ruff etc.
cd frontend && npm install       # or pnpm i
```

### 2. Run with hot reload (two terminals)
```bash
# terminal 1 – Vite + React
cd frontend
npm run dev          # http://localhost:5173

# terminal 2 – FastAPI + LangGraph
cd backend
uvicorn backend.app.main:app --reload --port 8000
```

Add this proxy in `frontend/vite.config.ts` so the UI can call the API without CORS issues:
```ts
server: {
  proxy: {
    '/api': 'http://localhost:8000',
  },
},
```

### 3. Run LangGraph alone (optional)
Useful for debugging the graph in LangGraph Studio.
```bash
source .venv/bin/activate
langgraph dev                # loads graph from langgraph.json on port 2024
```


---
## 🔐  Environment variables
Create a `.env` file at repo root (loaded by both FastAPI and LangGraph):
```
OPENAI_API_KEY=sk-...
LINKEDIN_USERNAME=my_user   # if you add live scraping
LINKEDIN_PASSWORD=secret
```

For local dev you can export them instead.

---
> _Built to demonstrate agentic applications with LangGraph & a modern React UI._
