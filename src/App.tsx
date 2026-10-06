/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveVideo } from './components/LiveVideo';
import { ScrollingTicker } from './components/ScrollingTicker';
import { StatsStrip } from './components/StatsStrip';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowWeWork } from './components/HowWeWork';
import { FeaturedProjects } from './components/FeaturedProjects';
import { UpcomingProjects } from './components/UpcomingProjects';
import { ServicesGrid } from './components/ServicesGrid';
import { TestimonialsSlider } from './components/TestimonialsSlider';
import { CareersBanner } from './components/CareersBanner';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { XAIAssistant } from './components/XAIAssistant';
import { Lightbox } from './components/Lightbox';
import { RegisterInterestModal } from './components/RegisterInterestModal';
import { ProjectPage } from './components/ProjectPage';
import { FEATURED_PROJECTS, Project } from './data/content';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [preselectedProjectName, setPreselectedProjectName] = useState<string | undefined>(undefined);

  // Sync with URL hash for bookmarking and back/forward browser buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const projectId = hash.replace('#project/', '');
        const found = FEATURED_PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setActiveProject(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#home' || hash === '' || !hash.includes('project/')) {
        setActiveProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenRegisterInterest = (project?: Project | string) => {
    if (typeof project === 'string') {
      setPreselectedProjectName(project);
    } else if (project && project.name) {
      setPreselectedProjectName(project.name);
    } else if (activeProject) {
      setPreselectedProjectName(activeProject.name);
    } else {
      setPreselectedProjectName(undefined);
    }
    setIsRegisterModalOpen(true);
  };

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    window.location.hash = `#project/${project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActiveProject(null);
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreProjects = () => {
    if (activeProject) {
      handleNavigateHome();
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) {
          const topOffset = 85;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - topOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById('projects');
    if (el) {
      const topOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleSelectService = (_serviceTitle: string) => {
    if (activeProject) {
      handleNavigateHome();
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          const topOffset = 85;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - topOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById('contact');
    if (el) {
      const topOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#A3A3A3] font-sans selection:bg-[#E10600] selection:text-white relative">
        {/* 1) SPLASH SCREEN */}
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

        {/* 2) STICKY NAVBAR */}
        <Navbar
          onRegisterInterest={() => handleOpenRegisterInterest()}
          onNavigateHome={handleNavigateHome}
          isProjectPage={Boolean(activeProject)}
        />

        {/* MAIN ROUTED CONTENT */}
        {activeProject ? (
          <main>
            <ProjectPage
              project={activeProject}
              onBack={handleNavigateHome}
              onRegisterInterest={(proj) => handleOpenRegisterInterest(proj)}
            />
          </main>
        ) : (
          <main>
            {/* 3) HERO SECTION */}
            <Hero
              onExploreProjects={handleExploreProjects}
              onRegisterInterest={() => handleOpenRegisterInterest()}
            />

            <LiveVideo />

            {/* 4) SCROLLING TICKER MARQUEE UNDER HERO */}
            <ScrollingTicker />

            {/* 5) ANIMATED COUNTERS */}
            <StatsStrip />

            {/* 6) WHY CHOOSE X MARKETING */}
            <WhyChooseUs onScheduleCall={() => handleOpenRegisterInterest()} />

            {/* 7) HOW WE WORK */}
            <HowWeWork onStartBooking={() => handleOpenRegisterInterest()} />

            {/* 8) FEATURED PROJECTS WITH ANIMATED BACKGROUND VIDEO */}
            <FeaturedProjects
              onSelectProject={handleSelectProject}
              onRegisterInterest={(proj) => handleOpenRegisterInterest(proj)}
            />

            <UpcomingProjects />

            {/* 9) SERVICES GRID */}
            <ServicesGrid onSelectService={handleSelectService} />

            {/* 10) TESTIMONIALS SLIDER */}
            <TestimonialsSlider />

            {/* 11) CAREERS BANNER */}
            <CareersBanner />

            {/* 12) CTA SECTION */}
            <CtaSection onRegisterInterest={() => handleOpenRegisterInterest()} />

            {/* 13) CONTACT SECTION */}
            <ContactSection />
          </main>
        )}

        {/* 14) FOOTER WITH LEGAL NOTE */}
        <Footer
          onRegisterInterest={() => handleOpenRegisterInterest()}
          onNavigateHome={handleNavigateHome}
        />

        {/* FLOATING WHATSAPP BUTTON */}
        <FloatingWhatsApp />
        <XAIAssistant />

        <Lightbox />

        {/* MULTI-STEP "REGISTER INTEREST" MODAL */}
        <RegisterInterestModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          preselectedProject={preselectedProjectName}
        />

      </div>
  );
}
