import { INDIGO_WALK_BRANDS, type ProjectBrand } from './content';

export const CONTACT_WHATSAPP = 'https://wa.me/923219959990';

export interface UpcomingProject {
  id: string;
  title: string;
  tagline: string;
  location: string;
  type: string;
  video: string;
  poster: string;
  gallery: { src: string; alt: string }[];
  brands?: ProjectBrand[];
  facts: { label: string; value: string }[];
  details: { heading: string; items: string[] }[];
}

const fallbackProjectVideo = 'https://assets.mixkit.co/videos/preview/mixkit-modern-buildings-in-a-business-district-41477-large.mp4';
export const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    id: 'indigo-walk',
    title: 'Indigo Walk',
    tagline: 'A business address on Defence Road',
    location: 'Opposite Gate No. 2, Sector 2, DHA Rahbar, Defence Road, Lahore',
    type: 'Modern commercial high-rise hub around a central courtyard, for retailers, brands, cafes and investors.',
    video: fallbackProjectVideo,
    poster: '/images/indigo-walk/indigo-walk-retail-boulevard.jpg',
    gallery: [
      { src: '/images/indigo-walk/indigo-walk-retail-boulevard.jpg', alt: 'Indigo Walk open-air retail boulevard at sunset' },
      { src: '/images/indigo-walk/indigo-walk-render-01.jpg', alt: 'Indigo Walk retail frontage render one' },
      { src: '/images/indigo-walk/indigo-walk-render-02.jpg', alt: 'Indigo Walk retail frontage render two' },
      { src: '/images/indigo-walk/indigo-walk-render-03.jpg', alt: 'Indigo Walk cafe and storefront render' },
      { src: '/images/indigo-walk/indigo-walk-storefront.jpg', alt: 'Indigo Walk commercial storefront elevation' },
      { src: '/images/madina-mall/madina-mall-aerial.jpg', alt: 'Aerial development view' },
      { src: '/images/madina-mall/madina-mall-tower.jpg', alt: 'Exterior tower view' },
    ],
    brands: INDIGO_WALK_BRANDS,
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
        heading: 'Utilities',
        items: [
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
];