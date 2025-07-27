import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior AI Engineer",
      company: "TechCorp AI",
      period: "2023 - Present",
      location: "San Francisco, CA",
      description: "Leading development of production AI agent systems serving 50k+ users. Built multi-agent workflows using LangGraph for customer support automation, achieving 85% resolution rate without human intervention.",
      achievements: [
        "Architected scalable agent orchestration platform handling 100k+ daily interactions",
        "Reduced customer response time from 4 hours to 30 seconds",
        "Led team of 5 engineers building LangChain-based solutions",
        "Implemented comprehensive monitoring and cost optimization strategies"
      ],
      technologies: ["LangChain", "LangGraph", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS"]
    },
    {
      title: "Machine Learning Engineer",
      company: "InnovateLabs",
      period: "2021 - 2023", 
      location: "New York, NY",
      description: "Developed and deployed LLM-powered applications for enterprise clients. Specialized in RAG systems, embedding optimization, and conversational AI interfaces.",
      achievements: [
        "Built enterprise RAG system processing 10M+ documents",
        "Improved query accuracy by 40% through advanced retrieval strategies",
        "Created reusable LangChain components adopted across 12 client projects",
        "Reduced infrastructure costs by 60% through efficient vector database design"
      ],
      technologies: ["OpenAI API", "Pinecone", "LangChain", "React", "Node.js", "MongoDB"]
    },
    {
      title: "Software Engineer",
      company: "DataFlow Solutions",
      period: "2019 - 2021",
      location: "Austin, TX", 
      description: "Full-stack development with focus on data processing pipelines and API integrations. Gained expertise in distributed systems and microservices architecture.",
      achievements: [
        "Built real-time data processing system handling 1M+ events/day",
        "Designed RESTful APIs serving 50+ enterprise clients",
        "Implemented CI/CD pipelines reducing deployment time by 70%",
        "Mentored junior developers on best practices and system design"
      ],
      technologies: ["Python", "JavaScript", "Kafka", "Redis", "Kubernetes", "PostgreSQL"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Professional Experience</h2>
        <p className="text-lg text-muted-foreground">
          Building enterprise AI solutions & agent systems
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <Card key={index} className="bg-gradient-secondary border-workflow-border">
            <CardHeader>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <CardTitle className="text-xl text-foreground">{experience.title}</CardTitle>
                  <p className="text-lg font-semibold text-primary">{experience.company}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p className="font-medium">{experience.period}</p>
                  <p>{experience.location}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                {experience.description}
              </p>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2">
                      <span className="text-primary text-sm mt-1">▸</span>
                      <span className="text-sm text-foreground/80">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="outline" 
                      className="text-xs border-primary/30 hover:bg-primary/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-accent border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">Career Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">5+</div>
              <p className="text-sm text-foreground/80">Years in AI/ML</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">20+</div>
              <p className="text-sm text-foreground/80">Agent Systems Built</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100k+</div>
              <p className="text-sm text-foreground/80">Daily AI Interactions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceSection;