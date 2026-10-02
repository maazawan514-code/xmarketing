import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../data/brandConfig';

export interface RegistrationSubmission {
  fullName: string;
  whatsappNumber: string;
  email: string;
  city: string;
  interestedIn: string;
  timestamp: string;
}

interface MultiStepFormProps {
  onSuccess?: (data: RegistrationSubmission) => void;
  defaultInterestedIn?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  onSuccess,
  defaultInterestedIn = '1-Bedroom',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    city: '',
    interestedIn: defaultInterestedIn,
  });

  // Array to store local submissions in component state
  const [submissions, setSubmissions] = useState<RegistrationSubmission[]>([]);

  const totalSteps = 5;
  const progressPercent = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        setErrorMessage('Please provide your full legal name.');
        return false;
      }
    } else if (step === 2) {
      const cleanPhone = formData.whatsappNumber.replace(/[\s\-\(\)]/g, '');
      if (!cleanPhone || cleanPhone.length < 7) {
        setErrorMessage('Please enter a valid telephone / WhatsApp number with country code.');
        return false;
      }
    } else if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        setErrorMessage('Please enter a valid email address for dispatch of particulars.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.city.trim() || formData.city.trim().length < 2) {
        setErrorMessage('Please state your primary city or country of residence.');
        return false;
      }
    } else if (step === 5) {
      if (!formData.interestedIn.trim()) {
        setErrorMessage('Please select a residence tier or request bespoke advice.');
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
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    const newSubmission: RegistrationSubmission = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // 1. Store submission in component state
    setSubmissions((prev) => [newSubmission, ...prev]);

    /**
     * =========================================================================
     * BACKEND / WEBHOOK / GOOGLE SHEETS / WHATSAPP INTEGRATION PLUG-IN SPOT:
     * =========================================================================
     * Example:
     * fetch('https://api.yourdomain.com/v1/registrations', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify(newSubmission),
     * });
     * Or forward to Zapier / Make / WhatsApp Webhook:
     * window.open(`https://wa.me/41818375000?text=${encodeURIComponent(...)}`);
     * =========================================================================
     */

    if (onSuccess) {
      onSuccess(newSubmission);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      whatsappNumber: '',
      email: '',
      city: '',
      interestedIn: '1-Bedroom',
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="bg-[#241a04] border border-[#b8955a]/30 p-8 sm:p-10 shadow-2xl relative rounded-sm">
      {/* Subtle top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b8955a] to-transparent" />

      {!isSubmitted ? (
        <div>
          {/* Header & Step Counter */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#b8955a]/15">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#b8955a] font-mono block">
                PRIORITY ALLOCATION DOSSIER
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#f5efe3] mt-0.5">
                Register Priority Interest
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-medium text-[#b8955a]">
                Step <span className="text-white font-bold text-sm">{currentStep}</span> of {totalSteps}
              </span>
            </div>
          </div>

          {/* Gold Progress Bar */}
          <div className="w-full h-1 bg-[#3b2c06] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#b8955a] via-[#d4b57e] to-[#91713d] transition-all duration-300 ease-out shadow-[0_0_8px_#b8955a]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Form Step Body */}
          <div className="min-h-[190px] flex flex-col justify-center">
            {/* Step 1: Full Name */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <label className="block text-xs uppercase tracking-[0.2em] font-sans text-[#b8955a]">
                  Step 01 / Identity
                </label>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#f5efe3] font-normal leading-snug">
                  What is your full name?
                </h4>
                <p className="text-xs text-[#a3947f] font-light">
                  This will be recorded on your private deed registration monograph.
                </p>
                <input
                  type="text"
                  autoFocus
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="e.g. Lord Alistair Vance"
                  className="w-full px-5 py-4 bg-[#1d1503] border border-[#b8955a]/30 text-[#f5efe3] placeholder-[#73634e] text-base focus:outline-none focus:border-[#b8955a] font-sans transition-colors rounded-sm"
                />
              </div>
            )}

            {/* Step 2: WhatsApp Number */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <label className="block text-xs uppercase tracking-[0.2em] font-sans text-[#b8955a]">
                  Step 02 / Direct Contact
                </label>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#f5efe3] font-normal leading-snug">
                  Your WhatsApp or mobile number?
                </h4>
                <p className="text-xs text-[#a3947f] font-light">
                  For private courier delivery notifications and confidential WhatsApp updates.
                </p>
                <input
                  type="tel"
                  autoFocus
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="+41 81 837 5000 or +44 20 7946 0992"
                  className="w-full px-5 py-4 bg-[#1d1503] border border-[#b8955a]/30 text-[#f5efe3] placeholder-[#73634e] text-base focus:outline-none focus:border-[#b8955a] font-mono transition-colors rounded-sm"
                />
              </div>
            )}

            {/* Step 3: Email */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <label className="block text-xs uppercase tracking-[0.2em] font-sans text-[#b8955a]">
                  Step 03 / Documentation
                </label>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#f5efe3] font-normal leading-snug">
                  What is your private email address?
                </h4>
                <p className="text-xs text-[#a3947f] font-light">
                  Full architectural blueprints, financial modeling, and legal papers are sent here.
                </p>
                <input
                  type="email"
                  autoFocus
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="vance@privateoffice.ch"
                  className="w-full px-5 py-4 bg-[#1d1503] border border-[#b8955a]/30 text-[#f5efe3] placeholder-[#73634e] text-base focus:outline-none focus:border-[#b8955a] font-sans transition-colors rounded-sm"
                />
              </div>
            )}

            {/* Step 4: City */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <label className="block text-xs uppercase tracking-[0.2em] font-sans text-[#b8955a]">
                  Step 04 / Geography
                </label>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#f5efe3] font-normal leading-snug">
                  What is your primary city of residence?
                </h4>
                <p className="text-xs text-[#a3947f] font-light">
                  We host private seasonal salons in Zurich, London, Geneva, Dubai, and Singapore.
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Zurich', 'London', 'Geneva', 'Dubai', 'Milan', 'Singapore'].map((city) => (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setFormData({ ...formData, city })}
                      className={`px-3 py-1.5 text-xs font-sans rounded-sm border cursor-pointer transition-colors ${
                        formData.city === city
                          ? 'border-[#b8955a] bg-[#b8955a]/20 text-[#f5efe3]'
                          : 'border-white/10 text-[#a3947f] hover:border-[#b8955a]/50'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="Or type city / country..."
                  className="w-full px-5 py-4 bg-[#1d1503] border border-[#b8955a]/30 text-[#f5efe3] placeholder-[#73634e] text-base focus:outline-none focus:border-[#b8955a] font-sans transition-colors rounded-sm"
                />
              </div>
            )}

            {/* Step 5: Interested In */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <label className="block text-xs uppercase tracking-[0.2em] font-sans text-[#b8955a]">
                  Step 05 / Residence Preference
                </label>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#f5efe3] font-normal leading-snug">
                  Which tier interests you?
                </h4>
                <p className="text-xs text-[#a3947f] font-light">
                  Select your preferred residence layout or request dedicated founder portfolio guidance.
                </p>

                <div className="relative">
                  <select
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    className="w-full px-5 py-4 bg-[#1d1503] border border-[#b8955a]/40 text-[#f5efe3] text-sm focus:outline-none focus:border-[#b8955a] font-sans transition-colors rounded-sm appearance-none cursor-pointer"
                  >
                    <option value="1-Bedroom">1-Bedroom Residence (CHF 2,150,000+)</option>
                    <option value="2-Bedroom">2-Bedroom Chalet Suite (CHF 3,650,000+)</option>
                    <option value="3-Bedroom">3-Bedroom Estate Suite (CHF 5,400,000+)</option>
                    <option value="Penthouse">The Sovereign Sky Penthouse (Crown Collection)</option>
                    <option value="Advise me">Advise me (Bespoke Private Client Consultation)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#b8955a]">
                    ▼
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-950/70 border border-red-500/50 text-red-200 text-xs font-sans rounded-sm">
              {errorMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-5 border-t border-[#b8955a]/15 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] font-sans text-[#a3947f] hover:text-[#f5efe3] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#73634e] font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b8955a]" />
                <span>Strict Swiss Discretion</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="ml-auto inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#b8955a] hover:bg-[#d4b57e] text-[#231a04] font-semibold text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 shadow-lg shadow-[#b8955a]/20 cursor-pointer transform hover:-translate-y-0.5 rounded-sm"
            >
              <span>{currentStep === totalSteps ? 'Complete Registration' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Welcome / Success Screen */
        <div className="py-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#b8955a]/20 border border-[#b8955a] text-[#b8955a] flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Check className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#b8955a] block mb-2">
            REGISTRATION RECORDED
          </span>

          <h3 className="text-3xl sm:text-4xl font-serif text-[#f5efe3] mb-4">
            Welcome to {BRAND.shortName}.
          </h3>

          <p className="text-sm text-[#d1c4b2] max-w-md mx-auto leading-relaxed mb-6 font-light">
            Your allocation request for <span className="text-white font-medium">{formData.interestedIn}</span> has been confirmed. Our Private Client Desk will contact you on WhatsApp at{' '}
            <span className="text-[#b8955a] font-mono">{formData.whatsappNumber}</span> with priority release terms.
          </p>

          <div className="p-4 bg-[#1d1503] border border-[#b8955a]/20 text-left max-w-sm mx-auto mb-6 text-xs text-[#a3947f] space-y-1 font-mono">
            <div><span className="text-[#73634e]">Investor:</span> {formData.fullName}</div>
            <div><span className="text-[#73634e]">Email:</span> {formData.email}</div>
            <div><span className="text-[#73634e]">City:</span> {formData.city}</div>
            <div><span className="text-[#73634e]">Tier:</span> {formData.interestedIn}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-[#b8955a]/40 text-[#b8955a] hover:bg-[#b8955a] hover:text-[#231a04] text-xs uppercase tracking-[0.2em] font-sans transition-colors cursor-pointer rounded-sm"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
