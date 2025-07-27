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

const WorkflowNode = memo(({ data, selected }: WorkflowNodeProps) => {
  return (
    <div className={cn(
      "relative bg-node-bg border border-workflow-border rounded-lg p-4 min-w-[140px] shadow-node transition-all duration-200",
      "hover:bg-node-hover hover:border-primary/50",
      selected && "border-primary bg-node-hover ring-2 ring-primary/20",
      data.isActive && "border-primary bg-gradient-accent"
    )}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-connection-line !border-0 hover:!bg-primary"
      />
      
      <div className="flex flex-col items-center gap-2 text-center">
        {data.icon && (
          <div className="text-2xl">{data.icon}</div>
        )}
        <div className="text-sm font-medium text-node-text">
          {data.label}
        </div>
        {data.description && (
          <div className="text-xs text-muted-foreground opacity-80">
            {data.description}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-connection-line !border-0 hover:!bg-primary"
      />
    </div>
  );
});

WorkflowNode.displayName = 'WorkflowNode';

export default WorkflowNode;