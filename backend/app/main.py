from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from typing import TypedDict
from .agent.portfolio_graph import graph   # ← LangGraph import
from .agent.portfolio_graph import AgentState

app = FastAPI()

static_path = Path(__file__).parent / "static"
if static_path.exists():            # <── dev safety
    app.mount("/", StaticFiles(directory=static_path, html=True), name="site")


# Example API that triggers the graph
@app.post("/api/portfolio")
async def run_portfolio(input: AgentState):
    result = await graph.ainvoke(input)
    return result