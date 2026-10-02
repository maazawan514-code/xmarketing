/**
 * @file logoConfig.ts
 * =====================================================================
 * LOGO CONFIGURATION FOR X MARKETING
 * =====================================================================
 * 
 * Your logo is configured below:
 * - To change or replace your logo, place your file in /public/ (e.g. /public/logo.png or /public/logo.svg)
 *   and set customLogoUrl to that path.
 */

export interface LogoConfig {
  /**
   * Path or URL to the logo image.
   * e.g. '/logo.png', '/logo.svg', or an online image URL.
   */
  customLogoUrl: string;

  /**
   * Set to true to use the custom logo image.
   * If false, falls back to the precision vector X logo.
   */
  useCustomLogo: boolean;

  /**
   * Brand text settings
   */
  brandTitle: string;
  brandSubtitle: string;
}

export const LOGO_CONFIG: LogoConfig = {
  customLogoUrl: '/logo.svg', // Points to your applied logo in public/
  useCustomLogo: true,
  brandTitle: 'X MARKETING',
  brandSubtitle: 'REAL ESTATE - LAHORE',
};
