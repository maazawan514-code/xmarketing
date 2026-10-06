import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating Button in Official WhatsApp Green */}
      <a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp conversation with X Marketing"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] transform hover:scale-110 active:scale-95 transition-all duration-200 group relative"
      >
        {/* Pulsing ring around button */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-75 animate-ping pointer-events-none" />
        <FaWhatsapp className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
};
