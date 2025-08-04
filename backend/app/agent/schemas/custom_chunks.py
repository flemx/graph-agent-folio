from typing import TypedDict, Any, Literal

class StructuredChunk(TypedDict):
    chunk_type: Literal["structured"] = "structured"
    current_node: str
    data: Any

class NodeUpdate(TypedDict):
    chunk_type: Literal["node_update"] = "node_update"
    current_node: str
    data: Any

__all__ = ["StructuredChunk", "NodeUpdate"]
