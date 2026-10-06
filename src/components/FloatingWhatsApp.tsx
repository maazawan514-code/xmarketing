import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-3 z-50 flex items-center gap-3 md:bottom-6 md:right-6">
      {/* Floating Button in Official WhatsApp Green */}
      <a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp conversation with X Marketing"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-200 group hover:scale-110 hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] active:scale-95 md:h-14 md:w-14"
      >
        {/* Pulsing ring around button */}
        <span className="pointer-events-none absolute inset-0 hidden animate-ping rounded-full border-2 border-[#25D366] opacity-75 md:block" />
        <FaWhatsapp className="relative z-10 h-5 w-5 md:h-7 md:w-7" />
      </a>
    </div>
  );
};
