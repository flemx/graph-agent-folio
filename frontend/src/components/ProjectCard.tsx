import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Play, Video, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // For the modal carousel
  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({ loop: false });
  const [modalSelectedIndex, setModalSelectedIndex] = useState(0);

  // Update the active dot index when the modal carousel changes
  useEffect(() => {
    if (!modalEmblaApi) return;

    const onSelect = () => {
      setModalSelectedIndex(modalEmblaApi.selectedScrollSnap());
    };

    modalEmblaApi.on('select', onSelect);
    onSelect(); // init

    return () => {
      modalEmblaApi.off('select', onSelect);
    };
  }, [modalEmblaApi]);

  // Update the active dot index when the carousel changes
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // init

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

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

    // Single image (no carousel needed)
    if (project.images.length === 1) {
      return (
        <img
          src={project.images[0]}
          alt={project.title}
          className="aspect-video w-full rounded-lg border border-workflow-border object-cover"
        />
      );
    }

    // Multiple images – show carousel with arrows and dots
    return (
      <div className="relative">
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

        {/* Navigation arrows */}
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground rounded-full p-1 shadow"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground rounded-full p-1 shadow"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1 pt-2">
          {project.images.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'w-2 h-2 rounded-full',
                idx === selectedIndex ? 'bg-foreground' : 'bg-muted-foreground/40'
              )}
            />
          ))}
        </div>
      </div>
    );
  }, [project, emblaRef, emblaApi, selectedIndex]);

  return (
    <Dialog>
      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            {project.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground whitespace-pre-line">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Images / Carousel (click to open modal) */}
          <DialogTrigger asChild>{renderImages()}</DialogTrigger>

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

      {/* Modal with enlarged carousel */}
      <DialogContent className="w-full max-w-[90vw] p-0">
        <div className="relative">
          <div className="overflow-hidden" ref={modalEmblaRef}>
            <div className="flex">
              {project.images?.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${project.title}-${idx}`}
                  className="object-scale-down max-h-[90vh] min-w-full"
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          {project.images && project.images.length > 1 && (
            <>
              <button
                onClick={() => modalEmblaApi && modalEmblaApi.scrollPrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground rounded-full p-2 shadow"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => modalEmblaApi && modalEmblaApi.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground rounded-full p-2 shadow"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {project.images && project.images.length > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {project.images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-3 h-3 rounded-full',
                    idx === modalSelectedIndex ? 'bg-foreground' : 'bg-muted-foreground/40'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
