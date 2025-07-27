import { ArrowLeft } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="fixed top-0 left-11 right-0 h-12 bg-background border-b border-border flex items-center px-4 z-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" />
        <span>LangGraph Studio</span>
        <span>/</span>
        <span>agent</span>
        <span className="text-foreground">Graph</span>
      </div>
    </div>
  );
};

export default TopBar;