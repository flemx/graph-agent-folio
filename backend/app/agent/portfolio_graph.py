from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, AnyMessage, SystemMessage, AIMessageChunk
from langgraph.graph.message import MessagesState
from langchain_openai import ChatOpenAI
from langchain_core.runnables.config import RunnableConfig
from langgraph.graph import StateGraph, add_messages, END, START
from langgraph.graph.state import CompiledStateGraph
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import CachePolicy
from pydantic import BaseModel, Field
from typing import TypedDict, NotRequired, List, Optional, Dict, Any, Literal, Annotated, Union
from .tools import get_linkedin_data
from .schemas.linkedin_profile_models import PersonalProfileModel
import json
import asyncio
import os
import json
import logging
from dotenv import load_dotenv

load_dotenv()

memory = InMemorySaver()


class AgentState(TypedDict):
    """State for the agent graph."""
    linkedin_id: str
    next_node: Literal["about", "projects", "experience"]
    current_node: NotRequired[Literal["about", "projects", "experience","end"]]
    linkedin_data: NotRequired[PersonalProfileModel]
    about_data:   NotRequired[Dict[str, Any]]
    experience_data: NotRequired[Dict[str, Any]]
    projects_data:  NotRequired[Dict[str, Any]]

graph_builder = StateGraph(AgentState)


    
async def linkedin_node(state: AgentState):
    """Node for routing the user to the appropriate section."""
    # `state` is a plain dict at runtime (TypedDict), so use dict access
    if state.get("linkedin_data") == None:
        raw_data = await get_linkedin_data(state["linkedin_id"])
        # Parse into Pydantic model so downstream nodes can use attribute access
        linkedin_data = PersonalProfileModel.model_validate(raw_data)
    else:
        # Already a PersonalProfileModel instance
        linkedin_data = state["linkedin_data"]
    return {
        "linkedin_data": linkedin_data,
    }


async def about_node(state: AgentState):
    """Extracts About section data from LinkedIn JSON."""
    linkedin: PersonalProfileModel = state["linkedin_data"]

    # Build profile information using dot access
    profile = {
        "avatar": linkedin.profile_picture,
        "fullName": linkedin.full_name(),
        "subTitle": linkedin.sub_title or "",
        "summary": linkedin.summary or "",
        "country": (linkedin.location.country if linkedin.location else ""),
        "languages": [lang.name for lang in (linkedin.languages.profile_languages if linkedin.languages and linkedin.languages.profile_languages else [])],
    }

    # Skills list
    skills = linkedin.skills or []

    # Contact links
    all_websites = [w.url for w in (linkedin.contact_info.websites if linkedin.contact_info and linkedin.contact_info.websites else [])]
    github_url = next((w for w in all_websites if w and "github.com" in w.lower()), None)
    websites = [w for w in all_websites if w and "github.com" not in w.lower()]

    contact = {
        "linkedin": f"https://www.linkedin.com/in/{linkedin.profile_id}",
        "github": github_url,
        "websites": websites,
    }

    about_data = {"profile": profile, "skills": skills, "contact": contact}

    return {
        "current_node": "about",
        "about_data": about_data,
    }

async def projects_node(state: AgentState):
    """Node for the projects section."""
    return {
        "current_node": "projects",
        "projects_data": {"projects": [{"name": "Project 1", "description": "Description 1"}, {"name": "Project 2", "description": "Description 2"}]}
    }


async def experience_node(state: AgentState):
    """Node for the experience section."""
    return {
        "current_node": "experience",
        "experience_data": {"experience": [{"company": "Company 1", "title": "Title 1", "description": "Description 1"}, {"company": "Company 2", "title": "Title 2", "description": "Description 2"}]}
    }



graph_builder.add_node("linkedin", linkedin_node, cache_policy=CachePolicy())
graph_builder.add_node("about", about_node, cache_policy=CachePolicy())
graph_builder.add_node("projects", projects_node, cache_policy=CachePolicy())
graph_builder.add_node("experience", experience_node, cache_policy=CachePolicy())

graph_builder.add_edge(START, "linkedin")
graph_builder.add_edge("linkedin", "about")
graph_builder.add_edge("about", "projects")
graph_builder.add_edge("projects", "experience")
graph_builder.add_edge("experience", END)


graph = graph_builder.compile()