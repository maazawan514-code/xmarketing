import React from 'react';

interface SectionProps {
  id?: string;
  theme?: 'dark' | 'cream';
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  theme = 'dark',
  className = '',
  containerClassName = '',
  children,
}) => {
  const isDark = theme === 'dark';

  return (
    <section
      id={id}
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-500 ${
        isDark
          ? 'bg-[#3b2c06] text-[#e8ded1] border-t border-[#b8955a]/15'
          : 'bg-[#f5efe3] text-[#2d2417] border-t border-[#b8955a]/20'
      } ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};
