import React, { createContext, useContext, useState, useEffect } from 'react';
import { LOGO_CONFIG } from '../data/logoConfig';

interface LogoContextType {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  isCustom: boolean;
  resetLogo: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const STORAGE_KEY = 'x_marketing_custom_logo';

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrlState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch {
      // LocalStorage access may fail in restricted iframes
    }
    return LOGO_CONFIG.useCustomLogo ? LOGO_CONFIG.customLogoUrl : '';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setLogoUrl = (url: string) => {
    setLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(STORAGE_KEY, url);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const resetLogo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setLogoUrlState(LOGO_CONFIG.customLogoUrl);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isCustom = Boolean(logoUrl && logoUrl !== LOGO_CONFIG.customLogoUrl);

  return (
    <LogoContext.Provider
      value={{
        logoUrl,
        setLogoUrl,
        isCustom,
        resetLogo,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    return {
      logoUrl: LOGO_CONFIG.customLogoUrl,
      setLogoUrl: () => {},
      isCustom: false,
      resetLogo: () => {},
      isModalOpen: false,
      openModal: () => {},
      closeModal: () => {},
    };
  }
  return context;
};
