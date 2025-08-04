
import os
import json
from typing import Any, Mapping
import json, asyncio
from pydantic import BaseModel
from langgraph.config import get_stream_writer
from .schemas.custom_chunks import StructuredChunk

DATA_PATH = os.path.join(os.path.dirname(__file__), "linkedin_data.json")
with open(DATA_PATH, "r") as f:
    LINKEDIN_DATA = json.load(f)



async def stream_state(
    node_name: str,
    data: Mapping[str, Any],
    *,
    delay: float = 0.05,
) -> None:
    """Stream `data` in a structured, progressive way.

    – Emits **complete JSON snapshots** (one per writer call) so the client
      always receives a valid object.
    – Keeps the original dict shape, adding keys/characters incrementally.
    – For strings → stream one character at a time; for other primitives
      just emit once.
    """
    writer = get_stream_writer()

    # The mutable snapshot that we progressively fill.
    snapshot: StructuredChunk = {
        "current_node": node_name,
        "data": {},
    }

    def json_dump(obj: Any) -> str:
        return json.dumps(obj, separators=(",", ":"), ensure_ascii=False)

    async def send():
        writer(json_dump(snapshot))
        if delay:
            await asyncio.sleep(delay)

    await send()  # initial empty snapshot

    async def recurse(target: Any, source: Any):
        """Copy `source` into `target`, streaming after each incremental step."""
        if isinstance(source, dict):
            for k, v in source.items():
                if isinstance(v, (dict, list)):
                    target[k] = {} if isinstance(v, dict) else []
                    await send()
                    await recurse(target[k], v)
                else:
                    if isinstance(v, str):
                        target[k] = ""
                        await send()
                        for ch in v:
                            target[k] += ch
                            await send()
                    else:
                        target[k] = v
                        await send()
        elif isinstance(source, list):
            for item in source:
                if isinstance(item, (dict, list)):
                    container = {} if isinstance(item, dict) else []
                    target.append(container)
                    await send()
                    await recurse(container, item)
                else:
                    if isinstance(item, str):
                        partial = ""
                        target.append(partial)
                        await send()
                        for ch in item:
                            partial += ch
                            target[-1] = partial
                            await send()
                    else:
                        target.append(item)
                        await send()

    await recurse(snapshot["data"], data)


async def get_linkedin_data(linkedin_id: str) -> dict[str, Any]:
    """Get the linkedin data for the user."""
    return LINKEDIN_DATA



def to_jsonable(obj: Any):
    """Recursively convert BaseModel instances to dict for JSON dumps."""
    if isinstance(obj, BaseModel):
        return obj.model_dump()
    elif isinstance(obj, dict):
        return {k: to_jsonable(v) for k, v in obj.items()}
    elif isinstance(obj, (list, tuple, set)):
        return [to_jsonable(v) for v in obj]
    else:
        return obj