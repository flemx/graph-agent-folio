declare module '@splinetool/react-spline' {
  import { ComponentType } from 'react';
  export interface SplineProps {
    scene: string;
    className?: string;
    style?: React.CSSProperties;
  }
  const Spline: ComponentType<SplineProps>;
  export default Spline;
}
