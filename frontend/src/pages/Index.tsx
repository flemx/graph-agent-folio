import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import PortfolioWorkflow from '@/components/PortfolioWorkflow';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StartSection from '@/components/sections/StartSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';


const Index = () => {
  const { streaming, loadingSection, finished, state } = usePortfolio();

  // When workflow completes, return to the start hero
  useEffect(() => {
    if (finished) {
      setActiveSection('start');
    }
  }, [finished]);
  const [activeSection, setActiveSection] = useState('start');

    const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when streaming data appends content
  useEffect(() => {
    if (contentRef.current && streaming) {
      const el = contentRef.current;
      // If user is near the bottom (within 150px), auto-scroll to keep new content in view
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
      if (isNearBottom) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [state, streaming]);

  const renderContent = () => {
    switch (activeSection) {
      case 'start':
        return <StartSection onNavigate={setActiveSection} />;
      case 'about':
        return <AboutSection onNavigate={setActiveSection} />;
      case 'projects':
        return <ProjectsSection onNavigate={setActiveSection} />;
      case 'experience':
        return <ExperienceSection onNavigate={setActiveSection} />;
      default:
        return <StartSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Top Bar */}
      <TopBar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Left Panel - Workflow Navigation (desktop only) */}
      <div className="hidden md:block w-96 h-[calc(100vh-3rem)] md:ml-11 mt-12 flex-none overflow-hidden">
        <PortfolioWorkflow 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          streaming={streaming}
          loadingSection={loadingSection}
          finished={finished}
        />
      </div>

      {/* Right Panel - Content */}
      <div ref={contentRef} className="flex-1 h-[calc(100vh-3rem)] overflow-y-auto mt-12">
        <div className="max-w-6xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
