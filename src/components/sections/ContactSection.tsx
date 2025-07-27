import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Github, Linkedin, ExternalLink, Download } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Let's Build the Future</h2>
        <p className="text-lg text-muted-foreground">
          Ready to make intelligent agents ubiquitous together
        </p>
      </div>

      <Card className="bg-gradient-primary border-primary/30 text-center">
        <CardContent className="p-8">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-2xl font-bold text-white mb-3">Join LangChain's Mission</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            I'm excited about the opportunity to contribute to LangChain's vision of making 
            intelligent agents ubiquitous. Let's discuss how my expertise in agent orchestration 
            and LLM applications can help drive the next phase of AI innovation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-secondary border-workflow-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📍</span>
              Location & Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Preferred Locations</h4>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-primary/30">San Francisco, CA</Badge>
                <Badge variant="outline" className="border-primary/30">New York, NY</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Availability</h4>
              <p className="text-sm text-foreground/80">
                Available for immediate start • Open to relocation • Flexible work arrangements
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Work Style</h4>
              <p className="text-sm text-foreground/80">
                Thrives in fast-moving environments • Collaborative team player • 
                Self-driven with ownership mindset
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary border-workflow-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🔗</span>
              Connect With Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-workflow-border hover:bg-primary/10">
                <Mail className="w-4 h-4 mr-3" />
                your.email@example.com
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-workflow-border hover:bg-primary/10">
                <Github className="w-4 h-4 mr-3" />
                github.com/yourusername
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-workflow-border hover:bg-primary/10">
                <Linkedin className="w-4 h-4 mr-3" />
                linkedin.com/in/yourprofile
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
            </div>
            
            <div className="pt-4 border-t border-workflow-border">
              <p className="text-xs text-muted-foreground text-center">
                Response time: Usually within 24 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-accent border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-4 text-center">Why I'm Excited About This Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🌟</div>
              <h4 className="font-semibold text-foreground mb-2">Mission Alignment</h4>
              <p className="text-sm text-foreground/80">
                Passionate about making AI agents accessible to every developer
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-semibold text-foreground mb-2">Growth Opportunity</h4>
              <p className="text-sm text-foreground/80">
                Eager to work with the team defining the future of AI applications
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-semibold text-foreground mb-2">Customer Focus</h4>
              <p className="text-sm text-foreground/80">
                Love working directly with developers to solve real problems
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;