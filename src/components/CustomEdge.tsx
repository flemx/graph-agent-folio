import { memo } from 'react';
import { BaseEdge, getBezierPath, EdgeProps } from '@xyflow/react';

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
  
  // Create a gentle S-curve regardless of node alignment
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.55, // tweak 0-1 for more/less bend
  });

  return (
    <>
      <defs>
        <marker
          id={`arrow-${source}`}
          viewBox="0 0 10 10"
          // reduce refX so the arrow head sits closer to the node border
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,10 L10,5 z" fill={sourceColor} stroke={sourceColor} />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: sourceColor,
          strokeWidth: 1.5,
        }}
        markerEnd={`url(#arrow-${source})`}
      />
    </>
  );
});

CustomEdge.displayName = 'CustomEdge';

export default CustomEdge;