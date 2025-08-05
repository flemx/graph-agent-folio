import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StartSectionProps {
  onNavigate: (section: string) => void;
}

const StartSection = ({ onNavigate }: StartSectionProps) => {
  const { startStreaming, streaming, loadingSection, finished } = usePortfolio();
  const [linkedinId, setLinkedinId] = useState('');

  const handleStart = () => {
    if (linkedinId.trim()) {
      startStreaming(linkedinId.trim());
    }
  };
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

              {/* LinkedIn ID input */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 max-w-md mx-auto">
          <Input
            placeholder="Enter LinkedIn profile ID (e.g. fleminks)"
            value={linkedinId}
            onChange={(e) => setLinkedinId(e.target.value)}
            disabled={streaming}
            className="flex-1"
          />
          <Button
            onClick={handleStart}
            disabled={streaming || !linkedinId.trim()}
            size="lg"
          >
            {streaming ? 'Loading…' : 'Start'}
            {!streaming && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
        {loadingSection && (
          <p className="text-sm text-muted-foreground mt-2">Processing {loadingSection}…</p>
        )}
        {finished && (
          <p className="text-sm text-green-600 mt-2">Profile loaded! Use the sidebar to explore.</p>
        )}
        </div>
        </div>
  );
};

export default StartSection;