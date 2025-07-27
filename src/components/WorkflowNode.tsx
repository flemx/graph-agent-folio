import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

interface WorkflowNodeProps {
  data: {
    label: string;
    icon?: string;
    isActive?: boolean;
    description?: string;
  };
  selected?: boolean;
}

const getNodeColors = (nodeId: string, isActive: boolean) => {
  const colors = {
    start: { 
      text: 'rgb(172, 236, 228)', 
      bg: 'rgba(45, 190, 172, 0.1)', 
      border: 'rgb(45, 190, 172)' 
    },
    about: { 
      text: 'rgb(147, 197, 253)', 
      bg: 'rgba(59, 130, 246, 0.1)', 
      border: 'rgb(59, 130, 246)' 
    },
    projects: { 
      text: 'rgb(134, 239, 172)', 
      bg: 'rgba(34, 197, 94, 0.1)', 
      border: 'rgb(34, 197, 94)' 
    },
    experience: { 
      text: 'rgb(236, 224, 172)', 
      bg: 'rgba(216, 192, 90, 0.1)', 
      border: 'rgb(216, 192, 90)' 
    },
    skills: { 
      text: 'rgb(251, 146, 60)', 
      bg: 'rgba(234, 88, 12, 0.1)', 
      border: 'rgb(234, 88, 12)' 
    },
    contact: { 
      text: 'rgb(244, 114, 182)', 
      bg: 'rgba(219, 39, 119, 0.1)', 
      border: 'rgb(219, 39, 119)' 
    },
    end: { 
      text: 'rgb(172, 236, 228)', 
      bg: 'rgba(45, 190, 172, 0.1)', 
      border: 'rgb(45, 190, 172)' 
    }
  };
  
  const nodeColors = colors[nodeId as keyof typeof colors] || colors.start;
  
  if (isActive) {
    return {
      ...nodeColors,
      bg: nodeColors.bg.replace('0.1', '0.2'),
      border: nodeColors.border
    };
  }
  
  return nodeColors;
};

const WorkflowNode = memo(({ data, selected }: WorkflowNodeProps) => {
  const nodeId = data.label.toLowerCase().replace(/\s+/g, '').replace('aiprojects', 'projects');
  const nodeColors = getNodeColors(nodeId, data.isActive);
  const isStartOrEnd = nodeId === 'start' || nodeId === '__start__' || nodeId === 'end' || nodeId === '__end__';
  
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-transparent !border-0 !-top-1"
      />
      
      <div 
        className={cn(
          "px-6 py-3 border-2 font-medium min-w-[160px] text-center transition-all duration-200",
          isStartOrEnd ? "rounded-full" : "rounded-md",
          selected && "ring-2 ring-primary/20"
        )}
        style={{
          borderColor: nodeColors.border,
          backgroundColor: nodeColors.bg,
          color: nodeColors.text
        }}
      >
        <span className="text-sm">{data.label}</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-transparent !border-0 !-bottom-1"
      />
    </div>
  );
});

WorkflowNode.displayName = 'WorkflowNode';

export default WorkflowNode;