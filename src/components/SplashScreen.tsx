import React, { useState, useEffect } from 'react';
import { XLogo } from './XLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fullTagline = 'REAL ESTATE · SALES · GROWTH';

  // Progress counter from 0 to 100% across ~2.6 seconds
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2600; // 2.6s

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Typing effect for the tagline
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTagline.length) {
        setTypingText(fullTagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle red grid background */}
      <div className="absolute inset-0 bg-grid-red opacity-50 pointer-events-none" />

      {/* Radial red background glow */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full bg-[#E10600]/15 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating red particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#FF2A2A] opacity-40"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 95}%`,
              animation: `float-particle ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Centered Red-on-Black X Emblem with 3 Rotating Orbit Rings */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Orbit Ring 1 */}
        <div
          className="absolute w-52 h-52 md:w-60 md:h-60 rounded-full border border-[#E10600]/25 animate-spin-slow pointer-events-none"
          style={{ borderTopColor: '#FF2A2A', borderRightColor: 'transparent' }}
        >
          <span className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-[#FF2A2A] shadow-[0_0_8px_#FF2A2A]" />
        </div>

        {/* Middle Orbit Ring 2 */}
        <div
          className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border border-[#E10600]/35 animate-spin-reverse-slow pointer-events-none"
          style={{ borderBottomColor: '#E10600', borderLeftColor: 'transparent' }}
        >
          <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-[#E10600] shadow-[0_0_8px_#E10600]" />
        </div>

        {/* Inner Thin Circle Ring with Red Glow */}
        <div className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border border-[#E10600]/50 shadow-[0_0_30px_rgba(225,6,0,0.45)] pointer-events-none" />

        {/* Centered Attached Red-on-Black Round Logo */}
        <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 transform hover:scale-105 transition-transform">
          <XLogo className="w-full h-full" glow={true} withCircle={true} />
        </div>
      </div>

      {/* Brand Name: Wide "X MARKETING" in wide letter-spacing with glow */}
      <div className="flex flex-col items-center mb-3">
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.38em] text-white uppercase pl-[0.38em] text-center drop-shadow-[0_2px_16px_rgba(225,6,0,0.6)] font-heading">
          X MARKETING
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#A3A3A3] mt-1 font-mono">
          Real Estate Marketing & Sales · Lahore
        </span>
      </div>

      {/* Typing Tagline: REAL ESTATE - SALES - GROWTH */}
      <div className="h-6 flex items-center justify-center mb-10">
        <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-[#FF2A2A] uppercase font-mono">
          {typingText}
        </span>
        <span className="inline-block w-1.5 h-4 bg-[#E10600] ml-1.5 animate-pulse" />
      </div>

      {/* Thin Red Progress Bar & Percentage Counter */}
      <div className="w-64 sm:w-72 max-w-[85vw] flex flex-col items-center gap-2">
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full red-gradient-bg rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_#E10600]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full text-[11px] font-mono text-[#A3A3A3] mt-1">
          <span className="text-neutral-500 uppercase tracking-widest text-[10px]">
            Lahore, Pakistan
          </span>
          <span className="text-[#FF2A2A] font-bold tabular-nums">
            {progress}%
          </span>
        </div>
      </div>

      {/* Quick Skip button */}
      <button
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 300);
        }}
        className="mt-8 text-[11px] text-neutral-500 hover:text-[#FF2A2A] uppercase tracking-widest transition-colors cursor-pointer"
      >
        Skip Intro →
      </button>
    </div>
  );
};
