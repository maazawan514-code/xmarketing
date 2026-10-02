import executiveMallImage from '../assets/images/madina_mall_residency_1790698946982.jpg';
import executiveApartmentImage from '../assets/images/madina_residency_suite_1790758590587.jpg';
import indigoWalkImage from '../assets/images/indigo_walk_commercial_1790698931457.jpg';
import indigoAtriumImage from '../assets/images/indigo_walk_atrium_1790758568890.jpg';

export const CONTACT_WHATSAPP = 'https://wa.me/REPLACE_WITH_X_MARKETING_NUMBER';

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

export const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    id: 'executive-grand-mall',
    title: 'Executive Grand Mall',
    tagline: 'A perfect blend of home & business opportunity',
    location: 'Al Kabir Downtown, Main Raiwind Road, Lahore',
    type: 'Mixed-use high-rise: shops, offices, co-working and luxury apartments, 9 floors plus rooftop.',
    video: '/videos/project1.mp4',
    poster: executiveMallImage,
    gallery: [
      { src: executiveMallImage, alt: 'Commercial development impression' },
      { src: executiveApartmentImage, alt: 'Apartment interior impression' },
    ],
    facts: [
      { label: 'Payment period', value: '4 years' },
      { label: 'Possession', value: '3 years' },
      { label: 'Booking starts', value: '20% down payment' },
      { label: 'Building', value: '9 floors plus rooftop' },
    ],
    details: [
      {
        heading: 'Payment plan',
        items: [
          '20% down payment; booking starts from 20%.',
          '10% on confirmation and 10% at grey structure.',
          '0.5% monthly installments, 2% bi-annual, and 20% on possession.',
        ],
      },
      {
        heading: 'Floor directory',
        items: [
          'Basement, IT Bazar: shops and kiosks, 93-303 sq ft; Rs 23,000-25,000 per sq ft.',
          'Ground floor, Brand Outlet: shops 554-590 sq ft, kiosks 107 sq ft; Rs 45,000-65,000 per sq ft; 8 ft arcade.',
          'First floor, Fashion & Design: shops 338-473 sq ft, kiosks 98-143 sq ft; Rs 30,000-33,000 per sq ft.',
          '2nd & 3rd floors, Co-working & Offices: 80-486 sq ft; Rs 26,000-28,000 per sq ft.',
          '4th to 9th floors, luxury apartments: studio 309-335 sq ft (Rs 15,500/sq ft); 1-bed 432-616 sq ft (Rs 15,500-17,000/sq ft); 2-bed 679-978 sq ft (Rs 17,000/sq ft). Each includes an attached bath, living area and kitchen.',
        ],
      },
      {
        heading: 'Amenities',
        items: [
          '20+ amenities, including a rooftop garden, 24/7 security and surveillance, carpeted road networks, keyless entry, high-speed lifts, uninterrupted utilities, and a central atrium with waterfall.',
          'Rooftop: sky lounge, outdoor dining, viewing deck, landscaped terrace, family seating, event space, and panoramic city views.',
          'Swimming pool, padel court, fitness area, billiards, and live BBQ area as per plan.',
        ],
      },
      {
        heading: 'Connectivity',
        items: [
          'Lahore Ring Road: 2-3 min; Allama Iqbal Airport: 20-28 min; Motorway: 15-20 min.',
          'Bahria Town: 10 min; Lake City: 5 min.',
          'Near BNU, UOL, Riphah Raiwind campus, and healthcare facilities.',
        ],
      },
    ],
  },
  {
    id: 'indigo-walk',
    title: 'Indigo Walk',
    tagline: 'A business address on Defence Road',
    location: 'Opposite Gate No. 2, Sector 2, DHA Rahbar, Defence Road, Lahore',
    type: 'Modern commercial high-rise hub around a central courtyard, for retailers, brands, cafes and investors.',
    video: '/videos/project2.mp4',
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
];