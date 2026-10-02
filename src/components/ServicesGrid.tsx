import React from 'react';
import { SERVICES } from '../data/content';
import {
  Building,
  TrendingUp,
  Megaphone,
  Target,
  Globe,
  Compass,
  FileText,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#FF2A2A]' };
    switch (iconName) {
      case 'Building':
        return <Building {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Megaphone':
        return <Megaphone {...props} />;
      case 'Target':
        return <Target {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'LifeBuoy':
        return <LifeBuoy {...props} />;
      default:
        return <Building {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF2A2A] uppercase font-mono">
              360° Real Estate Solutions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Our Premium <span className="red-gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            From algorithmic developer lead generation to dedicated overseas Pakistani investment care, we cover the entire property ecosystem.
          </p>
        </div>

        {/* 8 Services Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1 relative bg-[#111111]/85 border border-white/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-neutral-500">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading group-hover:text-[#FF2A2A] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-[#FF2A2A] transition-colors cursor-pointer"
                >
                  <span>Inquire Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#E10600]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
