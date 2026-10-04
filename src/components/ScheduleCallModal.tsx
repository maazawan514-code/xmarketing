import React, { useState } from 'react';
import { COMPANY, FEATURED_PROJECTS, Project } from '../data/content';
import { X, PhoneCall, Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { XLogo } from './XLogo';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: Project | null;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({
  isOpen,
  onClose,
  preselectedProject,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 1:00 PM (PKT)');
  const [projectInterest, setProjectInterest] = useState(
    preselectedProject ? preselectedProject.name : 'Indigo Walk'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleInstantWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello X Marketing, I would like to schedule a call regarding "${projectInterest}". My name is ${name || 'an investor'} and my phone is ${phone || ''}.`
    );
    window.open(`${COMPANY.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-[#E10600] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <XLogo className="w-9 h-9" glow={true} withCircle={true} />
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#FF2A2A] font-mono font-semibold">
              VIP Investor Desk
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              Schedule an Investment Briefing
            </h3>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#E10600]/20 text-[#FF2A2A] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2 font-heading">
              Briefing Call Requested
            </h4>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mb-6 leading-relaxed">
              We have allocated a senior real estate advisor for your session on{' '}
              <span className="text-white font-semibold">{date || 'Next Available Slot'}</span> ({timeSlot}) regarding{' '}
              <span className="text-[#FF2A2A] font-semibold">{projectInterest}</span>.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleInstantWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl red-gradient-bg text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#E10600]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span>Confirm Instantly on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Asad Qureshi"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Phone Number (WhatsApp preferred) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Target Project
              </label>
              <select
                value={projectInterest}
                onChange={(e) => setProjectInterest(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors cursor-pointer"
              >
                {FEATURED_PROJECTS.map((p) => (
                  <option key={p.id} value={p.name} className="bg-[#111111] text-white">
                    {p.name} ({p.location})
                  </option>
                ))}
                <option value="General Commercial Property" className="bg-[#111111] text-white">General Commercial Outlets</option>
                <option value="High-Yield Rental Apartments" className="bg-[#111111] text-white">High-Yield Rental Apartments</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E10600] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E10600] transition-colors cursor-pointer"
                >
                  <option value="11:00 AM - 1:00 PM (PKT)" className="bg-[#111111] text-white">Morning (11am-1pm)</option>
                  <option value="3:00 PM - 5:00 PM (PKT)" className="bg-[#111111] text-white">Afternoon (3pm-5pm)</option>
                  <option value="7:00 PM - 9:00 PM (PKT)" className="bg-[#111111] text-white">Evening (7pm-9pm)</option>
                  <option value="Overseas Timezone (VIP)" className="bg-[#111111] text-white">Overseas Timezone</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#E10600]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Confirm Call Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
