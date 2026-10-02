import React, { useState } from 'react';
import { ArrowUpRight, Check, X, MapPin } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenGetStarted: () => void;
}

interface Project {
  id: string;
  title: string;
  category: 'penthouses' | 'estates' | 'towers';
  categoryLabel: string;
  location: string;
  valuation: string;
  headlineMetric: string;
  image: string;
  summary: string;
  metrics: { label: string; value: string }[];
  strategy: string[];
  duration: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenGetStarted }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'penthouses' | 'estates' | 'towers'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'miami-penthouse',
      title: 'The Aurelia Penthouse Collection',
      category: 'penthouses',
      categoryLabel: 'Ultra-Luxury Penthouse',
      location: 'South Beach, Miami, FL',
      valuation: '$45,000,000 Portfolio',
      headlineMetric: '100% Sold Out in 84 Days',
      image: '/src/assets/images/portfolio_miami_penthouse_1790518705507.jpg',
      summary: 'A curated triplex oceanfront penthouse requiring a discreet, global marketing sprint targeted at tech founders and Latin American family offices.',
      duration: '84 Days to Contract',
      metrics: [
        { label: 'Qualified Private Showings', value: '412 Tours' },
        { label: 'Global Video Impressions', value: '3.4M Views' },
        { label: 'Sale Price / Sq Ft', value: '$4,150 / sqft' },
        { label: 'Ad Spend ROAS', value: '6.2x Direct' },
      ],
      strategy: [
        'Geo-fenced private aviation FBO terminals across Aspen, Teterboro, and Zurich',
        'Bespoke architectural short film premiered during Art Basel Miami Beach',
        'Proof-of-funds verified digital showroom with NDA gated 3D virtual tour',
        'Direct wealth advisory outreach to top 50 UHNW family offices',
      ],
    },
    {
      id: 'london-mansion',
      title: 'One Kensington Gardens Manor',
      category: 'estates',
      categoryLabel: 'Heritage Prime Estate',
      location: 'Mayfair & Kensington, London, UK',
      valuation: '£120,000,000 Development',
      headlineMetric: '£72M Pre-Sold Ahead of Completion',
      image: '/src/assets/images/portfolio_london_mansion_1790518719175.jpg',
      summary: 'Restoration and repositioning of 24 ultra-prime heritage residences for an institutional European fund seeking Middle Eastern and Asian private capital.',
      duration: '6 Months Campaign',
      metrics: [
        { label: 'Off-Market Inquiries', value: '184 Verified' },
        { label: 'Avg Contract Time', value: '28 Days' },
        { label: 'Financial Times Reach', value: '920k UHNW' },
        { label: 'Price vs Benchmark', value: '+18% Premium' },
      ],
      strategy: [
        'Curated coffee table collector book sent to prime private bank client lists',
        'Exclusive launch salon held at the Royal Academy of Arts for private collectors',
        'Multilingual digital twin portal translated in Arabic, Mandarin, and French',
        'Targeted programmatic media on Bloomberg and Robb Report UK',
      ],
    },
    {
      id: 'manhattan-tower',
      title: 'Skyline Horizon Tower Residences',
      category: 'towers',
      categoryLabel: 'Architectural Skyscraper',
      location: "Billionaires' Row, Manhattan, NY",
      valuation: '$85,000,000 Trophy Floor',
      headlineMetric: '$28M Week-One Contract Signed',
      image: '/src/assets/images/portfolio_manhattan_tower_1790518732122.jpg',
      summary: 'Double-height glass duplex penthouse high above Central Park, marketed through cinematic twilight drone production and Wall Street executive placements.',
      duration: '45 Days Execution',
      metrics: [
        { label: 'Private Helicopter Tours', value: '32 VVIPs' },
        { label: 'Editorial Features', value: '14 Publications' },
        { label: 'Lead Verification Rate', value: '96.4%' },
        { label: 'Buyer Origin', value: 'Hedge Fund Principal' },
      ],
      strategy: [
        'Custom interactive twilight 360° horizon skyline simulation',
        'Direct LinkedIn & Executive network targeting across NYC finance leadership',
        'Architectural photography feature in Architectural Digest & Wall Street Journal',
        'VIP concierge preview dinners hosted by a Michelin-starred chef inside the residence',
      ],
    },
    {
      id: 'beverly-hills-villa',
      title: 'Villa Bellisima Bel Air Estate',
      category: 'estates',
      categoryLabel: 'Modernist Trophy Villa',
      location: 'Bel Air & Beverly Hills, CA',
      valuation: '$28,500,000 Private Estate',
      headlineMetric: 'Record-Setting Neighborhood Close',
      image: '/src/assets/images/portfolio_beverly_hills_villa_1790518743834.jpg',
      summary: 'Architectural cantilever masterpiece designed by a Pritzker-winning architect, sold to an international technology entrepreneur via hyper-targeted creative video.',
      duration: '60 Days on Market',
      metrics: [
        { label: 'Social Engagement', value: '1.8M Engagements' },
        { label: 'Offers Received', value: '3 Competing' },
        { label: 'Close-to-List Ratio', value: '98.5%' },
        { label: 'Days on Market', value: '60 Days' },
      ],
      strategy: [
        'Cinematic lifestyle production highlighting wellness pavilion and collector auto gallery',
        'Silicon Valley founder network geo-retargeting in Palo Alto and Menlo Park',
        'Targeted digital PR campaign across high-design architecture journals',
        'Autonomous lead verification system connected directly to listing agent mobile phone',
      ],
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#050507] border-t border-neutral-900 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#FF0000] mb-3">
              <span>Selected Portfolio</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">Proven Acquisition Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
              Strategic Campaigns. Proven Outcomes.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
            A selection of recent marketing initiatives engineered for sovereign developers, trophy estates, and high-velocity residential towers.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            All Projects (4)
          </button>
          <button
            onClick={() => setActiveFilter('penthouses')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeFilter === 'penthouses'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            Penthouses
          </button>
          <button
            onClick={() => setActiveFilter('estates')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeFilter === 'estates'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            Luxury Estates
          </button>
          <button
            onClick={() => setActiveFilter('towers')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeFilter === 'towers'
                ? 'bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30'
                : 'bg-[#101013] text-neutral-400 hover:text-white hover:bg-[#18181c]'
            }`}
          >
            Commercial & Towers
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0b0b0e] border border-neutral-800 rounded-xl overflow-hidden group hover:border-[#FF0000]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-transparent to-black/40 pointer-events-none" />

                  {/* Top Location / Valuation Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/95">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-black/75 backdrop-blur-md rounded border border-white/10">
                      <MapPin className="w-3 h-3 text-[#FF0000]" />
                      <span>{project.location}</span>
                    </span>
                    <span className="px-3 py-1 bg-black/75 backdrop-blur-md rounded border border-white/10 font-mono font-medium">
                      {project.valuation}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#FF0000] font-semibold">{project.headlineMetric}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading group-hover:text-neutral-100 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Quantitative proof metrics */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-800/80">
                    <div>
                      <div className="text-lg font-bold text-white tabular-nums font-mono">
                        {project.metrics[0].value}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {project.metrics[0].label}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#FF0000] tabular-nums font-mono">
                        {project.metrics[3].value}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {project.metrics[3].label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3.5 px-4 rounded-lg bg-[#111114] hover:bg-[#FF0000] text-neutral-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-800 hover:border-[#FF0000] shadow-sm hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] cursor-pointer"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 hover:bg-[#FF0000] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-neutral-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-wider text-[#FF0000] font-semibold">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-neutral-300 text-xs mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF0000]" />
                  <span>{selectedProject.location}</span>
                  <span className="mx-2">·</span>
                  <span className="text-white font-mono">{selectedProject.valuation}</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold mb-2">
                  Campaign Overview & Mandate
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedProject.summary}
                </p>
              </div>

              {/* Metrics Grid */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                  Verified Campaign Performance
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedProject.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-[#050507] border border-neutral-800 rounded-lg p-3">
                      <div className="text-lg font-bold text-white font-mono">
                        {metric.value}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Playbook Deployed */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                  Tactical Channels Executed
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.strategy.map((tactic, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-[#FF0000]/20 text-[#FF0000] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{tactic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Ready to deploy a similar acquisition pipeline for your property?
                </span>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenGetStarted();
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#FF0000]/30 cursor-pointer"
                >
                  Schedule Strategy Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
