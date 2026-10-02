import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Share2 } from 'lucide-react';

interface BrowserFrameProps {
  children: React.ReactNode;
  isMockupActive?: boolean;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  isMockupActive = true,
}) => {
  if (!isMockupActive) {
    return (
      <div className="min-h-screen bg-[#000000] text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] p-2 md:p-6 lg:p-8 flex flex-col items-center justify-start transition-colors">
      {/* Browser Window Mockup matching reference screenshot */}
      <div className="w-full max-w-[1440px] rounded-xl overflow-hidden border border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.95)] bg-[#000000] flex flex-col">
        {/* Browser Top Navigation Bar */}
        <div className="h-11 bg-[#161618] border-b border-neutral-800/80 px-4 flex items-center justify-between select-none">
          {/* Traffic Lights (Window Controls) */}
          <div className="flex items-center gap-2 w-20">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm" />
          </div>

          {/* Browser Navigation Arrows & Reload */}
          <div className="hidden sm:flex items-center gap-3 text-neutral-400 pl-2">
            <button className="hover:text-white transition-colors cursor-pointer" title="Back">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-white transition-colors opacity-40 cursor-default" title="Forward">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-white transition-colors ml-1 cursor-pointer" title="Reload">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Address Bar - exactly matching 'xmarketing.com' */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="h-7 bg-[#232326] hover:bg-[#28282c] transition-colors rounded-md px-3 flex items-center justify-center text-xs text-neutral-300 font-normal tracking-wide border border-neutral-700/40">
              <Lock className="w-3 h-3 text-[#FF0000] mr-2 shrink-0" />
              <span className="truncate">xmarketing.com</span>
            </div>
          </div>

          {/* Action icon */}
          <div className="w-20 flex justify-end">
            <button className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer" title="Share">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Website Content Inside Browser Frame */}
        <div className="relative overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
