import React, { useState, useEffect } from 'react';
import { XLogo } from './XLogo';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onRegisterInterest: () => void;
  onNavigateHome: () => void;
  isProjectPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterInterest,
  onNavigateHome,
  isProjectPage = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Requested links: Home, Projects, Services, About, Careers, Contact
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Upcoming Projects', href: '#upcoming-projects' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isProjectPage) {
      onNavigateHome();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const topOffset = 85;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - topOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 80);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const topOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.9)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (isProjectPage) {
                onNavigateHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <XLogo className="w-10 h-10" glow={false} withCircle={true} />
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-[0.22em] text-white uppercase group-hover:text-[#FF2A2A] transition-colors font-heading leading-tight">
                X MARKETING
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3] font-mono font-medium mt-0.5">
                REAL ESTATE - LAHORE
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs xl:text-sm font-medium text-[#A3A3A3] hover:text-white transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E10600] to-[#FF2A2A] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            type="button"
            onClick={onRegisterInterest}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#E10600]/50 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Register Interest</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onRegisterInterest}
            className="sm:hidden flex items-center justify-center p-2.5 rounded-xl red-gradient-bg text-white font-bold text-xs shadow-md shadow-[#E10600]/40"
            aria-label="Register Interest"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF2A2A]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E10600]" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterInterest();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl red-gradient-bg text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register Interest</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
