import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowRight } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';

interface StartSectionProps {
  onNavigate: (section: string) => void;
}

const StartSection = ({ onNavigate: _onNavigate }: StartSectionProps) => {
  const { startStreaming, streaming, loadingSection, finished } = usePortfolio();
  const [linkedinId, setLinkedinId] = useState('');

  const handleStart = () => {
    if (linkedinId.trim()) {
      startStreaming(linkedinId.trim());
    }
  };

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left column */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 scale-110"></div>
            <h1 className="relative text-5xl md:text-6xl font-bold text-foreground leading-tight">
              AI Engineer
              <span className="block text-transparent bg-gradient-primary bg-clip-text">
                Portfolio
              </span>
            </h1>
          </div>

          {/* LinkedIn ID input */}
          <div className="flex flex-col sm:flex-row items-center md:items-start md:justify-start gap-4">
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
            <p className="text-sm text-muted-foreground">
              Processing {loadingSection}…
            </p>
          )}
          {finished && (
            <p className="text-sm text-green-600">
              Profile loaded! Use the sidebar to explore.
            </p>
          )}
        </div>

        {/* Spline scene */}
        <div className="flex-1 w-full h-64 sm:h-96 md:h-[500px]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default StartSection;
