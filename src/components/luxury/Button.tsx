import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid-gold' | 'outline-gold' | 'outline-light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid-gold',
  size = 'md',
  className = '',
  children,
  icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans tracking-[0.2em] uppercase font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-[10px] px-4 py-2 rounded-sm gap-1.5',
    md: 'text-[11px] sm:text-xs px-6 py-3.5 rounded-sm gap-2',
    lg: 'text-xs sm:text-sm px-8 py-4 rounded-sm gap-2.5',
  };

  const variantStyles = {
    'solid-gold':
      'bg-[#b8955a] text-[#231a04] hover:bg-[#d4b57e] shadow-lg shadow-[#b8955a]/20 hover:shadow-[#b8955a]/35 transform hover:-translate-y-0.5 border border-[#b8955a]',
    'outline-gold':
      'bg-transparent text-[#b8955a] border border-[#b8955a] hover:bg-[#b8955a] hover:text-[#231a04] shadow-sm transform hover:-translate-y-0.5',
    'outline-light':
      'bg-transparent text-[#f5efe3] border border-white/20 hover:border-[#b8955a] hover:text-[#b8955a] backdrop-blur-sm transform hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-[#b8955a] hover:text-[#d4b57e] hover:underline underline-offset-8',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
