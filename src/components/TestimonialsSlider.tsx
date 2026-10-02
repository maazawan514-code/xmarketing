import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, MapPin } from 'lucide-react';

export const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#000000] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF2A2A] uppercase font-mono">
              Investor Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Trusted By <span className="red-gradient-text">Smart Investors</span>
          </h2>
          <p className="mt-4 text-base text-[#A3A3A3]">
            Real experiences from expatriate and local Pakistani investors who achieved transparent bookings through X Marketing.
          </p>
        </div>

        {/* Testimonial Card Box */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden bg-[#111111]/90"
        >
          {/* Subtle red background glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-[#E10600]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF2A2A] text-[#FF2A2A]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#E10600]/30" />
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-100 italic leading-relaxed mb-6 font-heading">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E10600] to-[#FF2A2A] text-white flex items-center justify-center font-bold text-base shadow-md font-mono">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-base font-heading flex items-center gap-2">
                    <span>{current.name}</span>
                    <ShieldCheck className="w-4 h-4 text-[#FF2A2A]" />
                  </div>
                  <div className="text-xs text-[#A3A3A3] flex items-center gap-2 mt-0.5">
                    <span>{current.designation}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E10600]" />
                      {current.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Tag & Controls */}
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 shrink-0">
              <div className="text-left md:text-center">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono block">Booked Project</span>
                <span className="text-xs sm:text-sm font-bold text-[#FF2A2A] mt-0.5 block">{current.project}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E10600] text-neutral-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E10600] text-neutral-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-6 bg-[#E10600]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
