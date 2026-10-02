import React from 'react';
import { HOW_WE_WORK } from '../data/content';
import { MessageSquareText, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowWeWorkProps {
  onStartBooking: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onStartBooking }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageSquareText className="w-6 h-6 text-[#FF2A2A]" />;
      case 1:
        return <Compass className="w-6 h-6 text-[#FF2A2A]" />;
      case 2:
        return <CheckCircle2 className="w-6 h-6 text-[#FF2A2A]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#FF2A2A]" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF2A2A] uppercase font-mono">
              Clear & Transparent Roadmap
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            How We <span className="red-gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            A frictionless, investor-first journey designed to eliminate confusion and protect your capital from initial consultation to final possession.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connector Line on Desktop */}
          <div
            className="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-[#E10600]/20 via-[#FF2A2A]/40 to-[#E10600]/20 -translate-y-12 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {HOW_WE_WORK.map((item, index) => (
              <div
                key={item.step}
                className="glass-card rounded-2xl p-8 flex flex-col justify-between group hover:-translate-y-1 relative bg-[#111111]/85 border border-white/10"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono red-gradient-text">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center shadow-md group-hover:border-[#E10600]/50 transition-colors">
                      {getStepIcon(index)}
                    </div>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FF2A2A] font-mono block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading group-hover:text-[#FF2A2A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span>Phase {item.step} Protocol</span>
                  <span className="text-[#FF2A2A] font-mono font-medium">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartBooking}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#E10600]/50 transition-all cursor-pointer"
          >
            <span>Start Your Investment Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
