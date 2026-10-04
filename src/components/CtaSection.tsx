import React from 'react';
import { COMPANY } from '../data/content';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface CtaSectionProps {
  onRegisterInterest: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onRegisterInterest }) => {
  const handleWhatsAppUs = () => {
    const text = encodeURIComponent(
      `Hello X Marketing, I would like to explore available high-return investment opportunities in Lahore.`
    );
    window.open(`${COMPANY.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Background red glow circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#E10600]/15 blur-[130px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#FF2A2A]" />
          <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
            Guaranteed Direct Allotment
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-3xl mx-auto">
          Ready to Invest in the{' '}
          <span className="red-gradient-text">Right Project?</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#A3A3A3] max-w-2xl mx-auto leading-relaxed">
          Skip misleading market agents and secure pre-screened commercial outlets or residential suites in Lahore with official developer contracts.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRegisterInterest}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#E10600]/30 hover:shadow-2xl hover:shadow-[#E10600]/50 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Register Interest</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppUs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm uppercase tracking-wider border border-white/15 hover:border-[#E10600] transition-all duration-200 backdrop-blur-md cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Us</span>
            <span className="text-xs text-[#FF2A2A] font-mono">(Direct)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
