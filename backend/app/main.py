from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from typing import TypedDict, Any
import json
from pydantic import BaseModel
from .agent.portfolio_graph import InputState, OutputState, graph
from .agent.tools import to_jsonable
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()


# Example API that triggers the graph
@app.post("/api/portfolio")
async def run_portfolio(input: InputState) -> OutputState:
    """Runs the graph **without** streaming and returns the final OutputState.
    Kept for backward-compatibility. Prefer using /api/portfolio/stream for real-time updates."""

    result: OutputState | None = None
    async for event_type, payload in graph.astream(input, stream_mode=["custom", "values"]):
        if event_type == "custom":
            logger.debug(payload)  # already JSON-serialisable
        elif event_type == "values":
            result = payload  # type: ignore[assignment]
        else:
            logger.debug(event_type, payload)

    # logger.debug("RESULT:", json.dumps(to_jsonable(result), indent=2, ensure_ascii=False))
    assert result is not None, "Graph did not yield a final OutputState"
    return result


@app.post("/api/portfolio/stream")
async def run_portfolio_stream(input: InputState):
    """Stream graph events to the client using Server-Sent Events (SSE).

    The response is a **text/event-stream** where each event line contains a JSON
    object with two keys:
    - ``event``: the graph event type (e.g. "custom" or "values")
    - ``data``: the actual payload, converted to plain JSON-serialisable data
    """

    from fastapi.responses import StreamingResponse  # local import to avoid unnecessary dependency if not used
    result: OutputState | None = None
    async def event_generator():
        """Async generator that yields Server-Sent Events lines."""
        try:
            async for event_type, payload in graph.astream(input, stream_mode=["custom", "values"]):
                # Convert payload so it can be serialised to JSON
                try:
                    if isinstance(payload, str):
                        # Attempt to de-JSONify strings for consistency
                        try:
                            payload_jsonable = json.loads(payload)
                        except json.JSONDecodeError:
                            payload_jsonable = payload
                    elif isinstance(payload, BaseModel):
                        payload_jsonable = payload.model_dump()
                    else:
                        payload_jsonable = to_jsonable(payload)
                except Exception:
                    # Never break the stream on serialisation issues
                    payload_jsonable = str(payload)

                message_dict = {"event": event_type, "data": payload_jsonable}
                if event_type == "custom":
                    yield f"data: {json.dumps(message_dict, ensure_ascii=False)}\n\n"
                elif event_type == "values":
                    # Hold on to final snapshot; still echo intermediates if desired
                    nonlocal result
                    result = message_dict

            # Emit the final values event once the graph completes
            yield f"data: {json.dumps(result, ensure_ascii=False)}\n\n"
        except Exception as exc:
            # Surface backend errors to the client rather than closing the socket silently
            error_payload = {"event": "error", "data": str(exc)}
            yield f"data: {json.dumps(error_payload, ensure_ascii=False)}\n\n"
    # ``media_type`` **must** be text/event-stream for SSE
    return StreamingResponse(event_generator(), media_type="text/event-stream")

# -------------------- Static React build --------------------
# Mount **after** API routes so it never intercepts /api/* POST requests
static_path = Path(__file__).parent / "static"
if static_path.exists():  # <── dev safety
    app.mount("/", StaticFiles(directory=static_path, html=True), name="site")

