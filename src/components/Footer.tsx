import React from 'react';
import { XLogo } from './XLogo';
import { SocialLinks } from './SocialLinks';
import { COMPANY } from '../data/content';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  onRegisterInterest?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRegisterInterest, onNavigateHome }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    'Property Sales & Liquidation',
    'Investment Advisory & Yield Analysis',
    'Project Launch & 360° Marketing',
    'Meta Ads & Lead Generation',
    'Overseas Pakistani VIP Desk',
    'Site Visits & Allotment Transfers',
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const topOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 text-[#A3A3A3] pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Wide Logo (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <XLogo className="w-10 h-10" withCircle={true} glow={false} />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-[0.22em] text-white uppercase font-heading leading-tight">
                  X MARKETING
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#FF2A2A] font-mono mt-0.5 font-medium">
                  Real Estate Company
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A3A3A3] leading-relaxed pt-2">
              Lahore&apos;s premier real estate marketing and project sales advisory. We bridge visionary developers with discerning Pakistani and overseas investors with guaranteed transparency.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E10600]/40 text-xs font-semibold text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Desk: {COMPANY.whatsappDisplay}</span>
              </a>

              {onRegisterInterest && (
                <button
                  type="button"
                  onClick={onRegisterInterest}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl red-gradient-bg text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#E10600]/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Register Interest</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-[#FF2A2A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white font-mono">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((s) => (
                <li key={s} className="hover:text-white transition-colors">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white font-mono">
              Lahore Office
            </h4>
            <div className="space-y-2.5 text-xs text-[#A3A3A3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E10600] shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E10600] shrink-0" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-white transition-colors font-mono">
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-mono"
                >
                  {COMPANY.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E10600] shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            {/* Socials */}
            <SocialLinks className="pt-4" />
          </div>

        </div>

        {/* 6) LEGAL FOOTER NOTE (small grey text) */}
        <div className="py-6 border-b border-white/5 text-[11px] text-neutral-500 leading-relaxed font-mono">
          <p>
            {COMPANY.legalNotice}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            &copy; 2026 X Marketing. All rights reserved. Registered in Lahore, Pakistan.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Agency</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-[#FF2A2A] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
