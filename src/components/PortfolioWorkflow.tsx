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
      id: '__start__',
      type: 'workflow',
      position: { x: 250, y: 50 },
      data: {
        label: 'Start',
        description: 'AI Engineer Portfolio',
        isActive: activeSection === 'start'
      }
    },
    {
      id: 'about',
      type: 'workflow', 
      position: { x: 100, y: 180 },
      data: {
        label: 'About',
        icon: '👤',
        description: 'Background & Vision',
        isActive: activeSection === 'about'
      }
    },
    {
      id: 'projects',
      type: 'workflow',
      position: { x: 250, y: 180 },
      data: {
        label: 'AI Projects',
        icon: '🤖',
        description: 'Agent Systems',
        isActive: activeSection === 'projects'
      }
    },
    {
      id: 'experience',
      type: 'workflow',
      position: { x: 400, y: 180 },
      data: {
        label: 'Experience',
        icon: '💼',
        description: 'Professional Journey',
        isActive: activeSection === 'experience'
      }
    },
    {
      id: 'contact',
      type: 'workflow',
      position: { x: 350, y: 310 },
      data: {
        label: 'Contact',
        icon: '📧',
        description: 'Let\'s Connect',
        isActive: activeSection === 'contact'
      }
    }
  ], [activeSection]);

  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'start-about',
      source: 'start',
      target: 'about',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
    },
    {
      id: 'about-projects',
      source: 'about',
      target: 'projects',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
    },
    {
      id: 'projects-experience',
      source: 'projects',
      target: 'experience',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
    },
    {
      id: 'experience-skills',
      source: 'experience',
      target: 'skills',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
    },
    {
      id: 'skills-contact',
      source: 'skills',
      target: 'contact',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
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
        fitViewOptions={{ padding: 0.2 }}
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