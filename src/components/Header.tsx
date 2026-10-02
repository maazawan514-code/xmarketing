import React, { useState, useEffect } from 'react';
import { XLogo } from './XLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenGetStarted,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/95 backdrop-blur-md border-b border-neutral-900 shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
          : 'bg-[#000000]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-20 md:h-24 flex items-center justify-between">
        {/* Brand Lockup: Red X logo + 'X MARKETING' */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] rounded-md p-1 -ml-1 transition-transform"
        >
          <XLogo className="w-8 h-8 md:w-9 md:h-9" glow={false} />
          <span className="text-white font-bold text-sm md:text-base tracking-[0.28em] uppercase transition-colors group-hover:text-neutral-200">
            X MARKETING
          </span>
        </button>

        {/* Desktop Navigation Links matching screenshot */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF0000] rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Hamburger for Mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGetStarted}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#FF0000]/30 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-900 bg-[#08080a] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-900/50 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FF0000]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-sm transition-colors shadow-md shadow-[#FF0000]/30"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
