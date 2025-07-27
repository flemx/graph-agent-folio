import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
          🤖
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">AI Engineer</h1>
        <p className="text-xl text-muted-foreground">Building Intelligent Agent Systems</p>
      </div>

      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎯</span>
            Mission & Vision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            Passionate about making intelligent agents ubiquitous and helping developers build 
            mission-critical AI applications. I specialize in creating sophisticated AI agent 
            systems using cutting-edge frameworks like LangChain and LangGraph.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            My focus is on building controllable, reliable, and scalable agent orchestration 
            systems that solve real-world problems. I believe in the transformative power of 
            well-designed AI agents and their potential to revolutionize how we work and interact 
            with technology.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🚀</span>
            Why LangChain?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            LangChain's mission deeply resonates with my vision of the future. The combination of 
            composable integrations through LangChain and controllable agent orchestration via 
            LangGraph represents the gold standard for enterprise AI development.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Agent Orchestration</h4>
              <p className="text-sm text-foreground/80">
                Expert in designing complex multi-agent workflows and state management
              </p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Production-Ready</h4>
              <p className="text-sm text-foreground/80">
                Focus on building reliable, scalable AI applications for enterprise use
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💡</span>
            Core Competencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'LangChain', 'LangGraph', 'LLM Orchestration',
              'Agent Architecture', 'RAG Systems', 'Vector Databases',
              'Production AI', 'API Integration', 'Workflow Design',
              'Python/TypeScript', 'Cloud Platforms', 'DevOps'
            ].map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="justify-center py-2 border-primary/30 hover:bg-primary/10 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;