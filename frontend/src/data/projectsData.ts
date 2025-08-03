import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    title: 'Multi-Agent Research Assistant',
    description:
      'Autonomous research system with specialized agents for data collection, analysis, and report generation using LangGraph orchestration.',
    technologies: ['LangGraph', 'LangChain', 'GPT-4', 'Pinecone', 'FastAPI', 'React'],
    images: [
      'https://placehold.co/800x450?text=Research+Assistant+1',
      'https://placehold.co/800x450?text=Research+Assistant+2',
    ],
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    liveDemoUrl: 'https://research-assistant.demo',
    sourceUrl: 'https://github.com/example/research-assistant',
  },
  {
    title: 'Intelligent Code Review Agent',
    description:
      'AI-powered code review system that provides contextual feedback, security analysis, and optimization suggestions integrated with GitHub workflows.',
    technologies: ['LangChain', 'GitHub API', 'CodeBERT', 'Docker', 'Python', 'TypeScript'],
    images: ['https://placehold.co/800x450?text=Code+Review+Agent'],
    liveDemoUrl: 'https://codereview.demo',
    sourceUrl: 'https://github.com/example/code-review-agent',
  },
  {
    title: 'RAG-Enhanced Document Intelligence',
    description:
      'Advanced RAG system with dynamic retrieval strategies, document understanding, and conversational interfaces for enterprise knowledge bases.',
    technologies: ['LangChain', 'ChromaDB', 'OpenAI', 'PDF Processing', 'FastAPI'],
    images: ['https://placehold.co/800x450?text=Doc+Intelligence+1', 'https://placehold.co/800x450?text=Doc+Intelligence+2', 'https://placehold.co/800x450?text=Doc+Intelligence+3'],
    sourceUrl: 'https://github.com/example/rag-document-intelligence',
  },
];