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
    linkedin_data: NotRequired[Dict[str, Any]]
    about_data:   NotRequired[Dict[str, Any]]
    experience_data: NotRequired[Dict[str, Any]]
    projects_data:  NotRequired[Dict[str, Any]]

graph_builder = StateGraph(AgentState)


    
async def linkedin_node(state: AgentState):
    """Node for routing the user to the appropriate section."""
    # `state` is a plain dict at runtime (TypedDict), so use dict access
    if state.get("linkedin_data") == None:
        linkedin_data = await get_linkedin_data(state["linkedin_id"])
    else:
        linkedin_data = state["linkedin_data"]
    return {
        "linkedin_data": linkedin_data,
    }

async def routing_node(state: AgentState) -> Literal["about", "projects", "experience"]:
    """Node for routing the user to the appropriate section."""
    return state["next_node"]


async def about_node(state: AgentState):
    """Node for the about section."""
    return {
         "current_node": "about",
         "about_data": {"name": "David Fleminks", "location": "San Francisco, CA", "summary": "I am a software engineer with a passion for building scalable and efficient systems."},
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
graph_builder.add_conditional_edges("linkedin", routing_node)


graph = graph_builder.compile()