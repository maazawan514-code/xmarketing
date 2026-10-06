import React from 'react';
import type { ProjectBrand } from '../data/content';

const LOGO_EXTENSIONS = ['svg', 'png', 'webp'];

interface ProjectBrandCardsProps {
  projectName: string;
  brands: ProjectBrand[];
  className?: string;
}

const BrandCard: React.FC<{ brand: ProjectBrand }> = ({ brand }) => {
  const [extensionIndex, setExtensionIndex] = React.useState(0);
  const [logoUnavailable, setLogoUnavailable] = React.useState(false);
  const cardClassName =
    'flex h-32 items-center justify-center rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#E10600] hover:shadow-[0_8px_24px_rgba(225,6,0,0.16)]';
  const content = !logoUnavailable && extensionIndex < LOGO_EXTENSIONS.length ? (
    <img
      src={`/images/brands/${brand.logo}.${LOGO_EXTENSIONS[extensionIndex]}`}
      alt={`${brand.name} logo`}
      width={220}
      height={80}
      loading="lazy"
      onError={() => {
        if (extensionIndex + 1 < LOGO_EXTENSIONS.length) {
          setExtensionIndex((index) => index + 1);
        } else {
          setLogoUnavailable(true);
        }
      }}
      className="h-16 w-full object-contain"
    />
  ) : (
    <span className="font-heading text-lg font-bold text-[#171717]">{brand.name}</span>
  );

  return brand.url ? (
    <a href={brand.url} target="_blank" rel="noopener noreferrer" className={cardClassName}>
      {content}
    </a>
  ) : (
    <div className={cardClassName}>{content}</div>
  );
};

export const ProjectBrandCards: React.FC<ProjectBrandCardsProps> = ({
  projectName,
  brands,
  className = '',
}) => {
  const visibleBrands = brands.filter((brand) => brand.show);
  if (visibleBrands.length === 0) return null;

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF2A2A]">
          Brands at {projectName}
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visibleBrands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-neutral-400">
          Brand names and logos belong to their respective owners. Renders are artist&apos;s impressions and tenant details are subject to change.
        </p>
      </div>
    </section>
  );
};
