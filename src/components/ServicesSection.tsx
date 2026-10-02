import React, { useState } from 'react';
import { Camera, Sparkles, LineChart, KeyRound, ArrowRight, Layers, Film, CheckCircle } from 'lucide-react';

interface ServicesSectionProps {
  onOpenGetStarted: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenGetStarted }) => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      num: '01',
      title: 'Luxury Architectural Branding & Creative Direction',
      shortDesc: 'Bespoke identity systems that elevate properties into coveted generational landmarks.',
      fullDesc: 'We craft comprehensive visual and verbal brand universes for single trophy estates and premier multi-unit towers. From custom typography and foil-stamped presentation books to physical sales gallery signage.',
      deliverables: [
        'Property Naming & Comprehensive Brand Guidelines',
        'Physical Sales Gallery Curation & Foil-Stamped Books',
        'Photorealistic 3D CGI Visualizations & Architectural Art Direction',
        'VIP Buyer Gift Packaging & Keyholder Keepsakes',
      ],
      kpi: '3.4x higher recall among prospective family office buyers',
    },
    {
      num: '02',
      title: 'Ultra-High-Net-Worth (UHNW) Digital Acquisition',
      shortDesc: 'Discreet, algorithmic media campaigns targeting accredited investors and luxury buyers.',
      fullDesc: 'We bypass the noise with private wealth media buys across Bloomberg Terminal networks, Financial Times, luxury lifestyle publications, and precision geo-fenced private airports and executive golf communities.',
      deliverables: [
        'Geo-fenced Private Airport & Yacht Harbor Retargeting',
        'High-Net-Worth Paid Search & Programmatic Display Networks',
        'Custom Audience Seeding via Family Office & Executive Data',
        'Real-time Ad Fraud Elimination & Verification Protocol',
      ],
      kpi: '$42M in direct contract volume attributed to digital channels',
    },
    {
      num: '03',
      title: 'Cinematic Media, 3D Digital Twins & Drone Production',
      shortDesc: 'Hollywood-caliber architectural cinematography and interactive spatial walkthroughs.',
      fullDesc: 'Our in-house cinema team shoots cinema-grade 4K aerial drone sequences, twilight architectural footage, and Matterport/Unreal Engine 3D interactive walkthroughs that allow international buyers to tour remotely.',
      deliverables: [
        'FAA Part 107 Twilight Drone Cinematography',
        'Hollywood Director-Led Architectural Short Films',
        'Interactive 3D Digital Twin & VR Virtual Tours',
        'Bespoke Social Short-Form Cuts for Instagram & LinkedIn',
      ],
      kpi: '48% of overseas buyers placed deposits prior to physical visits',
    },
    {
      num: '04',
      title: 'High-Conversion Property Landers & Buyer Verification',
      shortDesc: 'Proprietary digital showrooms engineered to convert curious scrollers into private showings.',
      fullDesc: 'Custom lightning-fast digital properties built with zero clutter, high-resolution media caching, and integrated proof-of-funds verification gating for confidential multimillion-dollar estates.',
      deliverables: [
        'Ultra-Fast Responsive Digital Twin Web Experience',
        'Discreet Proof-of-Funds Gate & NDA Signing Flow',
        'Automated VIP Concierge Tour Scheduling',
        'Direct Integration with Salesforce, HubSpot & Follow Up Boss',
      ],
      kpi: '22% inquiry-to-private tour conversion rate',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#000000] border-t border-neutral-900 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#FF0000] mb-3">
              <span>Full-Stack Capabilities</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">End-to-End Real Estate Marketing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
              Our Core Services.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
            Every service is calibrated to attract, qualify, and secure qualified private buyers for top-tier residential and commercial properties.
          </p>
        </div>

        {/* 2-Column Interactive Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Selector List */}
          <div className="lg:col-span-6 space-y-4">
            {services.map((service, index) => {
              const isSelected = selectedService === index;
              return (
                <div
                  key={service.num}
                  onClick={() => setSelectedService(index)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0d0d10] border-[#FF0000] shadow-lg shadow-[#FF0000]/15'
                      : 'bg-[#060608] border-neutral-800/80 hover:border-neutral-700 hover:bg-[#0a0a0c]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-mono font-bold ${
                          isSelected ? 'text-[#FF0000]' : 'text-neutral-500'
                        }`}
                      >
                        {service.num}
                      </span>
                      <h3
                        className={`text-lg sm:text-xl font-bold font-heading transition-colors ${
                          isSelected ? 'text-white' : 'text-neutral-300'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isSelected
                          ? 'text-[#FF0000] translate-x-1'
                          : 'text-neutral-600'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 pl-8 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Service Detailed Preview Panel */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="bg-[#0b0b0e] border border-neutral-800 rounded-xl p-8 sm:p-10 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000]/10 rounded-full blur-[80px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                  <span className="text-xs font-mono font-bold text-[#FF0000] tracking-widest uppercase">
                    Service Scope & Deliverables
                  </span>
                  <span className="text-2xl font-bold text-neutral-600 font-mono">
                    {services[selectedService].num}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white mt-6 mb-4 font-heading">
                  {services[selectedService].title}
                </h4>

                <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                  {services[selectedService].fullDesc}
                </p>

                <div className="space-y-4 mb-8">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                    Key Execution Deliverables
                  </span>
                  {services[selectedService].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-[#050507] border border-neutral-800/80 mb-8">
                  <span className="text-[11px] text-[#FF0000] uppercase tracking-widest block font-medium">
                    Verified Benchmark Impact
                  </span>
                  <span className="text-sm font-semibold text-white mt-1 block">
                    {services[selectedService].kpi}
                  </span>
                </div>

                <button
                  onClick={onOpenGetStarted}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#FF0000]/25 cursor-pointer"
                >
                  <span>Inquire for Your Asset</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
