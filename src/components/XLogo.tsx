import React, { useState } from 'react';
import { useLogo } from '../context/LogoContext';

interface XLogoProps {
  className?: string;
  glow?: boolean;
  withCircle?: boolean;
  variant?: 'icon' | 'badge' | 'wide';
  src?: string;
  clickable?: boolean;
}

export const XLogo: React.FC<XLogoProps> = ({
  className = 'w-9 h-9',
  glow = false,
  withCircle = true,
  src,
  clickable = true,
}) => {
  const { logoUrl, openModal } = useLogo();
  const [imageError, setImageError] = useState(false);

  // Active custom image source if provided
  const activeImageSrc = src !== undefined ? src : logoUrl;
  const showCustomImage = Boolean(activeImageSrc && !imageError);

  const handleClick = () => {
    if (clickable) {
      openModal();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      {glow && (
        <div
          className="absolute inset-0 bg-[#E10600] blur-xl opacity-45 rounded-full scale-125 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {showCustomImage ? (
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
            src={activeImageSrc}
            alt="X Marketing Logo"
            className="w-full h-full object-contain p-0.5"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
          style={{
            filter: glow
              ? 'drop-shadow(0 0 16px rgba(251, 0, 1, 0.75)) drop-shadow(0 0 30px rgba(225, 6, 0, 0.5))'
              : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))',
          }}
        >
          <defs>
            <linearGradient id="xLogoRedGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2A2A" />
              <stop offset="50%" stopColor="#E10600" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
            <linearGradient id="xLogoRedGradB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="50%" stopColor="#E10600" />
              <stop offset="100%" stopColor="#700000" />
            </linearGradient>
            <radialGradient id="badgeDarkBgComp" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#050505" />
              <stop offset="95%" stopColor="#120303" />
              <stop offset="100%" stopColor="#260404" />
            </radialGradient>
          </defs>

          {/* Round black circular medallion */}
          {withCircle && (
            <>
              <circle
                cx="250"
                cy="250"
                r="236"
                fill="url(#badgeDarkBgComp)"
                stroke="#E10600"
                strokeOpacity="0.3"
                strokeWidth="4"
              />
              <circle
                cx="250"
                cy="250"
                r="226"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.06"
                strokeWidth="1.5"
              />
            </>
          )}

          {/* Clean Modern Geometric X */}
          <g>
            <path
              d="M 125 105 L 185 105 L 375 395 L 315 395 Z"
              fill="url(#xLogoRedGradA)"
            />
            <path
              d="M 375 105 L 315 105 L 265 182 L 295 228 L 375 105 Z"
              fill="url(#xLogoRedGradB)"
            />
            <path
              d="M 235 272 L 205 318 L 125 395 L 185 395 L 250 295 Z"
              fill="url(#xLogoRedGradB)"
            />
            <polygon
              points="250,225 275,250 250,275 225,250"
              fill="#FF4D4D"
              opacity="0.9"
            />
          </g>
        </svg>
      )}
    </div>
  );
};
