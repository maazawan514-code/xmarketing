import executiveMallImage from '../assets/images/madina_mall_residency_1790698946982.jpg';
import executiveApartmentImage from '../assets/images/madina_residency_suite_1790758590587.jpg';
import indigoWalkImage from '../assets/images/indigo_walk_commercial_1790698931457.jpg';
import indigoAtriumImage from '../assets/images/indigo_walk_atrium_1790758568890.jpg';

export const CONTACT_WHATSAPP = 'https://wa.me/92321995990';

export interface UpcomingProject {
  id: string;
  title: string;
  tagline: string;
  location: string;
  type: string;
  video: string;
  poster: string;
  gallery: { src: string; alt: string }[];
  facts: { label: string; value: string }[];
  details: { heading: string; items: string[] }[];
}

const fallbackProjectVideo = 'https://assets.mixkit.co/videos/preview/mixkit-modern-buildings-in-a-business-district-41477-large.mp4';
const fallbackProjectVideoTwo = 'https://assets.mixkit.co/videos/preview/mixkit-city-lights-reflected-in-a-window-14859-large.mp4';

export const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    id: 'indigo-walk',
    title: 'Indigo Walk',
    tagline: 'A business address on Defence Road',
    location: 'Opposite Gate No. 2, Sector 2, DHA Rahbar, Defence Road, Lahore',
    type: 'Modern commercial high-rise hub around a central courtyard, for retailers, brands, cafes and investors.',
    video: fallbackProjectVideo,
    poster: indigoWalkImage,
    gallery: [
      { src: indigoWalkImage, alt: 'Indigo Walk commercial impression' },
      { src: indigoAtriumImage, alt: 'Indigo Walk central courtyard impression' },
    ],
    facts: [
      { label: 'Project area', value: '54 Kanal 12 Marla' },
      { label: 'Structure', value: 'Ground floor, mezzanine and store' },
      { label: 'Parking', value: 'Basement parking included' },
      { label: 'Estimated completion', value: 'Approx. 4 years' },
    ],
    details: [
      {
        heading: 'Unit options',
        items: [
          '4 Marla: boutiques, cafes and services.',
          '6 Marla: branded outlets and showrooms.',
          '8 Marla: flagship stores, restaurants and multi-purpose spaces.',
          'Central courtyard.',
        ],
      },
      {
        heading: 'Payment & utilities',
        items: [
          'Installment plan over 3-4 years. Contact X Marketing for latest details on price and payment plan.',
          'WAPDA electricity; own arrangement planned in future.',
          'Metered water. Gas is not available.',
        ],
      },
      {
        heading: 'Surroundings',
        items: ['Pine Avenue, DHA Rahbar, Lake City, Valencia, and Khayaban-e-Amin.'],
      },
    ],
  },
  {
    id: 'madina-mall-residency',
    title: 'Madina Mall & Residency',
    tagline: 'Iconic mixed-use atrium mall and serviced residences',
    location: 'Main Boulevard, Phase 1, Bahria Orchard, Lahore',
    type: 'Mixed-use luxury development combining retail, dining, and serviced residential living in Bahria Orchard.',
    video: fallbackProjectVideoTwo,
    poster: executiveMallImage,
    gallery: [
      { src: executiveMallImage, alt: 'Madina Mall & Residency boulevard impression' },
      { src: executiveApartmentImage, alt: 'Madina Mall & Residency apartment interior impression' },
    ],
    facts: [
      { label: 'Project area', value: 'Main Boulevard frontage' },
      { label: 'Structure', value: 'Retail + serviced residences' },
      { label: 'Parking', value: 'Dedicated access and secure parking' },
      { label: 'Estimated completion', value: 'Under active construction' },
    ],
    details: [
      {
        heading: 'Unit options',
        items: [
          'Luxury 1 & 2 bedroom serviced apartments.',
          'Multi-level branded retail outlets and dining spaces.',
          'Rooftop leisure amenities and resident lounge.',
        ],
      },
      {
        heading: 'Payment & utilities',
        items: [
          '4-year easy installment plan with 15% booking.',
          'High-demand location with rapid occupancy potential.',
          'Ideal for family living and investor yield generation.',
        ],
      },
      {
        heading: 'Surroundings',
        items: ['Bahria Orchard Main Boulevard, golf community setting, and nearby healthcare and lifestyle hubs.'],
      },
    ],
  },
];