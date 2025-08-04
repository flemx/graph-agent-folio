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
    result = None
    async for event in graph.astream(input, stream_mode=["custom", "messages", "state"]):
        # `event` is a 2-tuple: (event_type, payload)
        event_type, payload = event

        if event_type == "custom":
            # your streamed snapshots
            print(payload)
        elif event_type == "state":
            # final graph state (when it appears)
            result = payload
        else:
            # e.g. "messages" or any other types
            print(event_type, payload)
    print("result: ",result)
    return result

