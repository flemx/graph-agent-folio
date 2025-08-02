import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StartSectionProps {
  onNavigate: (section: string) => void;
}

const StartSection = ({ onNavigate }: StartSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 scale-110"></div>
          <div className="relative text-8xl mb-6">🤖</div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            AI Engineer
            <span className="block text-transparent bg-gradient-primary bg-clip-text">
              Portfolio
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Building intelligent agent systems with <span className="text-primary font-semibold">LangChain</span> & <span className="text-primary font-semibold">LangGraph</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-accent">
          <Sparkles className="w-5 h-5" />
          <span className="text-lg font-medium">Applying for AI Engineering at LangChain</span>
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card 
          className="bg-gradient-secondary border-workflow-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
          onClick={() => onNavigate('about')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl">👤</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  About Me
                </h3>
                <p className="text-sm text-muted-foreground">
                  Background, mission, and why LangChain
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-secondary border-workflow-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
          onClick={() => onNavigate('projects')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🤖</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  AI Projects
                </h3>
                <p className="text-sm text-muted-foreground">
                  Agent systems and LLM applications
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-secondary border-workflow-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
          onClick={() => onNavigate('experience')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl">💼</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Experience
                </h3>
                <p className="text-sm text-muted-foreground">
                  Professional journey and achievements
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-secondary border-workflow-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
          onClick={() => onNavigate('skills')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl">⚡</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Technical Skills
                </h3>
                <p className="text-sm text-muted-foreground">
                  LangChain, LangGraph, and more
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-primary border-primary/30 text-center">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Make Agents Ubiquitous?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Let's explore how my expertise in agent orchestration can contribute to LangChain's mission.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => onNavigate('contact')}
          >
            Get In Touch
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4">
          <div className="text-2xl font-bold text-primary">5+</div>
          <div className="text-sm text-muted-foreground">Years AI/ML</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-primary">20+</div>
          <div className="text-sm text-muted-foreground">Agent Systems</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-primary">100k+</div>
          <div className="text-sm text-muted-foreground">Daily Interactions</div>
        </div>
      </div>
    </div>
  );
};

export default StartSection;