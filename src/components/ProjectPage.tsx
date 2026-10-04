import React, { useState } from 'react';
import { Project, ProjectGalleryItem } from '../data/content';
import {
  ArrowLeft,
  MapPin,
  Building,
  Calendar,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  Navigation,
} from 'lucide-react';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
  onRegisterInterest: (project: Project) => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  project,
  onBack,
  onRegisterInterest,
}) => {
  // FAQ Accordion state (record of open FAQ indexes)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#A3A3A3] pt-20 animate-in fade-in duration-300">
      {/* 1) FULL-WIDTH CINEMATIC HERO IMAGE WITH DARK OVERLAY */}
      <section className="relative w-full h-[65vh] min-h-[460px] max-h-[680px] overflow-hidden flex items-end justify-start">
        {/* Background Video & Image with subtle scale */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={project.heroImage}
            className="w-full h-full object-cover filter brightness-[0.45] contrast-110 scale-105"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-modern-buildings-in-a-business-district-41477-large.mp4"
              type="video/mp4"
            />
          </video>
          <img
            src={project.heroImage}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-90 -z-10"
          />
          {/* Cinematic Dark Overlays & Red Ambient Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/75 to-black/35" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E10600]/20 blur-[140px] rounded-full pointer-events-none" />
        </div>

        {/* Top Back Navigation Bar */}
        <div className="absolute top-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/15 hover:border-[#E10600]/50 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF2A2A] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E10600] text-white font-mono text-xs font-bold shadow-lg shadow-[#E10600]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.status}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-neutral-200 text-xs font-medium backdrop-blur-md">
              <Building className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span>{project.category}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-md">
            {project.name}
          </h1>

          <p className="mt-2 text-base sm:text-xl text-neutral-300 font-medium max-w-3xl drop-shadow">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E10600]" />
              <span>{project.location} ({project.landmark})</span>
            </div>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <div className="text-[#FF2A2A] font-mono font-bold">
              Starting from {project.keyFacts.startingPrice}
            </div>
          </div>
        </div>

        {/* Bottom Red Accent Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />
      </section>

      {/* 2) KEY FACTS ROW (Location, Unit Types, Payment Plan, Completion) */}
      <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* Fact 1: Location */}
            <div className="flex items-start gap-4 px-2 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono block">
                  Location
                </span>
                <span className="text-sm font-bold text-white font-heading mt-0.5 block leading-snug">
                  {project.keyFacts.location}
                </span>
              </div>
            </div>

            {/* Fact 2: Unit Types */}
            <div className="flex items-start gap-4 px-2 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-11 h-11 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono block">
                  Unit Types
                </span>
                <span className="text-sm font-bold text-white font-heading mt-0.5 block leading-snug">
                  {project.keyFacts.unitTypes}
                </span>
              </div>
            </div>

            {/* Fact 3: Payment Plan */}
            <div className="flex items-start gap-4 px-2 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-11 h-11 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono block">
                  Payment Plan
                </span>
                <span className="text-sm font-bold text-white font-heading mt-0.5 block leading-snug">
                  {project.keyFacts.paymentPlan}
                </span>
              </div>
            </div>

            {/* Fact 4: Completion */}
            <div className="flex items-start gap-4 px-2 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-11 h-11 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono block">
                  Completion Target
                </span>
                <span className="text-sm font-bold text-white font-heading mt-0.5 block leading-snug">
                  {project.keyFacts.completion}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Register Action Banner inside Key Facts */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-[#FF2A2A]" />
              <span>{project.keyFacts.approvalStatus}</span>
            </div>

            <button
              type="button"
              onClick={() => onRegisterInterest(project)}
              className="w-full sm:w-auto px-7 py-3 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Register Interest in {project.name}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3) OVERVIEW SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30">
              <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
                Development Overview
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              An Architectural Statement of{' '}
              <span className="red-gradient-text">Prestige & Performance</span>
            </h2>

            <div className="w-16 h-1 bg-[#E10600] rounded-full" />

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              {project.description}
            </p>

            {/* Bullet Highlights */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                Core Value Propositions:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF2A2A] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Box & Advisor Callout */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs uppercase font-mono text-neutral-400">Allotment Status</span>
              <div className="text-2xl font-bold text-white font-heading mt-1">
                Direct Official Developer Mandate
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Zero agent markups or arbitrary transfer premiums. All bookings executed with official receipts.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <span className="text-neutral-400">Starting Price</span>
                <span className="text-white font-mono font-bold">{project.keyFacts.startingPrice}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <span className="text-neutral-400">Tenure</span>
                <span className="text-white font-mono">{project.keyFacts.paymentPlan.split('(')[0]}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <span className="text-neutral-400">Target Delivery</span>
                <span className="text-[#FF2A2A] font-mono font-bold">{project.keyFacts.completion}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRegisterInterest(project)}
              className="w-full py-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Brochure & Pricing Sheet</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4) IMAGE GALLERY WITH INTERACTIVE LIGHTBOX */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
              <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
                Visual Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Project <span className="red-gradient-text">Gallery</span>
            </h2>
            <p className="mt-3 text-sm text-[#A3A3A3]">
              Click any render or photograph to open the high-resolution lightbox viewer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10 cursor-pointer shadow-lg hover:border-[#E10600]/60 transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  data-lightbox
                  data-lightbox-group={project.id}
                  data-lightbox-title={img.title}
                  data-lightbox-caption={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-mono font-semibold text-[#FF2A2A] block uppercase">
                    0{idx + 1} // VIEW
                  </span>
                  <div className="text-sm font-bold text-white group-hover:text-[#FF2A2A] transition-colors line-clamp-1 font-heading">
                    {img.title}
                  </div>
                  <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 5) LOCATION SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30">
              <Navigation className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
                Connectivity & Proximity
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Prime Location on <span className="red-gradient-text">{project.location}</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {project.locationDetails.mapEmbedNote}
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#FF2A2A] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase font-mono text-neutral-400 block">Official Site Address</span>
                <span className="text-sm font-semibold text-white mt-0.5 block">{project.locationDetails.address}</span>
              </div>
            </div>

            {/* Travel Times Grid */}
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 font-mono">
                Key Travel Times:
              </h3>
              <div className="space-y-2">
                {project.locationDetails.proximityHighlights.map((prox, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-2 text-neutral-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
                      <span>{prox.label}</span>
                    </div>
                    <span className="font-mono font-bold text-[#FF2A2A]">{prox.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Map/Satellite Representation Card */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#111111] border border-white/15 p-8 flex flex-col justify-between shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 filter grayscale contrast-125"
                style={{
                  backgroundImage: `url('${project.heroImage}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

              <div className="relative z-10">
                <span className="text-xs font-mono font-bold text-[#FF2A2A] uppercase tracking-wider block">
                  Interactive Node
                </span>
                <h3 className="text-xl font-bold text-white font-heading mt-1">
                  {project.locationDetails.area}
                </h3>
              </div>

              <div className="relative z-10 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-[#E10600]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E10600] text-white flex items-center justify-center font-bold font-mono">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{project.name} Site Office</div>
                    <div className="text-[11px] text-neutral-400">Chauffeured VIP Site Visits Arranged Daily</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRegisterInterest(project)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-[#FF2A2A]" />
                  <span>Book Chauffeured Site Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) "WHY THIS PROJECT" CHAPTERS (Chapter I, II, III) */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
              <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
                Investment Analysis
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading">
              Why <span className="red-gradient-text">{project.name}</span>
            </h2>
            <p className="mt-3 text-base text-[#A3A3A3]">
              A three-part institutional breakdown of location dynamics, engineering execution, and capital growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.chapters.map((ch) => (
              <div
                key={ch.number}
                className="glass-card rounded-2xl p-8 flex flex-col justify-between group hover:-translate-y-1 relative bg-[#111111]/85 border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-bold tracking-widest text-[#FF2A2A] uppercase">
                      {ch.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#E10600]" />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono block mb-1">
                    {ch.subtitle}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-4 font-heading group-hover:text-[#FF2A2A] transition-colors">
                    {ch.title}
                  </h3>

                  <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                    {ch.content}
                  </p>
                </div>

                {ch.highlights && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    {ch.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E10600] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) FAQ ACCORDION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
            <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
              Due Diligence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Frequently Asked <span className="red-gradient-text">Questions</span>
          </h2>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            Key legal, booking, and installment details for prospective investors.
          </p>
        </div>

        <div className="space-y-4">
          {project.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#111111]/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="text-base font-bold text-white font-heading">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#FF2A2A]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8) BOTTOM REGISTRATION CTA */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E10600]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#FF2A2A] uppercase block mb-2">
            Priority Allocation Desk
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading">
            Secure Your Unit in <span className="red-gradient-text">{project.name}</span>
          </h2>

          <p className="mt-4 text-base text-neutral-300 leading-relaxed">
            Direct developer booking with verified inventory and flexible milestone installments. Register your interest now to access pre-launch rates.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onRegisterInterest(project)}
              className="px-8 py-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#E10600]/35 transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Register Interest Now</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
            >
              <span>Explore Other Projects</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
