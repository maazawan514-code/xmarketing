import React from 'react';
import { XLogo } from './XLogo';
import { ArrowRight, Building2, Users, CheckCircle, ShieldCheck, CreditCard, Headphones } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onRegisterInterest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onRegisterInterest }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#000000]">
      {/* Background Subtle Red Grids & Ambient Red Spotlight */}
      <div className="absolute inset-0 bg-grid-red opacity-45 pointer-events-none" />
      
      {/* Spotlight beam with subtle red glow descending from top-right to center */}
      <div
        className="absolute top-0 right-0 w-full lg:w-3/4 h-full pointer-events-none opacity-90"
        style={{
          background: 'radial-gradient(ellipse 65% 60% at 72% 28%, rgba(225, 6, 0, 0.16) 0%, rgba(139, 0, 0, 0.12) 35%, rgba(0, 0, 0, 0.96) 75%, #000000 100%)',
        }}
        aria-hidden="true"
      />

      {/* Red ambient glows */}
      <div
        className="absolute top-1/4 right-[5%] w-[480px] h-[480px] bg-[#E10600]/15 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-[5%] w-[380px] h-[380px] bg-[#E10600]/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Badge: TRUSTED - TRANSPARENT - RESULTS */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/40 backdrop-blur-md mb-6 shadow-sm">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#FF2A2A] uppercase font-mono">
                TRUSTED · TRANSPARENT · RESULTS
              </span>
            </div>

            {/* Headline: Real Estate Marketing That Sells */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white tracking-tight leading-[1.08] text-balance font-heading">
              Real Estate Marketing{' '}
              <span className="red-gradient-text block sm:inline">
                That Sells
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-[#A3A3A3] font-normal leading-relaxed max-w-xl text-pretty">
              From the right project to the right investor. We turn leads into confirmed bookings.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Register Interest (Red Gradient, Filled with white text and red glow) */}
              <button
                type="button"
                onClick={onRegisterInterest}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#E10600]/35 hover:shadow-2xl hover:shadow-[#E10600]/55 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Register Interest</span>
              </button>

              {/* Explore Projects (Glass Outline) */}
              <button
                type="button"
                onClick={onExploreProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm uppercase tracking-wider border border-white/15 hover:border-[#E10600] transition-all duration-200 backdrop-blur-md cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-[#FF2A2A]" />
              </button>
            </div>

            {/* Three small chips below */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#A3A3A3]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#FF2A2A]" />
                <span className="text-neutral-200">Verified Projects</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] border border-white/10">
                <CreditCard className="w-4 h-4 text-[#FF2A2A]" />
                <span className="text-neutral-200">Easy Installments</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] border border-white/10">
                <Headphones className="w-4 h-4 text-[#FF2A2A]" />
                <span className="text-neutral-200">Dedicated Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Circular Red Orbit Graphic + Floating Glass Cards */}
          <div className="lg:col-span-5 flex items-center justify-center relative py-8 lg:py-0">
            {/* Center Aura Glow */}
            <div className="absolute w-[320px] h-[320px] bg-[#E10600]/22 rounded-full blur-[90px] pointer-events-none" />

            {/* Orbit Container */}
            <div className="relative w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] flex items-center justify-center">
              
              {/* Outer Orbit 1 */}
              <div
                className="absolute inset-0 rounded-full border border-[#E10600]/20 animate-spin-slow pointer-events-none"
                style={{ borderTopColor: '#FF2A2A', borderLeftColor: 'transparent' }}
              >
                <span className="absolute top-4 right-10 w-2 h-2 rounded-full bg-[#FF2A2A] shadow-[0_0_10px_#FF2A2A]" />
              </div>

              {/* Middle Orbit 2 */}
              <div
                className="absolute inset-8 rounded-full border border-[#E10600]/30 animate-spin-reverse-slow pointer-events-none"
                style={{ borderBottomColor: '#E10600', borderRightColor: 'transparent' }}
              >
                <span className="absolute bottom-4 left-10 w-2 h-2 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]" />
              </div>

              {/* Inner Orbit with red ring */}
              <div className="absolute inset-16 rounded-full border border-[#E10600]/40 shadow-[0_0_35px_rgba(225,6,0,0.35)] bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center">
                {/* Center Round Red-on-Black X Logo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 transform hover:scale-105 transition-transform duration-300">
                  <XLogo className="w-full h-full" glow={true} withCircle={true} />
                </div>
              </div>

              {/* Floating Glass Card 1: Projects Marketed */}
              <div className="absolute -top-4 -left-2 sm:left-0 glass-card rounded-2xl p-3.5 shadow-xl border border-white/10 flex items-center gap-3 animate-pulse" style={{ animationDuration: '4s' }}>
                <div className="w-9 h-9 rounded-xl bg-[#E10600]/20 text-[#FF2A2A] flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#A3A3A3] uppercase tracking-wider font-medium">Projects</div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono">24+ Active</div>
                </div>
              </div>

              {/* Floating Glass Card 2: Happy Investors */}
              <div className="absolute -bottom-4 -right-2 sm:right-0 glass-card rounded-2xl p-3.5 shadow-xl border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E10600]/20 text-[#FF2A2A] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#A3A3A3] uppercase tracking-wider font-medium">Investors</div>
                  <div className="text-sm sm:text-base font-bold text-[#FF2A2A] font-mono">3,850+ Closed</div>
                </div>
              </div>

              {/* Floating Glass Card 3: Confirmed Bookings */}
              <div className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 glass-card rounded-2xl p-3 shadow-xl border border-white/10 hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E10600]/20 text-[#FF2A2A] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#A3A3A3] uppercase font-medium">Bookings</div>
                  <div className="text-xs font-bold text-white font-mono">850+ Units</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
