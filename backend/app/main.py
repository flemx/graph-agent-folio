from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from typing import TypedDict, Any
import json
from pydantic import BaseModel
from .agent.portfolio_graph import InputState, OutputState, graph

app = FastAPI()

static_path = Path(__file__).parent / "static"
if static_path.exists():            # <── dev safety
    app.mount("/", StaticFiles(directory=static_path, html=True), name="site")


# Example API that triggers the graph
@app.post("/api/portfolio")
async def run_portfolio(input: InputState) -> OutputState:
    result = None
    async for event in graph.astream(input, stream_mode=["custom", "values"]):
        event_type, payload = event

        if event_type == "custom":
            print(payload)  # already JSON
        elif event_type == "values":
            result = payload
        else:
            print(event_type, payload)

    #print("RESULT:", json.dumps(to_jsonable(result), indent=2, ensure_ascii=False))
    return  result

