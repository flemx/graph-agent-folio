
import os
import json
from typing import Any

DATA_PATH = os.path.join(os.path.dirname(__file__), "linkedin_data.json")
with open(DATA_PATH, "r") as f:
    LINKEDIN_DATA = json.load(f)


async def get_linkedin_data(linkedin_id: str) -> dict[str, Any]:
    """Get the linkedin data for the user."""
    return LINKEDIN_DATA