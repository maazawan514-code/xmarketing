import React from 'react';

interface XLogoProps {
  className?: string;
  glow?: boolean;
  withCircle?: boolean;
  variant?: 'icon' | 'badge' | 'wide';
}

export const XLogo: React.FC<XLogoProps> = ({
  className = 'w-9 h-9',
  glow = false,
  withCircle = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      {glow && (
        <div
          className="absolute inset-0 bg-[#E10600] blur-xl opacity-45 rounded-full scale-125 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div
        className={`relative z-10 w-full h-full flex items-center justify-center overflow-hidden ${
          withCircle ? 'rounded-full bg-black border border-[#1A1A1A]' : ''
        }`}
        style={{
          filter: glow
            ? 'drop-shadow(0 0 16px rgba(251, 0, 1, 0.75)) drop-shadow(0 0 30px rgba(225, 6, 0, 0.5))'
            : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))',
        }}
      >
        <img
          src="/logo.png"
          alt="X Marketing Logo"
          className="w-full h-full object-contain p-0.5"
        />
      </div>
    </div>
  );
};
