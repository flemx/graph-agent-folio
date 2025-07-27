import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  MarkerType,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkflowNode from './WorkflowNode';

const nodeTypes = {
  workflow: WorkflowNode,
};

interface PortfolioWorkflowProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const PortfolioWorkflow = ({ activeSection, onSectionChange }: PortfolioWorkflowProps) => {
  const initialNodes: Node[] = useMemo(() => [
    {
      id: 'start',
      type: 'workflow',
      position: { x: 250, y: 50 },
      data: {
        label: '__start__',
        description: 'AI Engineer Portfolio',
        isActive: activeSection === 'start'
      }
    },
    {
      id: 'about',
      type: 'workflow', 
      position: { x: 250, y: 150 },
      data: {
        label: 'About',
        description: 'Background & Vision',
        isActive: activeSection === 'about'
      }
    },
    {
      id: 'projects',
      type: 'workflow',
      position: { x: 250, y: 250 },
      data: {
        label: 'AI Projects',
        description: 'Agent Systems',
        isActive: activeSection === 'projects'
      }
    },
    {
      id: 'experience',
      type: 'workflow',
      position: { x: 250, y: 350 },
      data: {
        label: 'Experience',
        description: 'Professional Journey',
        isActive: activeSection === 'experience'
      }
    },
    {
      id: 'end',
      type: 'workflow',
      position: { x: 250, y: 450 },
      data: {
        label: '__end__',
        description: 'End workflow'
      }
    }
  ], [activeSection]);

  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'start-about',
      source: 'start',
      target: 'about',
      type: 'smoothstep',
      style: { stroke: 'rgb(153, 153, 153)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgb(153, 153, 153)' }
    },
    {
      id: 'about-projects',
      source: 'about',
      target: 'projects',
      type: 'smoothstep',
      style: { stroke: 'rgb(45, 190, 172)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgb(45, 190, 172)' }
    },
    {
      id: 'projects-experience',
      source: 'projects',
      target: 'experience',
      type: 'smoothstep',
      style: { stroke: 'rgb(216, 192, 90)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgb(216, 192, 90)' }
    },
    {
      id: 'experience-end',
      source: 'experience',
      target: 'end',
      type: 'smoothstep',
      style: { stroke: 'rgb(221, 85, 108)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgb(221, 85, 108)' }
    }
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    onSectionChange(node.id);
  }, [onSectionChange]);

  return (
    <div className="h-full bg-workflow-bg border-r border-workflow-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, maxZoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
        className="workflow-canvas"
      >
        <Background 
          color="hsl(var(--workflow-border))"
          size={1}
          className="opacity-30"
        />
      </ReactFlow>
    </div>
  );
};

export default PortfolioWorkflow;