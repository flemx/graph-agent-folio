from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END, START
from langgraph.config import get_stream_writer
from typing import TypedDict, NotRequired, Dict, Any, Literal
from .tools import get_linkedin_data, stream_state
from .schemas.linkedin_profile_models import PersonalProfileModel
from .schemas.about_dict import AboutSectionDict
from .schemas.project_dict import ProjectDict, ProjectsSectionDict
from .schemas.experience_dict import ExperienceCompanyDict
from .schemas.custom_chunks import StructuredChunk, NodeUpdate

import logging
from dotenv import load_dotenv

load_dotenv()

class InputState(TypedDict):
    linkedin_id: str

class OutputState(TypedDict):
    about_data:   NotRequired[Dict[str, Any]]
    experience_data: NotRequired[Dict[str, Any]]
    projects_data:  NotRequired[ProjectsSectionDict]
    linkedin_status: Literal["found", "not_found"]

class OverallState(InputState, OutputState):
    """State for the agent graph."""
    linkedin_data: NotRequired[PersonalProfileModel] | None

graph_builder = StateGraph(OverallState, input_schema=InputState, output_schema=OutputState)


    
async def linkedin_node(state: OverallState):
    """Node for routing the user to the appropriate section."""

    raw_data = await get_linkedin_data(state["linkedin_id"])
    print("raw_data", raw_data)
    # Parse into Pydantic model so downstream nodes can use attribute access
    linkedin_data = PersonalProfileModel.model_validate(raw_data) if raw_data else None
    linkedin_status = "found" if linkedin_data else "not_found"
    return {
        "linkedin_data": linkedin_data,
        "linkedin_status": linkedin_status,
    }
""
async def route_node(state: OverallState) -> Literal["about", "__end__"]:
    """Node for routing the user to the appropriate section."""
    linkedin_data = state["linkedin_data"]
    if linkedin_data is None:
        return "__end__"
    else:
        return "about"

async def about_node(state: OverallState):
    """Extracts About section data from LinkedIn JSON."""
    linkedin: PersonalProfileModel = state["linkedin_data"]
    writer = get_stream_writer()
    writer(NodeUpdate(current_node="about_node", data={"status": "started"}, chunk_type="node_update"))
    about_data: AboutSectionDict = {}

    # Build profile information using dot access

    about_data["profile"] = {
        "avatar": linkedin.profile_picture,
        "fullName": linkedin.full_name(),
        "subTitle": linkedin.sub_title or "",
        "summary": linkedin.summary or "",
        "country": linkedin.location.country if linkedin.location else "",
        "languages": [lang.name for lang in (linkedin.languages.profile_languages if linkedin.languages and linkedin.languages.profile_languages else [])]
    }

    # Skills list
    about_data["skills"] = linkedin.skills or []
    # Contact links
    all_websites = [w.url for w in (linkedin.contact_info.websites if linkedin.contact_info and linkedin.contact_info.websites else [])]
    github_url = next((w for w in all_websites if w and "github.com" in w.lower()), None)
    websites = [w for w in all_websites if w and "github.com" not in w.lower()]

    about_data["contact"] = {
        "linkedin": f"https://www.linkedin.com/in/{linkedin.profile_id}",
        "github": github_url,
        "websites": websites,
    }

   

    await stream_state("about_node", about_data, delay=0.003)

    writer(NodeUpdate(current_node="about_node", data={"status": "completed"}, chunk_type="node_update"))

    return {
        "about_data": about_data,
    }

