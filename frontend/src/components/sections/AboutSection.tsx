import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Sparkles, Link2, Github, Linkedin, Globe } from 'lucide-react';
import { AboutSectionData } from '@/types/about';
import { usePortfolio } from '@/context/PortfolioContext';

interface AboutSectionProps {
  data?: AboutSectionData;
  onNavigate?: (section: string) => void;
}

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const AboutSection = ({ data, onNavigate }: AboutSectionProps) => {
  const { state, streaming } = usePortfolio();
  const liveData = state.about_data as AboutSectionData | undefined;
  const resolved = liveData ?? data;
  const contact = resolved.contact ?? ({} as Partial<AboutSectionData["contact"]>);
  if (!resolved || !resolved.profile) {
    return null; // or a skeleton component
  }
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
          <img src={resolved.profile.avatar} alt={resolved.profile.fullName} className="object-cover w-full h-full" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">{resolved.profile.fullName}</h1>
        <p className="text-xl text-muted-foreground">{resolved.profile.subTitle}</p>
      </div>

      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {/* Icon */}
            <User className="w-4 h-4" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(resolved.profile.summary ? resolved.profile.summary.split('\n\n') : []).map((paragraph, idx) => (
            <p key={idx} className="text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 mt-2">
            {(resolved.profile.languages ?? []).map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {resolved.profile.country}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {/* Icon */}
            <Link2 className="w-4 h-4" />
            Connect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="space-y-2">
            <li>
              <a
                href={contact.linkedin ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </li>
            {contact.github && (
              <li>
                <a
                  href={resolved.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            )}
            {(contact.websites ?? []).map((site) => (
              <li key={site}>
                <a
                  href={site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Globe className="w-4 h-4" />
                  {site}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gradient-secondary border-workflow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {/* Icon */}
            <Sparkles className="w-4 h-4" />
            Core Competencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(resolved.skills ?? []).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="justify-center py-2 border-primary/30 hover:bg-primary/10 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {onNavigate && !streaming && (
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            Next <ArrowDown className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AboutSection;