import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, CheckCircle2, ShieldCheck } from 'lucide-react';
import { XLogo } from './XLogo';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEstimate?: { valuation: number; type: string; leads: number } | null;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  initialEstimate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [propertyType, setPropertyType] = useState('Penthouse / Trophy Residence');
  const [portfolioValue, setPortfolioValue] = useState('$25,000,000');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'UHNW Digital Acquisition',
    'Cinematic Media & Drone',
  ]);
  const [timeline, setTimeline] = useState('Immediate (Next 30 Days)');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    brokerageOrFirm: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (initialEstimate) {
      setPortfolioValue(`$${initialEstimate.valuation},000,000`);
      if (initialEstimate.type === 'penthouse') setPropertyType('Penthouse / Trophy Residence');
      if (initialEstimate.type === 'estate') setPropertyType('Private Architectural Villa / Estate');
      if (initialEstimate.type === 'tower') setPropertyType('Multi-Unit Residential Tower Launch');
    }
  }, [initialEstimate]);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <XLogo className="w-7 h-7" />
            <div>
              <div className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold">
                Strategic Onboarding
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                Launch Your Real Estate Campaign
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#FF0000] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {!confirmed && (
          <div className="px-6 sm:px-8 py-3 bg-[#060608] border-b border-neutral-800/80 flex items-center justify-between text-xs font-mono">
            <span className={step >= 1 ? 'text-[#FF0000] font-bold' : 'text-neutral-500'}>
              01. Asset Class
            </span>
            <span className="text-neutral-600">→</span>
            <span className={step >= 2 ? 'text-[#FF0000] font-bold' : 'text-neutral-500'}>
              02. Scope Selection
            </span>
            <span className="text-neutral-600">→</span>
            <span className={step >= 3 ? 'text-[#FF0000] font-bold' : 'text-neutral-500'}>
              03. Briefing Schedule
            </span>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {confirmed ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#FF0000]/15 text-[#FF0000] mx-auto flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-heading">
                Strategy Session Scheduled
              </h3>
              <p className="text-neutral-300 text-sm max-w-md mx-auto mt-3 leading-relaxed">
                Thank you, <span className="text-white font-semibold">{contactInfo.name || 'Principal'}</span>. Your campaign dossier has been routed to our Managing Partner. We will send a calendar invitation to <span className="text-white font-semibold">{contactInfo.email}</span> shortly.
              </p>

              <div className="mt-8 p-4 bg-[#050507] border border-neutral-800 rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                <div className="text-neutral-400">
                  <span className="text-neutral-500">Asset:</span> {propertyType}
                </div>
                <div className="text-neutral-400">
                  <span className="text-neutral-500">Valuation:</span> {portfolioValue}
                </div>
                <div className="text-neutral-400">
                  <span className="text-neutral-500">Services:</span> {selectedServices.join(', ')}
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-[#FF0000] hover:bg-[#E60000] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-[#FF0000]/30 cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <div>
              {/* Step 1: Asset Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                      Select Target Property Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Penthouse / Trophy Residence',
                        'Private Architectural Villa / Estate',
                        'Multi-Unit Residential Tower Launch',
                        'Master-Planned Waterfront Development',
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPropertyType(t)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            propertyType === t
                              ? 'bg-[#FF0000]/15 border-[#FF0000] text-white'
                              : 'bg-[#060608] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Property or Portfolio Target Valuation
                    </label>
                    <select
                      value={portfolioValue}
                      onChange={(e) => setPortfolioValue(e.target.value)}
                      className="w-full px-4 py-3 bg-[#050507] border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF0000] transition-colors"
                    >
                      <option value="$5,000,000">$5,000,000 – $10,000,000</option>
                      <option value="$25,000,000">$10,000,000 – $25,000,000</option>
                      <option value="$50,000,000">$25,000,000 – $50,000,000</option>
                      <option value="$100,000,000+">$50,000,000 – $100,000,000+</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-7 py-3.5 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md shadow-[#FF0000]/30 cursor-pointer"
                    >
                      <span>Proceed to Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Scope & Services */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                      Select Capabilities Needed (Choose 1 or more)
                    </label>
                    <div className="space-y-2.5">
                      {[
                        { id: 'Architectural Branding', desc: 'Identity, visual direction, sales gallery books, and naming' },
                        { id: 'UHNW Digital Acquisition', desc: 'Discreet programmatic media, private banking ads, geo-fencing' },
                        { id: 'Cinematic Media & Drone', desc: '4K twilight drone film, 3D interactive virtual tour' },
                        { id: 'High-Conversion Digital Landers', desc: 'Verified buyer digital showroom with proof-of-funds gate' },
                      ].map((item) => {
                        const isChecked = selectedServices.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleService(item.id)}
                            className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'bg-[#FF0000]/15 border-[#FF0000]'
                                : 'bg-[#060608] border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                                isChecked
                                  ? 'bg-[#FF0000] border-[#FF0000] text-white'
                                  : 'border-neutral-700 bg-transparent'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white">{item.id}</div>
                              <div className="text-xs text-neutral-400 mt-0.5">{item.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Target Campaign Launch Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 bg-[#050507] border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF0000] transition-colors"
                    >
                      <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                      <option value="Quarter 1 (Within 60-90 Days)">Within 60 – 90 Days</option>
                      <option value="Long-term Development (6+ Months)">Pre-Development (6+ Months)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-7 py-3.5 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md shadow-[#FF0000]/30 cursor-pointer"
                    >
                      <span>Proceed to Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Scheduling */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Your Full Name / Principal *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="e.g. Richard Thorne"
                      className="w-full px-4 py-3 bg-[#050507] border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF0000] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                        Direct Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="richard@estategroup.com"
                        className="w-full px-4 py-3 bg-[#050507] border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF0000] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="+1 (212) 555-0199"
                        className="w-full px-4 py-3 bg-[#050507] border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-[#FF0000] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Brokerage / Development Entity Name
                    </label>
                    <input
                      type="text"
                      value={contactInfo.brokerageOrFirm}
                      onChange={(e) => setContactInfo({ ...contactInfo, brokerageOrFirm: e.target.value })}
                      placeholder="e.g. Related Companies / Sotheby's International"
                      className="w-full px-4 py-3 bg-[#050507] border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF0000] transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-[#FF0000]" />
                    <span>Transmissions are non-public and protected under standard real estate confidentiality.</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-lg bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#FF0000]/40 cursor-pointer"
                    >
                      Confirm Strategy Consultation
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
