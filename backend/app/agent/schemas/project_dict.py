"""Project schema using TypedDict.

This mirrors the `Project` TypeScript interface defined in
`frontend/src/types/project.ts` so that the backend can share a common
contract with the frontend when exchanging JSON payloads (e.g. via the
agent).
"""

from __future__ import annotations

from typing import List, TypedDict

# Python <3.11 compatibility
try:
    from typing import NotRequired  # type: ignore[attr-defined]
except ImportError:  # pragma: no cover
    from typing_extensions import NotRequired  # type: ignore


class ProjectDict(TypedDict):
    """A TypedDict representing a single portfolio project."""

    title: str
    description: str
    technologies: NotRequired[List[str]]
    images: NotRequired[List[str]]
    demoVideoUrl: NotRequired[str]
    liveDemoUrl: NotRequired[str]
    sourceUrl: NotRequired[str]


class ProjectsSectionDict(TypedDict):
    """Container for the projects section used in the overall graph output.

    Mirrors the structure returned by ``projects_node``: a single key
    ``projects`` holding an **array** of :class:`ProjectDict` items.
    """

    projects: List[ProjectDict]
