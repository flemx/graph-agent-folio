import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowRight, CheckCircle, ArrowBigLeft } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SplineScene } from '@/components/ui/splite';
import { TextShimmer } from '@/components/ui/text-shimmer';



interface StartSectionProps {
  onNavigate: (section: string) => void;
}

const StartSection = ({ onNavigate: _onNavigate }: StartSectionProps) => {
  const { startStreaming, streaming, loadingSection, finished, state } = usePortfolio();

  const MODAL_KEY = 'portfolioModalShown';
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (finished && !streaming) {
      const alreadyShown = localStorage.getItem(MODAL_KEY);
      if (!alreadyShown) {
        setShowModal(true);
        localStorage.setItem(MODAL_KEY, '1');
        const timeout = setTimeout(() => setShowModal(false), 4000);
        return () => clearTimeout(timeout);
      }
    }
  }, [finished, streaming]);
  const [linkedinId, setLinkedinId] = useState('');

  // Prefill LinkedIn ID from query param or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get('id') || params.get('linkedin');
    if (prefill) {
      setLinkedinId(prefill);
    } else {
      const stored = localStorage.getItem('linkedinId');
      if (stored) setLinkedinId(stored);
    }
  }, []);

  // Persist the LinkedIn ID so it survives navigation/unmounts
  useEffect(() => {
    const trimmed = linkedinId.trim();
    if (trimmed) {
      localStorage.setItem('linkedinId', trimmed);
    } else {
      localStorage.removeItem('linkedinId');
    }
  }, [linkedinId]);

  const handleStart = () => {
    if (linkedinId.trim()) {
      startStreaming(linkedinId.trim());
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profileName = (state.about_data as any)?.profile?.fullName;

  const handleReset = () => {
    localStorage.removeItem('linkedinId');
    localStorage.removeItem('portfolioState');
    localStorage.removeItem(MODAL_KEY);
    window.location.href = window.location.pathname;
  };

  return (
    <section className="py-12">
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="flex flex-col items-center gap-3">
          <CheckCircle className="w-14 h-14 text-green-500 animate-bounce" />
          <p className="text-3xl font-bold text-green-500">Portfolio Loaded!</p>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col md:flex-row items-center gap-12 pt-12">
        {/* Left column */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 scale-110"></div>
            {finished && profileName ? (
              
              <h1 className="relative text-5xl md:text-6xl font-bold text-foreground bg-clip-text leading-tight">
               {profileName}
         
            </h1>
         
            ) : (
              <h1 className="relative text-5xl md:text-6xl font-bold text-foreground leading-tight">
                AI Engineer
                <span className="block text-transparent bg-gradient-primary bg-clip-text">
                  Portfolio
                </span>
              </h1>
            )}
          </div>

          {/* Input or loaded state */}
          {!finished ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center md:items-start md:justify-start gap-4">
              <Input
                placeholder="Enter LinkedIn profile ID (e.g. fleminks)"
                value={linkedinId}
                onChange={(e) => setLinkedinId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleStart();
                  }
                }}
                disabled={streaming}
                className="flex-1 text-[1.1rem] md:text-[1.2rem]"
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
              {streaming && (
                 <TextShimmer className='font-mono text-sm' duration={1}>
                 Generating portfolio...
               </TextShimmer>
              )}
              {!streaming && (
                <p className="text-sm text-muted-foreground max-w-md mx-auto md:mx-0">
                  A LangGraph agent will crawl your public LinkedIn profile to generate a personalized portfolio.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-center gap-2 text-green-500">
                <CheckCircle className="w-6 h-6 animate-bounce" />
                <span className="font-semibold">Portfolio Loaded!</span>
              </div>
       
              <div className="flex items-center gap-2 text-muted-foreground text-sm md:justify-start justify-center">
                <ArrowBigLeft className="w-4 h-4 animate-bounce-horizontal" />
                <span>Use the sidebar to explore the portfolio</span>
              </div>
              <Button variant="outline" onClick={handleReset} size="sm">
                Load another profile
              </Button>
            </div>
          )}

          {loadingSection && (
            <p className="text-sm text-muted-foreground">
              Processing {loadingSection}…
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
