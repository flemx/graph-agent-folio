import { useState } from 'react';
import PortfolioWorkflow from '@/components/PortfolioWorkflow';
import StartSection from '@/components/sections/StartSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
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
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Workflow Navigation */}
      <div className="w-96 h-screen overflow-hidden">
        <PortfolioWorkflow 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
