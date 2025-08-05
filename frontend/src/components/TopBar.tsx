import { ArrowLeft, Menu, Moon, Sun, Github } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import PortfolioWorkflow from '@/components/PortfolioWorkflow';
import { usePortfolio } from '@/context/PortfolioContext';
import { useTheme } from '@/hooks/useTheme';

interface TopBarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const TopBar = ({ activeSection, onSectionChange }: TopBarProps) => {
  const { streaming, loadingSection, finished } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed top-0 left-0 md:left-11 right-0 h-12 bg-background border-b border-border flex items-center px-4 z-20">
    
      {/* Mobile Hamburger + Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden mr-3 rounded-md p-1 hover:bg-accent/20 focus:outline-none">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle workflow navigation</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <PortfolioWorkflow
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            streaming={streaming}
            loadingSection={loadingSection}
            finished={finished}
          />
        </SheetContent>
      </Sheet>

      {/* Theme toggle (mobile) */}
      <button
        onClick={toggleTheme}
        className="md:hidden mr-3 rounded-md p-1 hover:bg-accent/20 focus:outline-none"
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </button>

      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4 hidden sm:inline" />
        <span>Agentfolio</span>
        <span className="hidden sm:inline">/</span>
        <span className="hidden sm:inline">agent</span>
        <span className="text-foreground hidden sm:inline">Portfolio</span>

      </div>

      {/* GitHub repo link */}
      <a
        href="https://github.com/flemx/graph-agent-folio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex ml-auto rounded-md p-1 hover:bg-accent/20 focus:outline-none"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">View source on GitHub</span>
      </a>
      
    </div>
  );
};

export default TopBar;