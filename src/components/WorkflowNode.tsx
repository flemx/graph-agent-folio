import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface WorkflowNodeProps {
  data: {
    label: string;
    icon?: string;
    isActive?: boolean;
    dimmed?: boolean;
    description?: string;
  };
  selected?: boolean;
}

const getNodeColors = (nodeId: string, isActive: boolean, theme: 'light' | 'dark') => {
  const colorsDark = {
    start: { text: 'rgb(255, 255, 255)', bg: 'rgba(255, 255, 255, 0.1)', border: 'rgb(153, 153, 153)' },
    about: { text: 'rgb(172, 236, 228)', bg: 'rgba(45, 190, 172, 0.1)', border: 'rgb(45, 190, 172)' },
    projects: { text: 'rgb(236, 224, 172)', bg: 'rgba(243, 236, 205, 0.1)', border: 'rgb(216, 192, 90)' },
    experience: { text: 'rgb(238, 170, 181)', bg: 'rgba(236, 161, 174, 0.1)', border: 'rgb(221, 85, 108)' },
    skills: { text: 'rgb(251, 146, 60)', bg: 'rgba(234, 88, 12, 0.1)', border: 'rgb(234, 88, 12)' },
    contact: { text: 'rgb(244, 114, 182)', bg: 'rgba(219, 39, 119, 0.1)', border: 'rgb(219, 39, 119)' },
    end: { text: 'rgb(255, 255, 255)', bg: 'rgba(255, 255, 255, 0.1)', border: 'rgb(153, 153, 153)' }
  } as const;

  const colorsLight = {
    start: { text: 'rgb(40, 40, 40)', bg: 'rgba(0, 0, 0, 0.05)', border: 'rgb(153, 153, 153)' },
    about: { text: 'rgb(0, 108, 100)', bg: 'rgba(45, 190, 172, 0.15)', border: 'rgb(45, 190, 172)' },
    projects: { text: 'rgb(108, 87, 0)', bg: 'rgba(216, 192, 90, 0.15)', border: 'rgb(216, 192, 90)' },
    experience: { text: 'rgb(146, 35, 52)', bg: 'rgba(221, 85, 108, 0.15)', border: 'rgb(221, 85, 108)' },
    skills: { text: 'rgb(156, 58, 12)', bg: 'rgba(234, 88, 12, 0.15)', border: 'rgb(234, 88, 12)' },
    contact: { text: 'rgb(166, 14, 92)', bg: 'rgba(219, 39, 119, 0.15)', border: 'rgb(219, 39, 119)' },
    end: { text: 'rgb(40, 40, 40)', bg: 'rgba(0, 0, 0, 0.05)', border: 'rgb(153, 153, 153)' }
  } as const;

  const palette = theme === 'dark' ? colorsDark : colorsLight;
  const nodeColors = palette[nodeId as keyof typeof palette] || palette.start;

  if (isActive) {
    return {
      ...nodeColors,
      bg: nodeColors.bg.replace('0.1', '0.2').replace('0.15', '0.25'),
    };
  }

  return nodeColors;
};

const WorkflowNode = memo(({ data, selected }: WorkflowNodeProps) => {
  const { theme } = useTheme();
  const nodeId = data.label.toLowerCase().replace(/\s+/g, '').replace('aiprojects', 'projects');
  const nodeColors = getNodeColors(nodeId, data.isActive, theme);
  const isStartOrEnd = nodeId === 'start' || nodeId === '__start__' || nodeId === 'end' || nodeId === '__end__';
  
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-transparent !border-0 !top-0"
      />
      
      <div 
        className={cn(
          "px-3 py-1.5 border-2 font-medium min-w-[160px] text-center",
          isStartOrEnd ? "rounded-full" : "rounded-md",
          selected && "ring-2 ring-primary/20",
          !isStartOrEnd && data.isActive && "scale-105",
          !isStartOrEnd && !data.isActive && "hover:scale-105",
        )}
        style={{
          borderColor: nodeColors.border,
          backgroundColor: nodeColors.bg,
          color: nodeColors.text,
          opacity: data.dimmed ? 0.4 : 1,
          transition: 'transform 250ms ease, opacity 250ms ease 50ms',
        }}
      >
        <span className="text-sm">{data.label}</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-1.5 !h-1.5 !bg-transparent !border-0 !bottom-1"
      />
    </div>
  );
});

WorkflowNode.displayName = 'WorkflowNode';

export default WorkflowNode;