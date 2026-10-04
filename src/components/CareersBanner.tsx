import React from 'react';
import { COMPANY } from '../data/content';
import { Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const CareersBanner: React.FC = () => {
  const handleApplyWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello X Marketing Careers Desk, I am interested in applying for a sales professional / real estate advisor role with your Lahore team. Here is my background:`
    );
    window.open(`${COMPANY.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <section id="careers" className="py-16 bg-[#000000] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111]/90 border border-[#E10600]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Ambient red glow */}
          <div
            className="absolute top-0 right-1/4 w-80 h-80 bg-[#E10600]/15 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
                Join Lahore's Top Sales Team
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
              We&apos;re Hiring{' '}
              <span className="red-gradient-text">Sales Professionals</span>
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#A3A3A3] leading-relaxed">
              Are you an ambitious real estate consultant or business development executive looking to close marquee commercial and residential projects with unmatched commission structures? Let&apos;s talk.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#A3A3A3]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
                Direct Developer Mandates
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
                High Commission Splits
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
                In-House Digital Lead Generation
              </span>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleApplyWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#E10600]/30 hover:shadow-2xl hover:shadow-[#E10600]/50 cursor-pointer transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Apply on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
