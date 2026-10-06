import React from 'react';
import type { ProjectBrand } from '../data/content';

interface ProjectBrandCardsProps {
  projectName: string;
  brands: ProjectBrand[];
  className?: string;
}

export const ProjectBrandCards: React.FC<ProjectBrandCardsProps> = ({
  projectName,
  brands,
  className = '',
}) => (
  <section className={className}>
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF2A2A]">
        Brands at {projectName}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex min-h-24 items-center justify-center rounded-xl border border-white/10 bg-[#111111] p-5 text-center"
          >
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={180}
                height={64}
                loading="lazy"
                className="max-h-12 max-w-full object-contain"
              />
            ) : (
              <span className="font-heading text-lg font-bold text-white">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
