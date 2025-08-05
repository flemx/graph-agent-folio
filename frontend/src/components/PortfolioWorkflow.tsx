import { useCallback, useMemo, useEffect } from 'react';
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
  dimmed?: boolean;
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
  streaming?: boolean;
  loadingSection?: string;
  finished?: boolean;
}

const PortfolioWorkflow = ({ activeSection, onSectionChange, streaming = false, loadingSection, finished = false }: PortfolioWorkflowProps) => {
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

  const isTerminal = (id: string) => id === 'start' || id === 'end';

  const interactive = finished && !streaming;


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const computedEdges: Edge[] = useMemo(() =>
    initialEdges.map((edge) => ({
      ...edge,
      data: {
        dimmed:
          (!interactive) || (
            !isTerminal(activeSection) &&
            !isTerminal(edge.source) &&
            !isTerminal(edge.target) &&
            activeSection !== edge.source &&
            activeSection !== edge.target
          ),
      },
    })),
  [initialEdges, activeSection, interactive]);

  const [edges, setEdges, onEdgesChange] = useEdgesState(computedEdges);

  // Update edges dimming when activeSection changes
  useEffect(() => {
    setEdges(computedEdges);
    // update nodes active status
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isActive: !isTerminal(activeSection) && node.id === activeSection,
          dimmed:
            (!interactive) || (!isTerminal(activeSection) && node.id !== activeSection),
        },
      }))
    );
  }, [computedEdges, setEdges, setNodes, activeSection, interactive]);

  // Auto navigate when backend signals a new section is processing
  useEffect(() => {
    if (streaming && loadingSection) {
      onSectionChange(loadingSection);
    }
  }, [streaming, loadingSection, onSectionChange]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<WorkflowData>) => {
    if (!interactive) return;
    onSectionChange(node.id);
  }, [onSectionChange, interactive]);

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