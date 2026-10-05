import React, { useState } from 'react';
import { ShieldCheck, Compass, Target, ArrowUpRight, Award, Landmark, Check } from 'lucide-react';

interface AboutSectionProps {
  onOpenGetStarted: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenGetStarted }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'methodology' | 'reach'>('philosophy');

  const pillars = [
    {
      index: '01',
      title: 'Architectural Narrative & Legacy Branding',
      desc: 'We position ultra-luxury real estate developments not merely as physical properties, but as rare cultural assets with a distinctive identity.',
      stat: '3D',
      statLabel: 'Architectural Visualizations',
    },
    {
      index: '02',
      title: 'Direct UHNW Capital Targeting',
      desc: 'Precision omni-channel acquisition reaching accredited family offices, institutional investors, and sovereign wealth buyers through discreet private channels.',
      stat: '94%',
      statLabel: 'Pre-Qualified Inquiries',
    },
    {
      index: '03',
      title: 'Accelerated Sell-Out Velocity',
      desc: 'Algorithmic demand funnels and automated buyer verification pipelines that compress sales cycles from typical 18-month drags to under 90 days.',
      stat: '-42%',
      statLabel: 'Reduced Days on Market',
    },
  ];

  const globalMarkets = [
    { city: 'New York', focus: 'Billionaires Row & Tribeca Penthouses' },
    { city: 'Miami', focus: 'Boutique Waterfront Towers & Star Island' },
    { city: 'London', focus: 'Mayfair & Belgravia Prime Estates' },
    { city: 'Dubai', focus: 'Palm Jumeirah & Downtown Sky Mansions' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#050507] border-t border-neutral-900 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#FF0000] mb-3">
              <span>Agency Profile</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">Institutional Real Estate Strategy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
              Where Architecture Meets High-Velocity Capital.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
            Founded to bridge high-aesthetic architectural storytelling with ruthless performance marketing for developers, family offices, and elite brokerages.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer ${
              activeTab === 'philosophy'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            Core Pillars
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer ${
              activeTab === 'methodology'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            The X Execution Model
          </button>
          <button
            onClick={() => setActiveTab('reach')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer ${
              activeTab === 'reach'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            Global Market Footprint
          </button>
        </div>

        {/* Dynamic Tab Contents */}
        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-[#0b0b0e] border border-neutral-800/80 rounded-xl p-8 flex flex-col justify-between hover:border-[#FF0000]/40 transition-colors group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF0000]/10 transition-colors"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#FF0000] tracking-widest">
                      {pillar.index}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-[#FF0000] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800/60 relative z-10">
                  <div className="text-3xl font-extrabold text-white tabular-nums tracking-tight font-heading group-hover:text-[#FF0000] transition-colors">
                    {pillar.stat}
                  </div>
                  <div className="text-xs text-neutral-400 font-medium mt-1">
                    {pillar.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'methodology' && (
          <div className="bg-[#0b0b0e] border border-neutral-800 rounded-xl p-8 lg:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold">
                  Proprietary Growth Engine
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4 font-heading">
                  Engineered to Eliminate Underperforming Ad Waste
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  Traditional agencies rely on generic real estate portals where your multimillion-dollar listing is buried beneath secondary units. We engineer bespoke, private digital acquisition ecosystems designed solely for your asset.
                </p>
                <div className="space-y-3">
                  {[
                    'Hyper-targeted geo-fencing of private aviation terminals, superyacht marinas, and golf clubs',
                    'Custom multi-language landing assets for Swiss, Emirati, and North American capital',
                    'Direct CRM integration with automatic verified buyer qualification scores',
                    'Bi-weekly attribution dashboard tracking lead quality and broker tour bookings',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FF0000]/15 text-[#FF0000] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#050507] border border-neutral-800 rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-sm font-semibold text-white">Campaign Funnel Diagnostics</span>
                  <span className="text-xs text-[#FF0000] font-mono">Live Benchmarks</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Buyer Intent Targeting Precision</span>
                      <span className="font-mono text-[#FF0000]">98.2%</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF0000] h-full rounded-full w-[98%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Private Showing Conversion Rate</span>
                      <span className="font-mono text-[#FF0000]">18.4%</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF0000] h-full rounded-full w-[72%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Client Capital ROI Multiplier</span>
                      <span className="font-mono text-white">4.8x</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-white h-full rounded-full w-[84%]" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={onOpenGetStarted}
                  className="w-full py-3 bg-[#FF0000] hover:bg-[#E60000] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md shadow-[#FF0000]/30 cursor-pointer"
                >
                  Request Confidential Deck
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reach' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalMarkets.map((market) => (
              <div
                key={market.city}
                className="bg-[#0b0b0e] border border-neutral-800 rounded-xl p-6 hover:border-[#FF0000]/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-white font-heading">{market.city}</h4>
                  <span className="text-xs font-mono text-[#FF0000] bg-[#FF0000]/10 px-2 py-0.5 rounded border border-[#FF0000]/20">
                    Active
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {market.focus}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
