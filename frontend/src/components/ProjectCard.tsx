import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Play, Video, Image as ImageIcon } from 'lucide-react';
import { Project } from '@/types/project';
import useEmblaCarousel from 'embla-carousel-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: false, skipSnaps: false });

  const renderImages = useCallback(() => {
    if (!project.images || project.images.length === 0) {
      return (
        <div className="aspect-video bg-muted rounded-lg border border-workflow-border flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No screenshot available</p>
          </div>
        </div>
      );
    }

    if (project.images.length === 1) {
      return (
        <img
          src={project.images[0]}
          alt={project.title}
          className="aspect-video w-full rounded-lg border border-workflow-border object-cover"
        />
      );
    }

    return (
      <div className="overflow-hidden rounded-lg border border-workflow-border" ref={emblaRef}>
        <div className="flex">
          {project.images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${project.title}-${idx}`}
              className="aspect-video object-cover min-w-full"
            />
          ))}
        </div>
      </div>
    );
  }, [project, emblaRef]);

  return (
    <Card className="bg-gradient-secondary border-workflow-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Images / Carousel */}
        {renderImages()}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs border-primary/30">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 flex-wrap">
          {project.demoVideoUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-accent/30 text-foreground hover:bg-accent/10"
              asChild
            >
              <a href={project.demoVideoUrl} target="_blank" rel="noopener noreferrer">
                <Video className="w-4 h-4 mr-2" />
                Demo Video
              </a>
            </Button>
          )}
          {project.liveDemoUrl && (
            <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.sourceUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10"
              asChild
            >
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Source
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
