
import os
import json
from typing import Any, Mapping
import json, asyncio
from pydantic import BaseModel
from langgraph.config import get_stream_writer
from .schemas.linkedin_profile_models import PersonalProfileModel
from .schemas.custom_chunks import StructuredChunk
import aiohttp
import logging

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
        "chunk_type": "structured",
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


from typing import Optional

async def get_linkedin_data(linkedin_id: str) -> Optional[PersonalProfileModel]:
    """
    Fetch LinkedIn profile data for a given `linkedin_id` using the ProAPIS
    iScraper endpoint.

    If the request fails for any reason, fall back to the local
    `linkedin_data.json` fixture so the rest of the application can continue
    to operate during development/off-line work.

    Parameters
    ----------
    linkedin_id : str
        The LinkedIn profile id (URN) of the target user.

    Returns
    -------
    PersonalProfileModel
        A pydantic model containing the profile details.
    """

    PROAPIS_KEY = os.getenv("PROAPIS_KEY")
    if not PROAPIS_KEY:
        raise EnvironmentError(
            "The environment variable 'PROAPIS_KEY' must be set to call the ProAPIS endpoint."
        )

    url = "https://api.proapis.com/iscraper/v4/profile-details"
    payload = {
        "profile_id": linkedin_id,
        "bypass_cache": True,
        "related_profiles": False,
        "network_info": False,
        "contact_info": True,
    }
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": PROAPIS_KEY,
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=payload, timeout=30) as resp:
                resp.raise_for_status()
                data = await resp.json()
        # The ProAPIS response sometimes nests the data under a "data" key, handle both cases.
        if isinstance(data, dict) and "data" in data and isinstance(data["data"], dict):
            data = data["data"]

        return PersonalProfileModel.model_validate(data)
    except aiohttp.ClientResponseError as http_exc:
        # Specific handling for 404 – profile not found
        if http_exc.status == 404:
            logging.getLogger(__name__).info(
                "LinkedIn profile '%s' not found (404).", linkedin_id
            )
            return None  # Allow the calling graph to handle a missing profile
        # Other HTTP errors fall through to the generic handler below
        logging.getLogger(__name__).warning(
            "Failed to fetch LinkedIn data from ProAPIS (%s). Falling back to local fixture.",
            http_exc,
        )
    except Exception as exc:
        # Any non-HTTP errors – network issues, JSON decode, etc.
        logging.getLogger(__name__).warning(
            "Failed to fetch LinkedIn data from ProAPIS (%s). Falling back to local fixture.",
            exc,
        )
        # Adding tempt fallback for development
        if linkedin_id == "fleminks":
            return PersonalProfileModel.model_validate(LINKEDIN_DATA)
        else:
            return exc



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