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
    """A TypedDict representing a portfolio project.

    Attributes
    ----------
    title: str
        Project title.
    description: str
        Short description of the project.
    technologies: list[str], optional
        A list of technologies used in the project.
    images: list[str], optional
        An array of image URLs (screenshots/mockups).
    demo_video_url: str, optional
        URL to a demo video (e.g., YouTube).
    live_demo_url: str, optional
        URL to a live demo site.
    source_url: str, optional
        URL to the source code repository.
    """

    title: str
    description: str
    technologies: NotRequired[List[str]]
    images: NotRequired[List[str]]
    demo_video_url: NotRequired[str]
    live_demo_url: NotRequired[str]
    source_url: NotRequired[str]
