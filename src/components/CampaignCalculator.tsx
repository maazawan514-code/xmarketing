import React, { useState, useId } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Users } from 'lucide-react';

interface CampaignCalculatorProps {
  onOpenWithEstimate: (details: { valuation: number; type: string; leads: number }) => void;
}

export const CampaignCalculator: React.FC<CampaignCalculatorProps> = ({ onOpenWithEstimate }) => {
  const valuationId = useId();
  const timelineId = useId();
  const [valuation, setValuation] = useState<number>(25); // In millions USD
  const [assetType, setAssetType] = useState<string>('penthouse');
  const [timeline, setTimeline] = useState<number>(90); // In days

  const estimatedMarketingBudget = Math.round(valuation * 1000000 * 0.012);
  const estimatedQualifiedLeads = Math.round(valuation * 7.5 + (180 - timeline) * 0.5);
  const estimatedPrivateTours = Math.round(estimatedQualifiedLeads * 0.22);
  const projectedDaysSaved = Math.round(timeline * 0.38);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 bg-[#000000] border-t border-neutral-900 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#FF0000] mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>Interactive Campaign Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
            Forecast Your Campaign Velocity.
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base leading-relaxed">
            Estimate the media capital, qualified buyer pipeline, and time-to-close metrics required for your listing portfolio.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-[#FF0000]/10 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Asset Type Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  1. Select Property Class
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'penthouse', label: 'Trophy Penthouse' },
                    { id: 'estate', label: 'Private Villa / Estate' },
                    { id: 'tower', label: 'Multi-Unit Tower' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAssetType(t.id)}
                      className={`py-3 px-3 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                        assetType === t.id
                          ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-sm shadow-[#FF0000]/30'
                          : 'bg-[#121216] text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valuation Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={valuationId} className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    2. Listing / Portfolio Valuation
                  </label>
                  <span className="text-lg font-bold text-white font-mono">
                    ${valuation}M USD
                  </span>
                </div>
                <input
                  id={valuationId}
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={valuation}
                  aria-label="Listing or portfolio valuation in millions of US dollars"
                  onChange={(e) => setValuation(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF0000]"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                  <span>$5M</span>
                  <span>$50M</span>
                  <span>$100M+</span>
                </div>
              </div>

              {/* Target Horizon Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={timelineId} className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    3. Target Close Window
                  </label>
                  <span className="text-lg font-bold text-white font-mono">
                    {timeline} Days
                  </span>
                </div>
                <input
                  id={timelineId}
                  type="range"
                  min="30"
                  max="180"
                  step="15"
                  value={timeline}
                  aria-label="Target close window in days"
                  onChange={(e) => setTimeline(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF0000]"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                  <span>30 Days (Sprint)</span>
                  <span>90 Days (Standard)</span>
                  <span>180 Days</span>
                </div>
              </div>
            </div>

            {/* Projected Outputs Card */}
            <div className="lg:col-span-5 bg-[#050507] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#FF0000] uppercase tracking-wider block font-bold">
                  Target Projections
                </span>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-neutral-400">Recommended Media Capital</div>
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                      {formatCurrency(estimatedMarketingBudget)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800">
                    <div>
                      <div className="text-[11px] text-neutral-400">Verified Buyer Inquiries</div>
                      <div className="text-xl font-bold text-[#FF0000] font-mono tabular-nums">
                        ~{estimatedQualifiedLeads}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400">Private VVIP Showings</div>
                      <div className="text-xl font-bold text-white font-mono tabular-nums">
                        ~{estimatedPrivateTours}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800">
                    <div className="text-[11px] text-neutral-400">Accelerated Velocity vs MLS</div>
                    <div className="text-sm font-semibold text-neutral-200 mt-0.5">
                      Save approx. <span className="text-[#FF0000] font-mono font-bold">~{projectDaysSaved(projectedDaysSaved)}</span> on market
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenWithEstimate({ valuation, type: assetType, leads: estimatedQualifiedLeads })}
                className="w-full py-3.5 px-4 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#FF0000]/30 cursor-pointer"
              >
                <span>Deploy This Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function projectDaysSaved(days: number) {
  return `${days} days`;
}
