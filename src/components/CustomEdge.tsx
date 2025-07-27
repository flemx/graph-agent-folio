import { memo } from 'react';
import { BaseEdge, getSmoothStepPath, EdgeProps } from '@xyflow/react';

const getSourceNodeColor = (sourceId: string) => {
  const colors = {
    start: 'rgb(153, 153, 153)',
    about: 'rgb(45, 190, 172)',
    projects: 'rgb(216, 192, 90)',
    experience: 'rgb(221, 85, 108)',
    end: 'rgb(153, 153, 153)'
  };
  return colors[sourceId as keyof typeof colors] || 'rgb(153, 153, 153)';
};

const CustomEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  source,
}: EdgeProps) => {
  const sourceColor = getSourceNodeColor(source);
  
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
  });

  return (
    <>
      <defs>
        <marker
          id={`arrow-${source}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={sourceColor} />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: sourceColor,
          strokeWidth: 2,
        }}
        markerEnd={`url(#arrow-${source})`}
      />
    </>
  );
});

CustomEdge.displayName = 'CustomEdge';

export default CustomEdge;