import React from 'react';
import { WHY_CHOOSE_US } from '../data/content';
import { ShieldCheck, FileCheck, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onScheduleCall: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onScheduleCall }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#FF2A2A]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#FF2A2A]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#FF2A2A]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#FF2A2A]" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#000000] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/35 mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF2A2A] uppercase font-mono">
              The X Marketing Difference
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Why Choose{' '}
            <span className="red-gradient-text">X Marketing</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            In a noisy property market, we bring institutional due diligence, transparent execution, and dedicated investor support to every transaction.
          </p>
        </div>

        {/* 3 Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden bg-[#111111]/85 border border-white/10"
            >
              {/* Subtle red glow behind card on hover */}
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-[#E10600]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF2A2A]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading group-hover:text-[#FF2A2A] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 relative z-10 flex items-center justify-between text-xs text-[#FF2A2A] font-medium">
                <span>{item.tag}</span>
                <span className="w-2 h-2 rounded-full bg-[#E10600]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onScheduleCall}
            className="inline-flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-[#FF2A2A] transition-colors cursor-pointer group"
          >
            <span>Have specific investment questions? Speak with our Lahore advisory team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E10600]" />
          </button>
        </div>
      </div>
    </section>
  );
};
