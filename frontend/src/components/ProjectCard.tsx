import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Play, FileText } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  architectureUrl?: string;
  screenshots: string[];
  category: 'agent' | 'llm' | 'workflow' | 'other';
}

const ProjectCard = ({
  title,
  description,
  problemSolved,
  technologies,
  demoUrl,
  sourceUrl,
  architectureUrl,
  screenshots,
  category
}: ProjectCardProps) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'agent': return '🤖';
      case 'llm': return '🧠';
      case 'workflow': return '⚡';
      default: return '💡';
    }
  };

  return (
    <Card className="group hover:shadow-content transition-all duration-300 bg-gradient-secondary border-workflow-border">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{getCategoryIcon()}</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {category.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Problem Solved */}
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <h4 className="font-medium text-sm text-accent mb-2">Problem Solved</h4>
          <p className="text-sm text-foreground/80">{problemSolved}</p>
        </div>

        {/* Screenshot Placeholder */}
        <div className="aspect-video bg-muted rounded-lg border border-workflow-border flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Screenshot/Demo Video</p>
            <p className="text-xs opacity-70">Coming Soon</p>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="font-medium text-sm mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs border-primary/30">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {demoUrl && (
            <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
              <Play className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          )}
          {sourceUrl && (
            <Button size="sm" variant="outline" className="flex-1 border-primary/30 hover:bg-primary/10">
              <Github className="w-4 h-4 mr-2" />
              Source
            </Button>
          )}
          {architectureUrl && (
            <Button size="sm" variant="outline" className="border-accent/30 hover:bg-accent/10">
              <FileText className="w-4 h-4 mr-2" />
              Architecture
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;