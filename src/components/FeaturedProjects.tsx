import React, { useState } from 'react';
import { FEATURED_PROJECTS, Project, COMPANY } from '../data/content';
import { MapPin, Building, ArrowUpRight, PhoneCall, Sparkles, Video } from 'lucide-react';
import manhattanTowerImage from '../assets/images/portfolio_manhattan_tower_1790518732122.jpg';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onRegisterInterest: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onRegisterInterest,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Commercial' | 'Mixed-Use'>('All');

  const filteredProjects = selectedCategory === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#000000] relative border-t border-white/5 overflow-hidden">
      {/* =========================================================================
          ANIMATED BACKGROUND VIDEO FOR PROJECTS
         ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={manhattanTowerImage}
          className="w-full h-full object-cover filter brightness-[0.25] contrast-125 scale-105 opacity-65"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-buildings-in-a-business-district-41477-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle dark gradient overlay & red glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="absolute top-1/4 right-[10%] w-[550px] h-[350px] bg-[#E10600]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-[5%] w-[450px] h-[300px] bg-[#E10600]/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#FF2A2A] uppercase font-mono">
                Prime Lahore Portfolio
              </span>
              <span className="inline-flex items-center gap-1 ml-1 pl-2 border-l border-white/20 text-[10px] text-neutral-400 font-mono">
                <Video className="w-3 h-3 text-[#FF2A2A] animate-pulse" />
                <span>Live Video Tour</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
              Featured <span className="red-gradient-text">Developments</span>
            </h2>
            <p className="mt-2 text-sm text-[#A3A3A3] max-w-xl">
              Carefully vetted commercial hubs and luxury serviced residences in Lahore’s premier growth corridors.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            {(['All', 'Commercial', 'Mixed-Use'] as const).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'red-gradient-bg text-white shadow-md shadow-[#E10600]/30 font-bold'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-[#111111]/90 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div>
                {/* Project Image & Status Badge */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-[#1A1A1A] cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    data-lightbox
                    data-lightbox-group="featured-projects"
                    data-lightbox-title={project.name}
                    data-lightbox-caption={project.description}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open image: ${project.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white font-medium flex items-center gap-1.5">
                      <Building className="w-3 h-3 text-[#FF2A2A]" />
                      <span>{project.category}</span>
                    </span>

                    <span className="px-3 py-1 rounded-full bg-[#E10600] text-white font-bold font-mono text-[11px] shadow-lg shadow-[#E10600]/40">
                      {project.status}
                    </span>
                  </div>

                </div>

                {/* Project Body Info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-2xl font-bold text-white group-hover:text-[#FF2A2A] transition-colors font-heading cursor-pointer"
                      >
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E10600] shrink-0" />
                        <span>{project.location} ({project.landmark})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#A3A3A3] line-clamp-2 mt-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Quick specs pill */}
                  <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-[#A3A3A3]">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Units</span>
                    <span className="mt-1 block font-medium text-white">{project.units}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions: View Details (opens Project Page) & Register Interest */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-xs uppercase tracking-wider border border-white/10 hover:border-[#E10600]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Project Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF2A2A]" />
                </button>

                <button
                  type="button"
                  onClick={() => onRegisterInterest(project)}
                  className="py-3 px-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#E10600]/30 hover:shadow-lg hover:shadow-[#E10600]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Register Interest</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
