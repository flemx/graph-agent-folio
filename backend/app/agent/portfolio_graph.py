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

from backend.app.agent.schemas.project_dict import ProjectDict
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
    projects_data:  NotRequired[ProjectDict]

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

    system_content = """
    ROLE: Portfolio Project Extractor
    You are a specialised assistant whose ONLY task is to extract a structured list of the user's projects from a LinkedIn PersonalProfile JSON document.

    OUTPUT REQUIREMENTS
    -------------------
    • Return VALID JSON only – no markdown, no additional keys, no prose.
    • The root object must have a single key "projects" whose value is an array of objects that conform to the schema below.
    • Do not wrap the JSON in triple back-ticks.

    OUTPUT SCHEMA (Python `ProjectDict`)
    ------------------------------------
      {
        "title": str,                      # required
        "description": str,                # required, concise (≤120 words)
        "technologies": List[str],         # optional, lowercase technology names
        "images": List[str],               # optional, image URLs (.png .jpg .gif)
        "demoVideoUrl": str,               # optional, video URL
        "liveDemoUrl": str,               # optional, live demo URL
        "sourceUrl": str                   # optional, repository URL
      }

    EXTRACTION GUIDELINES
    ---------------------
    1. Inspect profile["projects"] first. If it is absent, continue processing.
    2. Supplement with relevant items from profile["publications"] when they represent tangible projects.
    3. For every candidate item:
         • Use its "title".
         • Synthesize "description" from the item's description field; strip markdown; stay under 120 words; start with an active verb.
         • Extract URLs from links provided in the description:
             – Image extensions ⇒ images[]
             – GitHub / GitLab ⇒ sourceUrl
             – YouTube / *.mp4 ⇒ demoVideoUrl
             – Netlify / Vercel / Cloudflare / *.app ⇒ liveDemoUrl
         • Infer technologies by matching common tech terms appearing in title or description.
    4. Remove duplicate projects (case-insensitive title match).
    5. Sort projects by:
         a. Most recent end/start date
         b. Higher perceived impact (clarity, recognised brands, completeness of data)
    6. Limit to the TOP 8 projects.
    7. If zero projects found, output {"projects": []}.
    8. Think step-by-step internally but DO NOT output your reasoning.
    
    EXAMPLE INPUT (do NOT copy verbatim)
    ```json
    {
    ... other keys ...
       "projects": [
        {
            "title": "Agentforce Creator MCP",
            "date": {
                "start": {
                    "month": 5,
                    "day": null,
                    "year": 2025
                },
                "end": {
                    "month": 5,
                    "day": null,
                    "year": 2025
                }
            },
            "description": "# AgentForce Creator MCP\n\nAn intelligent MCP server that automatically generates and deploys Agentforce agents on Salesforce. In this demo we connect to a Salesforce org, let the agent analyze support case history to identify common issues, and create a tailored AI agent based on this analysis. \n\n**Key Features:**\n- Analyzes Salesforce case data to identify automation opportunities\n- Generates reports with recommendations\n- Automatically creates and deploys custom Agentforce agents\n- Leverages agentforce-sdk and Salesforce MCP servers\n\n**Resources:**\n- 📁 [Source Code](https://github.com/flemx/agent-creator-mcp)\n- 🎥 [Video Demo](https://mrvecyvyomqjougfnpdo.supabase.co/storage/v1/object/public/portfolio//Creating%20an%20AgentForce%20Agent%20(1).mp4)\n- 📸 [Screenshots](https://mrvecyvyomqjougfnpdo.supabase.co/storage/v1/object/public/portfolio//agentforce_creator_mcp.jpg)",
        },
        ... other projects ...
    ]
    }
    ```

    EXAMPLE OUTPUT (do NOT copy verbatim)
    ```json
    {
      "projects": [
        {
          "title": "Agentforce Creator MCP",
          "description": "Intelligent server that auto-generates and deploys Agentforce agents on Salesforce.",
          "technologies": ["python", "salesforce", "langchain"],
          "images": ["https://.../agentforce_creator_mcp.jpg"],
          "demoVideoUrl": "https://.../AgentForce_Demo.mp4",
          "sourceUrl": "https://github.com/flemx/agent-creator-mcp"
        }
      ]
    }


    """



    message = f"""
    Generate a list of projects from the following LinkedIn profile:
    {linkedin.model_dump_json(indent=2)}
    """

    messages = [
            SystemMessage(content=system_content),
            HumanMessage(content=message)
        ]

    linkedin: PersonalProfileModel = state["linkedin_data"]
    model = ChatOpenAI(model="gpt-4o-mini")
    model_with_structure = model.with_structured_output(ProjectDict)

    response = await model_with_structure.ainvoke(messages)


    return {
        "current_node": "projects",
        "projects_data": response
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