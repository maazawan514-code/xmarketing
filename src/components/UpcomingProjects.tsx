import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_WHATSAPP, UPCOMING_PROJECTS } from '../data/upcomingProjects';
import { ProjectBrandCards } from './ProjectBrandCards';

const AmbientVideo: React.FC<{ src: string; poster: string; label: string }> = ({ src, poster, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = src;
          video.load();
        }
        video.playbackRate = 0.5;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, { rootMargin: '200px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      className="absolute inset-0 -z-20 h-full w-full object-cover"
    />
  );
};

export const UpcomingProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    section.classList.add('upcoming-motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('upcoming-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    section.querySelectorAll('[data-upcoming-reveal]').forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      section.classList.remove('upcoming-motion-ready');
    };
  }, []);

  return (
    <section id="upcoming-projects" ref={sectionRef} className="border-t border-white/10 bg-[#050505]">
      <div className="relative isolate flex min-h-[72vh] items-end overflow-hidden border-b border-white/10 px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:min-h-[78vh] lg:px-12">
        <AmbientVideo src="/videos/hero.mp4" poster={UPCOMING_PROJECTS[0].poster} label="Upcoming projects hero" />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <div data-upcoming-reveal className="mx-auto w-full max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#FF2A2A]">X Marketing | Lahore</p>
          <h2 className="max-w-4xl font-heading text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            Upcoming Projects <span className="red-gradient-text">by X Marketing</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-200 sm:text-lg">
            Explore new commercial and mixed-use opportunities across Lahore.
          </p>
          <a href="#executive-grand-mall" className="mt-8 inline-flex items-center gap-2 border-b border-[#FF2A2A] pb-2 text-sm font-semibold text-white transition-colors hover:text-[#FF2A2A]">
            Explore the projects <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-14 sm:space-y-16 sm:px-6 sm:py-20 lg:px-8">
        {UPCOMING_PROJECTS.map((project, index) => (
          <article
            id={project.id}
            key={project.id}
            className="relative isolate scroll-mt-24 overflow-hidden border border-white/10 bg-[#101010]"
          >
            <AmbientVideo src={project.video} poster={project.poster} label={`${project.title} background`} />
            <div className="absolute inset-0 -z-10 bg-black/90 sm:bg-black/80" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#E10600]/15 via-transparent to-black/50" />

            <div className="p-5 sm:p-8 lg:p-12">
              <div data-upcoming-reveal className="flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF2A2A]">Upcoming project 0{index + 1}</p>
                  <h3 className="font-heading text-3xl font-extrabold text-white sm:text-5xl">{project.title}</h3>
                  <p className="mt-3 text-lg text-neutral-200">{project.tagline}</p>
                  <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-neutral-300">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2A2A]" />{project.location}
                  </p>
                </div>
                <a
                  href={`${CONTACT_WHATSAPP}?text=${encodeURIComponent(`I would like details about ${project.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 self-start bg-[#E10600] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#FF2A2A] md:self-auto"
                >
                  <FaWhatsapp className="h-4 w-4" /> Enquire on WhatsApp
                </a>
              </div>

              <div data-upcoming-reveal className="grid gap-6 border-b border-white/15 py-7 sm:grid-cols-2 lg:grid-cols-4">
                {project.facts.map((fact) => (
                  <div key={fact.label} className="border-l-2 border-[#E10600] pl-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">{fact.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{fact.value}</p>
                  </div>
                ))}
              </div>

              <div data-upcoming-reveal className="grid gap-6 border-b border-white/15 py-7 sm:gap-8 sm:py-8 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF2A2A]">Project overview</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-100">{project.type}</p>
                </div>
                <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:pb-0">
                  {project.gallery.map((image) => (
                    <figure
                      key={image.src}
                      className="group min-w-[86%] snap-start overflow-hidden rounded-xl border border-white/10 bg-[#090909] sm:min-w-0"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        data-lightbox
                        data-lightbox-group={project.id}
                        data-lightbox-title={image.alt}
                        data-lightbox-caption={project.tagline}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open image: ${image.alt}`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <figcaption className="border-t border-white/10 px-3 py-2.5 text-xs leading-relaxed text-neutral-300">
                        {image.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {project.brands && project.brands.length > 0 && (
                <ProjectBrandCards
                  projectName={project.title}
                  brands={project.brands}
                  className="border-b border-white/15 py-7"
                />
              )}

              <div className="grid gap-x-10 gap-y-8 pt-8 md:grid-cols-2">
                {project.details.map((group, groupIndex) => (
                  <section
                    key={group.heading}
                    data-upcoming-reveal
                    className={groupIndex === 0 ? 'md:col-span-2' : ''}
                  >
                    <h4 className="font-heading text-lg font-bold text-white">{group.heading}</h4>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-neutral-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#E10600]" />{item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="border-t border-white/10 px-4 py-5 text-center text-xs leading-relaxed text-neutral-500">
        Images are artist's impressions. Prices, plans and specifications are subject to change without notice.
      </p>
    </section>
  );
};