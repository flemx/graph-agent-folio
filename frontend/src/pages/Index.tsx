import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import PortfolioWorkflow from '@/components/PortfolioWorkflow';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StartSection from '@/components/sections/StartSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  const { streaming, loadingSection, finished } = usePortfolio();
  const [activeSection, setActiveSection] = useState('start');

  const renderContent = () => {
    switch (activeSection) {
      case 'start':
        return <StartSection onNavigate={setActiveSection} />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'skills':
        return <SkillsSection />;
      case 'contact':
        return <ContactSection />;
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
      <div className="flex-1 h-[calc(100vh-3rem)] overflow-y-auto mt-12">
        <div className="max-w-4xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
