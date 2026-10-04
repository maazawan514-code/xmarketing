import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { COMPANY } from '../data/content';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="instagram-brand-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FEDA75" />
        <stop offset="0.25" stopColor="#FA7E1E" />
        <stop offset="0.5" stopColor="#D62976" />
        <stop offset="0.75" stopColor="#962FBF" />
        <stop offset="1" stopColor="#4F5BD5" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#instagram-brand-gradient)" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="url(#instagram-brand-gradient)" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.25" fill="url(#instagram-brand-gradient)" />
  </svg>
);

const socialLinks = [
  { label: 'Facebook', href: COMPANY.socials.facebook, icon: <FaFacebookF aria-hidden="true" size={32} color="#1877F2" /> },
  { label: 'Instagram', href: COMPANY.socials.instagram, icon: <InstagramIcon /> },
  { label: 'LinkedIn', href: COMPANY.socials.linkedin, icon: <FaLinkedinIn aria-hidden="true" size={32} color="#0A66C2" /> },
  { label: 'WhatsApp', href: COMPANY.socials.whatsapp, icon: <FaWhatsapp aria-hidden="true" size={32} color="#25D366" /> },
];

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    {socialLinks.map(({ label, href, icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-11 w-11 items-center justify-center transition-transform duration-200 hover:scale-110"
      >
        {icon}
      </a>
    ))}
  </div>
);
