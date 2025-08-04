"""About section schema using TypedDict.

This mirrors the `AboutSectionData` TypeScript interface defined in
`frontend/src/types/about.ts` so that the backend can share a common
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


class ProfileDict(TypedDict):
    """High-level personal information and bio."""

    avatar: str
    fullName: str
    subTitle: str
    summary: str
    country: str
    languages: List[str]


class ContactDict(TypedDict):
    """Contact and social links."""

    linkedin: str
    github: NotRequired[str]
    websites: NotRequired[List[str]]


class AboutSectionDict(TypedDict):
    """Complete about section as expected by the frontend."""

    profile: ProfileDict
    skills: List[str]
    contact: ContactDict


__all__ = [
    "ProfileDict",
    "ContactDict",
    "AboutSectionDict",
]
