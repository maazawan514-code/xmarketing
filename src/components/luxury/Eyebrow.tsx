import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = '',
  light = false,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase font-sans ${
        light ? 'text-[#b8955a]' : 'text-[#91713d]'
      } ${className}`}
    >
      <span className="w-4 h-[1px] bg-[#b8955a]" aria-hidden="true" />
      <span>{children}</span>
      <span className="w-4 h-[1px] bg-[#b8955a]" aria-hidden="true" />
    </div>
  );
};