async def projects_node(state: OverallState):
    """Node for the projects section."""
    writer = get_stream_writer()
    writer(NodeUpdate(current_node="projects_node", data={"status": "started"}, chunk_type="node_update"))
    linkedin: PersonalProfileModel = state["linkedin_data"]

    system_content = """
    ROLE: Portfolio Project Extractor
    You are a specialised assistant whose ONLY task is to extract a structured list of the user's projects from a LinkedIn PersonalProfile JSON document.

    OUTPUT REQUIREMENTS
    -------------------
    • Return VALID JSON only – no markdown, no additional keys, no prose.
    • The root object must have a single key "projects" whose value is an array of objects that conform to the schema below.
    • If there are not values for the optional fields, do not include them in the JSON!
    • Never use null for optional fields, use empty strings instead or dont show them at all.
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
    
    model = ChatOpenAI(model="gpt-4o-mini")
    model_with_structure = model.with_structured_output(ProjectsSectionDict)

    response = {}
    async for chunk in model_with_structure.astream(messages):
        response = chunk
        writer(StructuredChunk(current_node="projects_node", data=response, chunk_type="structured"))
       
    writer(NodeUpdate(current_node="projects_node", data={"status": "completed"}, chunk_type="node_update"))
    return {
        "projects_data": response
    }


def _format_date_range(date_range):
    """Utility to convert a DateRangeModel into a readable period string.

    Examples
    --------
    2020-01 ➜ None  -> "2020 - Present"
    2017-05 ➜ 2022-04 -> "2017 - 2022"
    None            -> ""
    """
    if date_range is None:
        return ""

    start_year = getattr(date_range.start, "year", None) if date_range.start else None
    end_year = getattr(date_range.end, "year", None) if date_range.end else None

    if start_year and end_year:
        return f"{start_year} - {end_year}"
    if start_year and not end_year:
        return f"{start_year} - Present"
    # Fallback when only end year exists or both missing
    if end_year:
        return str(end_year)
    return ""


async def experience_node(state: OverallState):
    """Build structured experience data from LinkedIn position groups."""
    writer = get_stream_writer()
    writer(NodeUpdate(current_node="experience_node", data={"status": "started"}, chunk_type="node_update"))
    linkedin: PersonalProfileModel = state["linkedin_data"]
    company_groups: list[ExperienceCompanyDict] = []

    for group in linkedin.position_groups or []:
        # Basic company info
        company_name = group.company.name if group.company and group.company.name else "Unknown Company"
        logo = group.company.logo if group.company and group.company.logo else None

        period_str = _format_date_range(group.date)

        # Collect positions for this company
        positions = []
        top_location = None
        for pos in group.profile_positions or []:
            pos_period = _format_date_range(pos.date)
            pos_dict = {
                "title": pos.title or "",
                "period": pos_period,
            }
            if pos.location:
                pos_dict["location"] = pos.location
                if top_location is None:
                    top_location = pos.location
            if pos.description:
                pos_dict["description"] = pos.description
            positions.append(pos_dict)  # type: ignore[arg-type]

        if not positions:
            # Skip groups without positions
            continue

        company_dict: ExperienceCompanyDict = {
            "company": company_name,
            "period": period_str,
            "positions": positions,  # type: ignore[assignment]
        }
        if logo:
            company_dict["logo"] = logo  # type: ignore[typeddict-item]
        if top_location:
            company_dict["location"] = top_location  # type: ignore[typeddict-item]

        company_groups.append(company_dict)

    experience_data = {"experience": company_groups}

    # Stream chunk for real-time UI updates (small delay to throttle output)
    await stream_state("experience_node", experience_data, delay=0.003)
    writer(NodeUpdate(current_node="experience_node", data={"status": "completed"}, chunk_type="node_update"))
    return {
        "experience_data": experience_data,
    }



graph_builder.add_node("linkedin", linkedin_node)
graph_builder.add_node("about", about_node)
graph_builder.add_node("projects", projects_node)
graph_builder.add_node("experience", experience_node)

graph_builder.add_edge(START, "linkedin")
graph_builder.add_edge("about", "projects")
graph_builder.add_edge("projects", "experience")
graph_builder.add_edge("experience", END)
graph_builder.add_conditional_edges(
    "linkedin", route_node
)


graph = graph_builder.compile()


