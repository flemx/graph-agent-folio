import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkflowNode from './WorkflowNode';
import CustomEdge from './CustomEdge';

// Define the shape of the `data` object we store inside each workflow node.
type WorkflowData = {
  label: string;
  description?: string;
  isActive?: boolean;
};

const nodeTypes = {
  workflow: WorkflowNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

interface PortfolioWorkflowProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const PortfolioWorkflow = ({ activeSection, onSectionChange }: PortfolioWorkflowProps) => {
  const initialNodes: Node<WorkflowData>[] = useMemo(() => [
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
      type: 'custom'
    },
    {
      id: 'about-projects',
      source: 'about',
      target: 'projects',
      type: 'custom'
    },
    {
      id: 'projects-experience',
      source: 'projects',
      target: 'experience',
      type: 'custom'
    },
    {
      id: 'experience-end',
      source: 'experience',
      target: 'end',
      type: 'custom'
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
    <div className="h-full bg-workflow-bg border-r border-workflow-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.7 }}
        proOptions={{ hideAttribution: true }}
        className="workflow-canvas"
      />
    </div>
  );
};

export default PortfolioWorkflow;