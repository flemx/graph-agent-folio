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
      text: 'rgb(192, 192, 192)', 
      bg: 'rgba(200, 200, 200, 0.1)', 
      border: 'rgb(160, 160, 160)' 
    },
    about: { 
      text: 'rgb(147, 197, 253)', 
      bg: 'rgba(147, 197, 253, 0.1)', 
      border: 'rgb(59, 130, 246)' 
    },
    projects: { 
      text: 'rgb(134, 239, 172)', 
      bg: 'rgba(134, 239, 172, 0.1)', 
      border: 'rgb(34, 197, 94)' 
    },
    experience: { 
      text: 'rgb(236, 224, 172)', 
      bg: 'rgba(243, 236, 205, 0.1)', 
      border: 'rgb(216, 192, 90)' 
    },
    skills: { 
      text: 'rgb(251, 146, 60)', 
      bg: 'rgba(251, 146, 60, 0.1)', 
      border: 'rgb(234, 88, 12)' 
    },
    contact: { 
      text: 'rgb(244, 114, 182)', 
      bg: 'rgba(244, 114, 182, 0.1)', 
      border: 'rgb(219, 39, 119)' 
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
  const nodeColors = getNodeColors(data.label.toLowerCase().replace(/\s+/g, ''), data.isActive);
  
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-transparent !border-0"
      />
      
      <div 
        className={cn(
          "px-6 py-3 rounded-full border-2 bg-gray-800 text-white font-medium min-w-[160px] text-center transition-all duration-200",
          selected && "ring-2 ring-primary/20"
        )}
        style={{
          borderColor: nodeColors.border,
          color: '#ffffff'
        }}
      >
        <span className="text-sm">{data.label}</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-transparent !border-0"
      />
    </div>
  );
});

WorkflowNode.displayName = 'WorkflowNode';

export default WorkflowNode;