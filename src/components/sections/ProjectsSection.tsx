import ProjectCard from '../ProjectCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Multi-Agent Research Assistant",
      description: "Autonomous research system with specialized agents for data collection, analysis, and report generation using LangGraph orchestration.",
      problemSolved: "Researchers spend 60% of their time on repetitive data gathering tasks. This system automates the entire research pipeline, from query understanding to comprehensive report generation, reducing research time by 80%.",
      technologies: ["LangGraph", "LangChain", "GPT-4", "Pinecone", "FastAPI", "React"],
      category: "agent" as const,
      demoUrl: "#",
      sourceUrl: "#",
      architectureUrl: "#",
      screenshots: []
    },
    {
      title: "Intelligent Code Review Agent",
      description: "AI-powered code review system that provides contextual feedback, security analysis, and optimization suggestions integrated with GitHub workflows.",
      problemSolved: "Manual code reviews are time-consuming and often miss subtle issues. This agent provides instant, comprehensive analysis while maintaining code quality standards and catching security vulnerabilities early.",
      technologies: ["LangChain", "GitHub API", "CodeBERT", "Docker", "Python", "TypeScript"],
      category: "agent" as const,
      demoUrl: "#",
      sourceUrl: "#",
      architectureUrl: "#",
      screenshots: []
    },
    {
      title: "Customer Support Agent Orchestrator", 
      description: "Hierarchical agent system managing customer inquiries with escalation protocols, knowledge base integration, and sentiment analysis.",
      problemSolved: "Customer support teams are overwhelmed with repetitive queries. This system handles 85% of tier-1 support automatically while intelligently escalating complex issues to human agents with full context.",
      technologies: ["LangGraph", "Supabase", "Embeddings", "Sentiment Analysis", "WebSocket"],
      category: "agent" as const,
      demoUrl: "#",
      sourceUrl: "#",
      architectureUrl: "#",
      screenshots: []
    },
    {
      title: "RAG-Enhanced Document Intelligence",
      description: "Advanced RAG system with dynamic retrieval strategies, document understanding, and conversational interfaces for enterprise knowledge bases.",
      problemSolved: "Enterprise knowledge is scattered across documents and systems, making information retrieval inefficient. This system provides instant, accurate answers from complex document collections with source attribution.",
      technologies: ["LangChain", "ChromaDB", "OpenAI Embeddings", "PDF Processing", "FastAPI"],
      category: "llm" as const,
      demoUrl: "#",
      sourceUrl: "#",
      architectureUrl: "#",
      screenshots: []
    },
    {
      title: "Automated Workflow Generator",
      description: "LLM-powered system that converts natural language descriptions into executable LangGraph workflows with visual editing capabilities.",
      problemSolved: "Creating complex agent workflows requires deep technical knowledge. This system democratizes agent creation by allowing domain experts to describe workflows in natural language and automatically generating production-ready code.",
      technologies: ["LangGraph", "Code Generation", "AST Parsing", "React Flow", "Python"],
      category: "workflow" as const,
      demoUrl: "#",
      sourceUrl: "#", 
      architectureUrl: "#",
      screenshots: []
    },
    {
      title: "Real-time Agent Analytics Platform",
      description: "Comprehensive monitoring and analytics dashboard for LangGraph agents with performance metrics, cost tracking, and optimization insights.",
      problemSolved: "Agent systems in production lack visibility into performance, costs, and failure modes. This platform provides real-time monitoring and actionable insights to optimize agent performance and reduce operational costs.",
      technologies: ["LangSmith", "Grafana", "PostgreSQL", "Redis", "WebSocket", "React"],
      category: "other" as const,
      demoUrl: "#",
      sourceUrl: "#",
      architectureUrl: "#",
      screenshots: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">AI Agent Projects</h2>
        <p className="text-lg text-muted-foreground">
          Showcasing intelligent systems built with LangChain & LangGraph
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-accent rounded-lg border border-primary/20">
        <h3 className="text-xl font-semibold text-primary mb-3">Agent Architecture Philosophy</h3>
        <p className="text-foreground/90 leading-relaxed mb-4">
          All projects follow enterprise-grade patterns: modular agent design, state management with LangGraph, 
          comprehensive error handling, and monitoring integration. Each system is built for scalability, 
          maintainability, and production deployment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">🔄</div>
            <p className="font-medium">Controllable Orchestration</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="font-medium">Observable Systems</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <p className="font-medium">Production-Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;