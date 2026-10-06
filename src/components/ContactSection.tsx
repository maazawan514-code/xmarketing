import React, { useState } from 'react';
import { COMPANY, FEATURED_PROJECTS } from '../data/content';
import { SocialLinks } from './SocialLinks';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedProject: 'Indigo Walk (Defence Road, Lahore)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate instant local handling
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello X Marketing, my name is ${formData.name || 'an investor'}. I am interested in ${formData.interestedProject}. Please connect with me.`
    );
    window.open(`${COMPANY.whatsappUrl}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-[#000000] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Office Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E10600]/30 mb-4">
                <span className="text-xs font-semibold tracking-wider text-[#FF2A2A] uppercase font-mono">
                  Direct Advisory Desk
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading mb-6">
                Let&apos;s Discuss Your{' '}
                <span className="red-gradient-text">Next Investment</span>
              </h2>

              <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed mb-8">
                Speak directly with an X Marketing investment partner. Whether you are in Lahore or abroad in the UK, UAE, or US, we provide rapid, verified property guidance.
              </p>

              {/* Contact Cards */}
              <div className="space-y-3.5 mb-10">
                {/* Phone Call */}
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card group hover:border-[#E10600]/50 transition-colors bg-[#111111]/80 border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Direct Phone Line</div>
                    <div className="text-base font-bold text-white font-sans">{COMPANY.phoneDisplay}</div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card group hover:border-[#E10600]/50 transition-colors bg-[#111111]/80 border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">WhatsApp Direct Desk</div>
                    <div className="text-base font-bold text-white font-sans">{COMPANY.whatsappDisplay}</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card group hover:border-[#E10600]/50 transition-colors bg-[#111111]/80 border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Business Email</div>
                    <div className="break-words text-base font-bold text-white font-sans [overflow-wrap:anywhere]">{COMPANY.email}</div>
                  </div>
                </a>

                {/* Office */}
                <a
                  href={COMPANY.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card bg-[#111111]/80 border border-white/10 hover:border-[#E10600]/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E10600]/15 border border-[#E10600]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Lahore Head Office</div>
                    <span className="text-xs sm:text-sm text-neutral-200 mt-0.5 leading-snug">{COMPANY.address}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#FF2A2A] shrink-0" />
              <div className="text-xs text-[#A3A3A3]">
                Strict confidentiality guaranteed for UHNW & overseas institutional inquiries.
              </div>
            </div>

            <SocialLinks className="pt-5" />
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Book a Confidential Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] mb-8">
                Fill in your details below and an X Marketing investment director will contact you within 2 hours.
              </p>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#E10600]/20 text-[#FF2A2A] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 font-heading">Inquiry Received</h4>
                  <p className="text-sm text-[#A3A3A3] max-w-md mb-6">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Our senior real estate advisor has received your request regarding <span className="text-[#FF2A2A] font-medium">{formData.interestedProject}</span> and will reach out shortly.
                  </p>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                    <span>Instant Follow-Up on WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="investor@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Project of Interest
                    </label>
                    <select
                      value={formData.interestedProject}
                      onChange={(e) => setFormData({ ...formData, interestedProject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors cursor-pointer"
                    >
                      {FEATURED_PROJECTS.map((p) => (
                        <option key={p.id} value={`${p.name} (${p.location})`} className="bg-[#111111] text-white">
                          {p.name} — {p.category} ({p.location})
                        </option>
                      ))}
                      <option value="General Commercial Investment" className="bg-[#111111] text-white">General Commercial Outlets</option>
                      <option value="General Residential / Apartment" className="bg-[#111111] text-white">Luxury Apartments / Penthouse</option>
                      <option value="Developer Marketing Partnership" className="bg-[#111111] text-white">Developer Project Marketing Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Message / Specific Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project interest, timeline, or preferred unit type..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#E10600]/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Your Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Investment Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
