import { useState } from 'react';
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
      {/* Sidebar */}
      <Sidebar />
      
      {/* Top Bar */}
      <TopBar />

      {/* Left Panel - Workflow Navigation */}
      <div className="w-96 h-screen overflow-hidden ml-11 mt-12">
        <PortfolioWorkflow 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 h-screen overflow-y-auto mt-12">
        <div className="max-w-4xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
