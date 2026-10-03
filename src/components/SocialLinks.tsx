import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { COMPANY } from '../data/content';

const socialLinks = [
  { label: 'Facebook', href: COMPANY.socials.facebook, Icon: FaFacebookF },
  { label: 'Instagram', href: COMPANY.socials.instagram, Icon: FaInstagram },
  { label: 'LinkedIn', href: COMPANY.socials.linkedin, Icon: FaLinkedinIn },
  { label: 'WhatsApp', href: COMPANY.socials.whatsapp, Icon: FaWhatsapp },
];

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {socialLinks.map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:bg-[#E10600] hover:border-[#FF2A2A] hover:text-white hover:scale-110 flex items-center justify-center transition-all duration-200"
      >
        <Icon aria-hidden="true" size={16} />
      </a>
    ))}
  </div>
);
