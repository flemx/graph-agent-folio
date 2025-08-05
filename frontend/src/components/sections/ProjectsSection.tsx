import ProjectCard from '../ProjectCard';
import { Project } from '@/types/project';
import { projectsData } from '@/data/projectsData';
import { usePortfolio } from '@/context/PortfolioContext';

const ProjectsSection = () => {
  const { state } = usePortfolio();
  const projects: Project[] = (state.projects_data as { projects: Project[] } | undefined)?.projects ?? projectsData;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">AI Agent Projects</h2>
        <p className="text-lg text-muted-foreground">
          Showcasing intelligent systems built with LangChain &amp; LangGraph
        </p>
      </div>

      {/* List projects vertically */}
      <div className="grid gap-6 grid-cols-1 [@media(min-width:1156px)]:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
