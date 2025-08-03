import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Sparkles, Link2, Github, Linkedin, Globe } from 'lucide-react';
import { AboutSectionData } from '@/types/about';
import { aboutData } from '@/data/aboutData';

interface AboutSectionProps {
  data?: AboutSectionData;
}

const AboutSection = ({ data = aboutData }: AboutSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
          <img src={data.profile.avatar} alt={data.profile.fullName} className="object-cover w-full h-full" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">{data.profile.fullName}</h1>
        <p className="text-xl text-muted-foreground">{data.profile.subTitle}</p>
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
          {data.profile.summary.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 mt-2">
            {data.profile.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {data.profile.country}
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
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </li>
            {data.contact.github && (
              <li>
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            )}
            {data.contact.websites?.map((site) => (
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
            {data.skills.map((skill) => (
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
    </div>
  );
};

export default AboutSection;