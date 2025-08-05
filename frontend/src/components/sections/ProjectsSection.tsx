import ProjectCard from '../ProjectCard';
import { Project } from '@/types/project';
import { usePortfolio } from '@/context/PortfolioContext';

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface ProjectsSectionProps {
  onNavigate?: (section: string) => void;
}

const ProjectsSection = ({ onNavigate }: ProjectsSectionProps) => {
  const { state, streaming } = usePortfolio();
  const projects: Project[] = (state.projects_data as { projects: Project[] } | undefined)?.projects ?? [];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Projects</h2>

      </div>

      {/* List projects vertically */}
      {projects.length ? (
        <div className="grid gap-10 grid-cols-1 [@media(min-width:1156px)]:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No projects detected on this LinkedIn profile.
        </p>
      )}
    
      {onNavigate && !streaming && (
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            onClick={() => onNavigate('experience')}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            Next <ArrowDown className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
