import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "AI Frameworks & Orchestration",
      icon: "🤖",
      skills: [
        { name: "LangChain", level: 95, description: "Expert in composable LLM applications" },
        { name: "LangGraph", level: 90, description: "Advanced agent workflow orchestration" },
        { name: "LangSmith", level: 85, description: "Production monitoring & debugging" },
        { name: "OpenAI API", level: 90, description: "GPT-4, embeddings, fine-tuning" },
        { name: "Anthropic Claude", level: 80, description: "Constitutional AI applications" }
      ]
    },
    {
      title: "Agent Architecture & Patterns",
      icon: "⚡",
      skills: [
        { name: "Multi-Agent Systems", level: 90, description: "Hierarchical agent coordination" },
        { name: "State Management", level: 85, description: "Complex workflow state handling" },
        { name: "Tool Integration", level: 95, description: "Custom tool creation & orchestration" },
        { name: "Memory Systems", level: 80, description: "Persistent & working memory design" },
        { name: "Error Handling", level: 85, description: "Robust failure recovery patterns" }
      ]
    },
    {
      title: "Vector & Knowledge Systems",
      icon: "🧠",
      skills: [
        { name: "RAG Architecture", level: 90, description: "Advanced retrieval strategies" },
        { name: "Vector Databases", level: 85, description: "Pinecone, Chroma, Weaviate" },
        { name: "Embedding Optimization", level: 80, description: "Custom embedding strategies" },
        { name: "Knowledge Graphs", level: 75, description: "Neo4j, semantic relationships" },
        { name: "Document Processing", level: 85, description: "PDF, text, multimodal parsing" }
      ]
    },
    {
      title: "Development & Infrastructure",
      icon: "🛠️",
      skills: [
        { name: "Python", level: 95, description: "Advanced async programming" },
        { name: "TypeScript/React", level: 85, description: "Modern frontend development" },
        { name: "FastAPI", level: 90, description: "High-performance API development" },
        { name: "Docker/K8s", level: 80, description: "Containerization & orchestration" },
        { name: "AWS/GCP", level: 75, description: "Cloud deployment & scaling" }
      ]
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "OpenAI API Specialist",
    "LangChain Certification (Hypothetical)",
    "Kubernetes Application Developer"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Technical Expertise</h2>
        <p className="text-lg text-muted-foreground">
          Specialized in LLM orchestration & agent system architecture
        </p>
      </div>

      <div className="grid gap-6">
        {skillCategories.map((category, index) => (
          <Card key={index} className="bg-gradient-secondary border-workflow-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">{category.icon}</span>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-secondary border-workflow-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🏆</span>
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-primary text-sm">✓</span>
                  <span className="text-sm text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span>🎯</span>
              LangChain Expertise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                'Chains & Prompts',
                'Agent Executors', 
                'Memory Systems',
                'Tool Integration',
                'Custom Components',
                'Production Deployment'
              ].map((skill, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="justify-center py-2 border-primary/30 bg-primary/5 text-primary"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-foreground/80 mt-4">
              Deep expertise in the entire LangChain ecosystem, from core concepts to advanced 
              production patterns and custom component development.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillsSection;