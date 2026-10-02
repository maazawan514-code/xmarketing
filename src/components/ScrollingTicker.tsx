import React from 'react';
import { TICKER_ITEMS } from '../data/content';

export const ScrollingTicker: React.FC = () => {
  // Repeat items for seamless, non-breaking infinite loop
  const duplicatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="relative w-full bg-[#050505] border-y border-[#E10600]/25 py-3.5 overflow-hidden select-none z-20 group hover-pause"
      aria-label="Key Highlights Ticker"
    >
      {/* Subtle red ambient glow overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10 w-full"
        aria-hidden="true"
      />

      <div className="flex w-max items-center animate-marquee cursor-default">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-4 shrink-0">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-neutral-200 transition-colors duration-200 group-hover:text-white font-mono">
              {item}
            </span>
            <span
              className="inline-block w-2 h-2 rounded-full bg-[#E10600] shadow-[0_0_8px_#E10600]"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
