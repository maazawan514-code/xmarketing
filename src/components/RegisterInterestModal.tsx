import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY, FEATURED_PROJECTS } from '../data/content';
import { XLogo } from './XLogo';

interface RegisterInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
}

export interface RegistrationFormData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  location: string;
  interestedIn: string;
}

export const RegisterInterestModal: React.FC<RegisterInterestModalProps> = ({
  isOpen,
  onClose,
  preselectedProject,
}) => {
  // 1-indexed steps: 1 to 5
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // In-memory persistent form state across steps
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    whatsappNumber: '',
    email: '',
    location: '',
    interestedIn: preselectedProject || 'Indigo Walk',
  });

  // Sync preselected project if passed or changed
  useEffect(() => {
    if (preselectedProject) {
      setFormData((prev) => ({
        ...prev,
        interestedIn: preselectedProject,
      }));
    }
  }, [preselectedProject]);

  if (!isOpen) return null;

  const totalSteps = 5;
  const progressPercent = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        setErrorMsg('Please enter your full name (minimum 2 characters).');
        return false;
      }
    } else if (step === 2) {
      const cleaned = formData.whatsappNumber.replace(/[\s\-\(\)]/g, '');
      if (!cleaned || cleaned.length < 7) {
        setErrorMsg('Please provide a valid WhatsApp contact number with country code.');
        return false;
      }
    } else if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        setErrorMsg('Please provide a valid email address.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.location.trim()) {
        setErrorMsg('Please select or specify your current city and country.');
        return false;
      }
    } else if (step === 5) {
      if (!formData.interestedIn.trim()) {
        setErrorMsg('Please select a project or advisory option.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    // Prepare a prefilled WhatsApp message for X Marketing.
    const msg = encodeURIComponent(
      `Hello X Marketing, I have registered my interest through the website.\n\n` +
      `• Project: ${formData.interestedIn}\n` +
      `• Name: ${formData.fullName}\n` +
      `• WhatsApp: ${formData.whatsappNumber}\n` +
      `• Email: ${formData.email}\n` +
      `• City / Country: ${formData.location}\n\n` +
      `Please share exclusive pricing, payment schedule, and VIP booking documentation.`
    );

    const waLink = `https://wa.me/${COMPANY.whatsappRaw}?text=${msg}`;

    // Open WhatsApp in new tab automatically
    setTimeout(() => {
      try {
        window.open(waLink, '_blank');
      } catch {
        // Fallback if popup blocked
      }
    }, 800);
  };

  const handleDirectWhatsAppClick = () => {
    const msg = encodeURIComponent(
      `Hello X Marketing, I have registered my interest through the website.\n\n` +
      `• Project: ${formData.interestedIn}\n` +
      `• Name: ${formData.fullName}\n` +
      `• WhatsApp: ${formData.whatsappNumber}\n` +
      `• Email: ${formData.email}\n` +
      `• City / Country: ${formData.location}\n\n` +
      `Please share exclusive pricing, payment schedule, and VIP booking documentation.`
    );
    window.open(`https://wa.me/${COMPANY.whatsappRaw}?text=${msg}`, '_blank');
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setErrorMsg('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle red accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-[#E10600] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header with X Logo & Step counter */}
            <div className="flex items-center justify-between mb-5 pr-8">
              <div className="flex items-center gap-2.5">
                <XLogo className="w-8 h-8" glow={true} withCircle={true} />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#FF2A2A] font-mono block">
                    VIP PRIORITY ALLOTMENT
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                    Register Interest
                  </h3>
                </div>
              </div>

              {/* Progress "Step X of 5" */}
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-white">
                  Step <span className="text-[#FF2A2A]">{currentStep}</span> of {totalSteps}
                </span>
              </div>
            </div>

            {/* Red Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF2A2A] via-[#E10600] to-[#8B0000] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_#E10600]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step Question & Input Container with smooth transition */}
            <div className="min-h-[220px] flex flex-col justify-center">
              {/* STEP 1: Full Name */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                  <div>
                    <span className="text-xs text-[#FF2A2A] font-mono uppercase tracking-wider block mb-1">
                      Investor Identification
                    </span>
                    <h4 className="text-2xl font-bold text-white font-heading">
                      What is your full legal name?
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">
                      This will be used for official pre-allotment priority records.
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      autoFocus
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="e.g. Asad Qureshi"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-base focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: WhatsApp Number */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                  <div>
                    <span className="text-xs text-[#FF2A2A] font-mono uppercase tracking-wider block mb-1">
                      Direct Communication
                    </span>
                    <h4 className="text-2xl font-bold text-white font-heading">
                      What is your WhatsApp number?
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">
                      We send verified payment plans, site videos, and instant updates on WhatsApp.
                    </p>
                  </div>
                  <div>
                    <input
                      type="tel"
                      autoFocus
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="+92321995990"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-base focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] font-mono transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Email Address */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                  <div>
                    <span className="text-xs text-[#FF2A2A] font-mono uppercase tracking-wider block mb-1">
                      Official Documentation
                    </span>
                    <h4 className="text-2xl font-bold text-white font-heading">
                      What is your email address?
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">
                      Official investment prospectus, floor plans, and allotment paperwork will be sent here.
                    </p>
                  </div>
                  <div>
                    <input
                      type="email"
                      autoFocus
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="investor@domain.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-base focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: City / Country (Include Overseas options) */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                  <div>
                    <span className="text-xs text-[#FF2A2A] font-mono uppercase tracking-wider block mb-1">
                      Geographic Region
                    </span>
                    <h4 className="text-2xl font-bold text-white font-heading">
                      Where are you currently based?
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">
                      We operate a dedicated Overseas Pakistani VIP desk for non-resident investors.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'United Kingdom (UK)',
                      'United Arab Emirates (UAE)',
                      'Saudi Arabia (KSA)',
                      'United States (USA)',
                      'Canada',
                      'Lahore, Pakistan',
                      'Islamabad / Rawalpindi',
                      'Karachi, Pakistan',
                      'Other Overseas Location',
                    ].map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => setFormData({ ...formData, location: loc })}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                          formData.location === loc
                            ? 'bg-[#E10600]/20 border-[#E10600] text-white shadow-md'
                            : 'bg-black/50 border-white/10 text-neutral-300 hover:border-white/30'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Or type city / country manually..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#E10600] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Interested In (Dropdown / Select: Indigo Walk, Madina Mall & Residency, Advise me) */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                  <div>
                    <span className="text-xs text-[#FF2A2A] font-mono uppercase tracking-wider block mb-1">
                      Portfolio Selection
                    </span>
                    <h4 className="text-2xl font-bold text-white font-heading">
                      Which project are you interested in?
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">
                      Select your primary target or request a tailored portfolio advisory session.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        id: 'Indigo Walk',
                        title: 'Indigo Walk (Defence Road, Lahore)',
                        desc: 'Commercial Outlets & Executive Corporate Floors — from PKR 1.85 Cr',
                      },
                      {
                        id: 'Madina Mall & Residency',
                        title: 'Madina Mall & Residency (Bahria Orchard)',
                        desc: 'Luxury Serviced Apartments & Retail Mall — from PKR 45 Lakhs',
                      },
                      {
                        id: 'Advise me on best ROI',
                        title: 'Advise me (Tailored Portfolio Match)',
                        desc: 'Let a senior X Marketing director analyze my capital budget & yield goals',
                      },
                    ].map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setFormData({ ...formData, interestedIn: option.id })}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          formData.interestedIn === option.id
                            ? 'bg-[#E10600]/15 border-[#E10600] text-white shadow-md'
                            : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-white font-heading">{option.title}</div>
                          <div className="text-xs text-[#A3A3A3] mt-0.5">{option.desc}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                            formData.interestedIn === option.id
                              ? 'border-[#E10600] bg-[#E10600]'
                              : 'border-white/30'
                          }`}
                        >
                          {formData.interestedIn === option.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-3 p-2.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Footer Buttons: Back / Continue */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-[#FF2A2A]" />
                  <span>Confidential Priority Allotment</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#E10600]/50 transition-all flex items-center gap-2 cursor-pointer ml-auto"
              >
                <span>{currentStep === totalSteps ? 'Submit Registration' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* THANK YOU SCREEN AS SPECIFIED:
             "You're on the priority list. Our team will contact you on WhatsApp shortly."
             Also open a prefilled WhatsApp message with the entered details.
          */
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#E10600]/20 text-[#FF2A2A] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(225,6,0,0.4)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-[#FF2A2A] block mb-1">
              REGISTRATION CONFIRMED
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
              You&apos;re on the priority list.
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
              Our team will contact you on WhatsApp shortly with full project documentation, inventory availability, and official allotment details for{' '}
              <span className="text-white font-bold">{formData.interestedIn}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 max-w-md mx-auto mb-6 text-left text-xs space-y-1.5 font-mono text-neutral-400">
              <div><span className="text-neutral-500">Name:</span> <span className="text-white">{formData.fullName}</span></div>
              <div><span className="text-neutral-500">WhatsApp:</span> <span className="text-[#FF2A2A]">{formData.whatsappNumber}</span></div>
              <div><span className="text-neutral-500">Target:</span> <span className="text-white">{formData.interestedIn}</span></div>
              <div><span className="text-neutral-500">Desk Phone:</span> <span className="text-white">{COMPANY.phoneDisplay}</span></div>
              <div><span className="text-neutral-500">Email:</span> <span className="text-white">{COMPANY.email}</span></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDirectWhatsAppClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Chat on WhatsApp Now ({COMPANY.whatsappDisplay})</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
