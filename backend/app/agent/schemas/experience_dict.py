"""Experience schema using TypedDict.

This mirrors the `Position` and `ExperienceCompany` TypeScript interfaces defined in
`frontend/src/types/experience.ts` so that the backend can share a common
contract with the frontend when exchanging JSON payloads (e.g. via the agent).
"""

from __future__ import annotations

from typing import List, TypedDict

# Python <3.11 compatibility
try:
    from typing import NotRequired  # type: ignore[attr-defined]
except ImportError:  # pragma: no cover
    from typing_extensions import NotRequired  # type: ignore


class PositionDict(TypedDict):
    """Represents a single job position within a company."""

    title: str
    period: str
    location: NotRequired[str]
    description: NotRequired[str]


class ExperienceCompanyDict(TypedDict):
    """Represents a company and the positions held there."""

    company: str
    logo: NotRequired[str]
    period: str
    location: NotRequired[str]
    positions: List[PositionDict]


__all__ = [
    "PositionDict",
    "ExperienceCompanyDict",
]
