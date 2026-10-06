/**
 * @file content.ts
 * Centralized constants and data for X Marketing website.
 * Extensible projects array, interactive project pages data, stats, and company info.
 */

import madinaMallImage from '../assets/images/madina_mall_residency_1790698946982.jpg';
import madinaResidencyImage from '../assets/images/madina_residency_suite_1790758590587.jpg';
import manhattanTowerImage from '../assets/images/portfolio_manhattan_tower_1790518732122.jpg';
import miamiPenthouseImage from '../assets/images/portfolio_miami_penthouse_1790518705507.jpg';
import madinahExterior1 from '../assets/images/madinah-mall/madinah-mall-exterior-1.jpg';
import madinahExterior2 from '../assets/images/madinah-mall/madinah-mall-exterior-2.jpg';
import madinahExterior3 from '../assets/images/madinah-mall/madinah-mall-exterior-3.jpg';
import madinahExterior4 from '../assets/images/madinah-mall/madinah-mall-exterior-4.jpg';
import madinahGroundFloorPlan from '../assets/images/madinah-mall/madinah-mall-ground-floor-plan.jpg';
import madinahFirstFloorPlan from '../assets/images/madinah-mall/madinah-mall-first-floor-plan.jpg';
import madinaMallExteriorRender from '../assets/images/madinah-mall/madina-mall-exterior-render.jpg';
import madinaMallSitePlan from '../assets/images/madinah-mall/madina-mall-site-plan.jpg';
import madinaMallGroundFloorPlan1 from '../assets/images/madinah-mall/madina-mall-ground-floor-plan-1.jpg';
import madinaMallGroundFloorPlan2 from '../assets/images/madinah-mall/madina-mall-ground-floor-plan-2.jpg';
import madinaMallGroundFloorPlan3 from '../assets/images/madinah-mall/madina-mall-ground-floor-plan-3.jpg';
import madinaMallFirstFloorPlan1 from '../assets/images/madinah-mall/madina-mall-first-floor-plan-1.jpg';
import madinaMallFirstFloorPlan2 from '../assets/images/madinah-mall/madina-mall-first-floor-plan-2.jpg';
import madinaMallFirstFloorPlan3 from '../assets/images/madinah-mall/madina-mall-first-floor-plan-3.jpg';
import madinaMallSecondFloorPlan1 from '../assets/images/madinah-mall/madina-mall-second-floor-plan-1.jpg';
import madinaMallSecondFloorPlan2 from '../assets/images/madinah-mall/madina-mall-second-floor-plan-2.jpg';
import madinaMallSecondFloorPlan3 from '../assets/images/madinah-mall/madina-mall-second-floor-plan-3.jpg';
import madinaMallApartmentFloorPlan1 from '../assets/images/madinah-mall/madina-mall-apartment-floor-plan-1.jpg';
import madinaMallApartmentFloorPlan2 from '../assets/images/madinah-mall/madina-mall-apartment-floor-plan-2.jpg';
import madinaMallApartmentFloorPlan3 from '../assets/images/madinah-mall/madina-mall-apartment-floor-plan-3.jpg';
import indigoWalkImage from '../assets/images/indigo_walk_commercial_1790698931457.jpg';
import indigoAtriumImage from '../assets/images/indigo_walk_atrium_1790758568890.jpg';

export const COMPANY = {
  name: 'X Marketing',
  tagline: 'Real Estate Marketing That Sells',
  subtitle: 'From the right project to the right investor. We turn leads into confirmed bookings.',
  location: 'Lahore, Pakistan',
  address: 'Indigo Walk Corporate Office, Gate #2, Defence Rd, opp. DHA Rahber, National Police Foundation Housing Society, Muhafiz Town Phase 2, Muhafiz Town, Lahore',
  addressUrl: 'https://www.google.com/search?sca_esv=0bdd03951d38706d&sxsrf=APpeQnvnGXHUkMUhtLIbxkVIcYEYOPypkA:1791205944382&q=indigo+walk+-+a+premium+commercial+hub+lahore+address&ludocid=8687863664850442317&sa=X&sqi=2&ved=2ahUKEwjd4KKQ-qKXAxXjXqQEHe3TG24Q6BN6BAgjEAI',
  phoneDisplay: '+923399999656',
  phoneRaw: '923399999656',
  whatsappDisplay: '+92 321 9959990',
  whatsappRaw: '923219959990',
  whatsappUrl: 'https://wa.me/923219959990',
  email: 'info@xmarketingofficial.com',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61594671850030',
    instagram: 'https://www.instagram.com/_xmarketingofficial/',
    linkedin: 'https://www.linkedin.com/company/145269210/',
    whatsapp: 'https://wa.me/923219959990',
  },
};

export const TICKER_ITEMS = [
  'Verified Projects',
  'Curated Opportunities',
  'Dedicated Support',
  'Overseas Pakistani Desk',
  'Site Visits Arranged',
];

export interface ProjectGalleryItem {
  url: string;
  title: string;
  caption: string;
  width?: number;
  height?: number;
}

export interface ProjectFloorPlanGroup {
  id: string;
  label: string;
  images: ProjectGalleryItem[];
}

export interface ProjectRealPhoto extends ProjectGalleryItem {
  width: number;
  height: number;
}

export interface ProjectBrand {
  name: string;
  logo?: string;
}

export const INDIGO_WALK_BRANDS: ProjectBrand[] = [
  { name: 'UBL Bank' },
  { name: 'Jalal Sons' },
  { name: 'Ice Cream & Sweets' },
];

export interface ProjectChapter {
  number: string;
  title: string;
  subtitle: string;
  content: string;
  highlights?: string[];
}

export interface ProjectFAQ {
  question: string;
  answer: string;
}

export interface ProjectKeyFacts {
  location: string;
  unitTypes: string;
  completion: string;
  approvalStatus: string;
}

export interface ProjectLocationDetails {
  address: string;
  area: string;
  proximityHighlights: Array<{ label: string; time: string }>;
  mapEmbedNote: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: 'Commercial' | 'Mixed-Use' | 'Residential';
  location: string;
  landmark: string;
  units: string;
  image: string;
  heroImage: string;
  description: string;
  highlights: string[];
  status: 'Pre-Launch' | 'Under Fast Construction' | 'Ready for Possession';
  keyFacts: ProjectKeyFacts;
  gallery: ProjectGalleryItem[];
  sitePlan?: ProjectGalleryItem[];
  realPhotos?: ProjectRealPhoto[];
  brands?: ProjectBrand[];
  floorPlans?: ProjectGalleryItem[];
  floorPlanGroups?: ProjectFloorPlanGroup[];
  locationDetails: ProjectLocationDetails;
  chapters: ProjectChapter[];
  faqs: ProjectFAQ[];
}

const PROJECT_DATA: Project[] = [
  {
    id: 'indigo-walk',
    name: 'Indigo Walk',
    tagline: 'Flagship Commercial Boulevard Opposite DHA Rahbar',
    category: 'Commercial',
    location: 'Defence Road, Lahore',
    landmark: 'Opposite DHA Rahbar Gate 2',
    units: '4, 6 & 8 Marla Commercial Outlets & Executive Corporate Floors',
    image: indigoWalkImage,
    heroImage: indigoWalkImage,
    description:
      'A master-crafted commercial promenade situated directly along the bustling Defence Road growth corridor. Built with monumental double-height glass facades, high footfall visibility, and basement parking for 250+ vehicles, Indigo Walk sets a new gold standard for commercial appreciation in Lahore.',
    highlights: [
      'High footfall commercial corridor opposite DHA Rahbar Gate 2',
      'Dedicated basement parking for 250+ vehicles',
      'High-speed commercial elevators & 100% power backup',
      'Estimated 12-14% annual rental yield potential',
    ],
    status: 'Pre-Launch',
    keyFacts: {
      location: 'Defence Road (Facing DHA Rahbar Gate 2), Lahore',
      unitTypes: 'Ground & Upper Retail Outlets, Corporate Executive Floors',
      completion: 'Q4 2027 (On Schedule)',
      approvalStatus: 'Fully Approved & Regulated Commercial Mandate',
    },
    gallery: [
      {
        url: indigoWalkImage,
        title: 'Exterior Architectural Perspective',
        caption: 'Monumental street-facing frontage designed for maximum commercial brand visibility.',
      },
      {
        url: indigoAtriumImage,
        title: 'Double-Height Retail Atrium',
        caption: 'Luminous pedestrian promenade engineered for premium international and national retail brands.',
      },
      {
        url: manhattanTowerImage,
        title: 'Executive Corporate Tower',
        caption: 'Refined corporate office floor plates featuring acoustic glass and private service cores.',
      },
      {
        url: miamiPenthouseImage,
        title: 'Rooftop Terrace & Hospitality Deck',
        caption: 'Panoramic open-air dining terrace with skyline views along Defence Road.',
      },
    ],
    realPhotos: [],
    brands: INDIGO_WALK_BRANDS,
    locationDetails: {
      address: 'Main Defence Road, Facing DHA Rahbar Gate 2, Lahore, Punjab',
      area: 'South Lahore Commercial Growth Corridor',
      proximityHighlights: [
        { label: 'DHA Rahbar Gate 2', time: 'Directly Opposite (0 Min)' },
        { label: 'Lahore Ring Road Interchange', time: '3 Minutes' },
        { label: 'Ferozepur Road & Metro Bus', time: '5 Minutes' },
        { label: 'Allama Iqbal International Airport', time: '18 Minutes via Ring Road' },
        { label: 'DHA Phase 5 & 6', time: '12 Minutes' },
      ],
      mapEmbedNote: 'Situated at the junction of high-density residential gated societies with an immediate catchment area of over 180,000 residents.',
    },
    chapters: [
      {
        number: 'Chapter I',
        title: 'Strategic Geography & Unrivaled Catchment',
        subtitle: 'The Arterial Lifeline of South Lahore',
        content:
          'Location dictates retail success. Situated directly opposite DHA Rahbar Gate 2 on Defence Road, Indigo Walk intercepts continuous commuter traffic connecting Ferozepur Road, Lake City, and Raiwind. Surrounded by high-net-worth gated enclaves, the development provides retailers with an affluent, captive consumer base from Day One.',
        highlights: [
          'Direct road access with 120-foot wide frontage',
          'Zero bottlenecks with dedicated underground parking',
          'Immediate neighborhood captive spending power',
        ],
      },
      {
        number: 'Chapter II',
        title: 'Architectural Grandeur & Tenant-First Design',
        subtitle: 'Engineered for Global Retail Standards',
        content:
          'Indigo Walk abandons outdated mall layouts in favor of an expansive European-style open boulevard. Featuring 18-foot ceiling clearances, floor-to-ceiling Low-E glass glazing, dedicated loading docks, and 24/7 dual generator backups, every square foot is optimized for commercial profitability.',
        highlights: [
          'Double-height ground floor retail showrooms',
          'Triple high-speed Otis elevators & cargo lift',
          'Smart building BMS with fiber-optic connectivity',
        ],
      },
      {
        number: 'Chapter III',
        title: 'Capital Appreciation & Projected Rental Yields',
        subtitle: 'Institutional Cash Flow for Smart Capital',
        content:
          'Commercial assets on active arterial roads in Lahore consistently outperform residential real estate in inflationary cycles. Indigo Walk is positioned for growth as surrounding infrastructure nears full occupancy, paired with projected net yields between 12% and 14% upon handover.',
        highlights: [
          'Pre-leased retail partnerships with leading brands',
          'Transparent, milestone-linked construction schedule',
          'Secondary market resale assistance by X Marketing',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the project legally vetted and approved?',
        answer:
          'Yes. Indigo Walk has completed comprehensive regulatory due diligence, including all local authority NOCs and title verification vetted directly through X Marketing’s legal compliance team.',
      },
      {
        question: 'Can overseas Pakistanis purchase without physical presence?',
        answer:
          'Yes. Our Overseas Pakistani Desk coordinates seamless digital verification, remote power-of-attorney execution, and official physical allotment document courier to your international address.',
      },
      {
        question: 'When is possession scheduled?',
        answer:
          'Civil works are progressing on schedule with structural completion targeted for mid-2026 and final handover in Q4 2027.',
      },
    ],
  },
  {
    id: 'madina-mall-residency',
    name: 'Madina Mall & Residency',
    tagline: 'Iconic Mixed-Use Atrium Mall & Serviced Residences',
    category: 'Mixed-Use',
    location: 'Bahria Orchard, Lahore',
    landmark: 'Main Boulevard, Phase 1, Bahria Orchard',
    units: '1 & 2 Bed Luxury Serviced Suites & Multi-Level Retail Outlets',
    image: madinaMallImage,
    heroImage: madinaMallImage,
    description:
      'A master-planned mixed-use landmark positioned at the entrance of Bahria Orchard Lahore. Combining a multi-story branded fashion and dining atrium with high-ceiling luxury serviced residences, Madina Mall & Residency redefines modern urban living in Lahore’s greenest community.',
    highlights: [
      'Direct frontage on Bahria Orchard Main Boulevard',
      'Modern glass atrium with multi-level shopping mall',
      'Rooftop swimming pool, gymnasium & residents executive lounge',
      'Rapidly appreciating neighborhood with high rental demand',
    ],
    status: 'Under Fast Construction',
    keyFacts: {
      location: 'Main Boulevard, Phase 1, Bahria Orchard, Lahore',
      unitTypes: '1 & 2 Bedroom Luxury Residences, Commercial Brand Outlets',
      completion: 'Q2 2027 (Under Active Construction)',
      approvalStatus: 'Bahria Approved Master Plan with Clear Registry',
    },
    gallery: [
      {
        url: madinahExterior1,
        title: 'Madinah Mall exterior front view at sunset',
        caption: 'Front elevation of Madinah Mall & Residency at sunset.',
        width: 1211,
        height: 768,
      },
      {
        url: madinahExterior2,
        title: 'Madinah Mall angled exterior view at sunset',
        caption: 'Angled corner view of the illuminated Madinah Mall facade.',
        width: 1211,
        height: 768,
      },
      {
        url: madinahExterior3,
        title: 'Madinah Mall side exterior view at sunset',
        caption: 'Side view of Madinah Mall & Residency in the evening light.',
        width: 1238,
        height: 768,
      },
      {
        url: madinahExterior4,
        title: 'Madinah Mall close front exterior view at sunset',
        caption: 'Closer front view highlighting the building entrance and retail frontage.',
        width: 1211,
        height: 768,
      },
      {
        url: madinaMallExteriorRender,
        title: 'Madinah Mall exterior render',
        caption: 'Exterior render of Madinah Mall & Residency.',
        width: 2600,
        height: 2072,
      },
    ],
    sitePlan: [
      {
        url: madinaMallSitePlan,
        title: 'Madinah Mall site plan',
        caption: 'Site plan showing the layout of Madinah Mall & Residency.',
        width: 2600,
        height: 2072,
      },
    ],
    realPhotos: [],
    floorPlanGroups: [
      {
        id: 'ground-floor',
        label: 'Ground Floor',
        images: [
          {
            url: madinahGroundFloorPlan,
            title: 'Madinah Mall ground floor plan, existing 2D layout',
            caption: 'Ground Floor - Existing 2D Plan',
            width: 1151,
            height: 768,
          },
          ...[madinaMallGroundFloorPlan1, madinaMallGroundFloorPlan2, madinaMallGroundFloorPlan3].map(
            (url, index) => ({
              url,
              title: `Madinah Mall ground floor plan, view ${index + 1}`,
              caption: `Ground Floor - View ${index + 1}`,
              width: 2600,
              height: 2077,
            })
          ),
        ],
      },
      {
        id: 'first-floor',
        label: 'First Floor',
        images: [
          {
            url: madinahFirstFloorPlan,
            title: 'Madinah Mall first floor plan, existing 2D layout',
            caption: 'First Floor - Existing 2D Plan',
            width: 1151,
            height: 768,
          },
          ...[madinaMallFirstFloorPlan1, madinaMallFirstFloorPlan2, madinaMallFirstFloorPlan3].map(
            (url, index) => ({
              url,
              title: `Madinah Mall first floor plan, view ${index + 1}`,
              caption: `First Floor - View ${index + 1}`,
              width: 2600,
              height: 2077,
            })
          ),
        ],
      },
      {
        id: 'second-floor',
        label: 'Second Floor',
        images: [madinaMallSecondFloorPlan1, madinaMallSecondFloorPlan2, madinaMallSecondFloorPlan3].map(
          (url, index) => ({
            url,
            title: `Madinah Mall second floor plan, view ${index + 1}`,
            caption: `Second Floor - View ${index + 1}`,
            width: 2600,
            height: 2077,
          })
        ),
      },
      {
        id: 'apartment-floors',
        label: 'Apartment Floors',
        images: [madinaMallApartmentFloorPlan1, madinaMallApartmentFloorPlan2, madinaMallApartmentFloorPlan3].map(
          (url, index) => ({
            url,
            title: `Madinah Mall apartment floor plan, view ${index + 1}`,
            caption: `Apartment Floors - View ${index + 1}`,
            width: 2600,
            height: 2077,
          })
        ),
      },
    ],
    locationDetails: {
      address: 'Main Boulevard, Gate 1, Bahria Orchard, Raiwind Road, Lahore',
      area: 'Bahria Orchard Luxury Living Enclave',
      proximityHighlights: [
        { label: 'Raiwind Road Main Artery', time: 'Direct Access (0 Min)' },
        { label: 'Lake City Lahore', time: '4 Minutes' },
        { label: 'Ring Road Interchange', time: '6 Minutes' },
        { label: 'Shaukat Khanum Memorial Hospital', time: '14 Minutes' },
        { label: 'Gulberg & M.M. Alam Road', time: '22 Minutes via Ring Road' },
      ],
      mapEmbedNote: 'Ideally positioned inside Bahria Orchard’s gated sanctuary, enjoying continuous 24/7 security, lush parks, and self-contained golf course infrastructure.',
    },
    chapters: [
      {
        number: 'Chapter I',
        title: 'Prime Main Boulevard Foothold',
        subtitle: 'Living Inside Lahore’s Most Peaceful Township',
        content:
          'Bahria Orchard represents the pinnacle of planned suburban peace in Lahore. Madina Mall & Residency commands the primary Main Boulevard location right inside Phase 1. Residents enjoy the serenity of manicured golf fairways and hospital connectivity while having world-class retail and dining at their doorstep.',
        highlights: [
          'Immediate entry point with zero transit friction',
          'Surrounded by fully inhabited residential sectors',
          'Underground utilities and 24/7 uninterrupted power',
        ],
      },
      {
        number: 'Chapter II',
        title: 'Curated Amenities for High-Yield Hospitality',
        subtitle: 'Hotel-Grade Serviced Living Experience',
        content:
          'From a grand double-height entrance lobby with 24-hour concierge to the rooftop infinity pool, wellness gym, and high-speed keyless access, Madina Mall & Residency is architected specifically for hands-off rental investors seeking long-term corporate tenants and short-stay executive leases.',
        highlights: [
          'Rooftop heated swimming pool & solarium',
          'Residents private cinema & executive co-working club',
          'Professional on-site facility & housekeeping management',
        ],
      },
      {
        number: 'Chapter III',
        title: 'Connected Retail & Serviced Living',
        subtitle: 'Everyday Amenities for Residents',
        content:
          'The development brings together serviced residences, multi-level retail outlets, dining, and rooftop leisure amenities. Residents can enjoy a swimming pool, wellness gym, private cinema, executive co-working club, and on-site housekeeping management.',
        highlights: [
          'Studio, 1-bedroom, and 2-bedroom residence options',
          'Multi-level branded retail outlets and dining spaces',
          'Rooftop leisure amenities and residents lounge',
        ],
      },
    ],
    faqs: [
      {
        question: 'What types of apartments are available?',
        answer:
          'The project offers thoughtfully designed Studio apartments, 1-Bedroom luxury suites, and 2-Bedroom family residences, all with private balconies and scenic views.',
      },
      {
        question: 'Can X Marketing assist with leasing out my unit after handover?',
        answer:
          'Absolutely. Our dedicated Asset Management team provides complete tenant placement, rental collection, and maintenance management for overseas and local owners.',
      },
    ],
  },
];

export const FEATURED_PROJECTS = PROJECT_DATA.filter(
  (project) => project.id === 'madina-mall-residency'
);

// 2) ANIMATED COUNTERS EXACTLY AS REQUESTED:
// Projects Marketed, Happy Investors, Years of Experience, Cities Covered
export const STATS = [
  { value: 24, suffix: '+', label: 'Projects Marketed', desc: 'Commercial & High-End Residential' },
  { value: 3850, suffix: '+', label: 'Happy Investors', desc: 'Domestic & Overseas Pakistani Clients' },
  { value: 12, suffix: '+', label: 'Years of Experience', desc: 'Excellence in Lahore Real Estate' },
  { value: 6, suffix: '', label: 'Cities Covered', desc: 'Lahore, Islamabad, Rawalpindi & Overseas Desks' },
];

export const WHY_CHOOSE_US = [
  {
    icon: 'ShieldCheck',
    title: 'Verified Projects',
    description:
      'Every project in our portfolio undergoes rigorous legal due diligence, LDA/CDA regulatory checks, and developer track record audits. We only represent developments we would personally invest in.',
    tag: '100% Legal Due Diligence',
  },
  {
    icon: 'FileCheck',
    title: 'Transparent Process',
    description:
      'Verified project documentation and clear communication throughout your purchase journey. You receive official allotment documents directly.',
    tag: 'Clear Documentation',
  },
  {
    icon: 'Headphones',
    title: 'Dedicated Support',
    description:
      'From chauffeured on-ground site visits in Lahore to overseas power-of-attorney documentation and resale advisory, our dedicated relationship managers support you every step of the journey.',
    tag: 'Lifetime Investor Care',
  },
];

export const HOW_WE_WORK = [
  {
    step: '01',
    title: 'We Listen First',
    subtitle: 'Understanding Your Capital Goals',
    description:
      'Whether you are an overseas Pakistani seeking safe high-yield rental returns or a local investor looking for rapid capital appreciation, we listen first to your priorities, investment horizon, and preferred property type.',
  },
  {
    step: '02',
    title: 'Right Project, Right Client',
    subtitle: 'Curated Asset Matching',
    description:
      'We do not push generic inventory. We match your specific investment profile with pre-vetted commercial units, luxury apartments, or corporate floors in Lahore’s fastest appreciating nodes.',
  },
  {
    step: '03',
    title: 'Guided Through Handover & Beyond',
    subtitle: 'Flawless Execution to Handover',
    description:
      'From organizing VIP site tours and verifying project documents to allotment transfer letters and after-sales rental yield management, X Marketing stays by your side throughout the investment lifecycle.',
  },
];

export const SERVICES = [
  {
    icon: 'Building',
    title: 'Property Sales',
    description:
      'High-velocity inventory liquidation for master developers and selective unit acquisition for discerning private investors across commercial and residential sectors.',
  },
  {
    icon: 'TrendingUp',
    title: 'Investment Advisory',
    description:
      'Data-driven capital allocation strategies analyzing rental yield forecasts, infrastructural expansion (Ring Road, Defence Road), and macro-economic real estate trends.',
  },
  {
    icon: 'Megaphone',
    title: 'Project Marketing',
    description:
      'End-to-end 360° marketing campaigns from launch strategy, architectural renders, and 3D walkthroughs to physical sales gallery setup and launch events.',
  },
  {
    icon: 'Target',
    title: 'Meta Ads & Lead Generation',
    description:
      'High-intent algorithmic lead acquisition targeting verified high-net-worth investors across Pakistan, the Middle East, UK, and North America with strict qualification filters.',
  },
  {
    icon: 'Globe',
    title: 'Overseas Pakistani Desk',
    description:
      'Specialized liaison desk for expatriates in the UK, UAE, USA, and Saudi Arabia. Offering remote virtual tours, direct WhatsApp support, and legal POA assistance.',
  },
  {
    icon: 'Compass',
    title: 'Guided Site Visits',
    description:
      'Complimentary chauffeured property tours in Lahore with experienced investment advisors who provide honest comparative market analysis on-site.',
  },
  {
    icon: 'FileText',
    title: 'Purchase & Documentation',
    description:
      'Complete handling of official verification, allotment letters, and transfer documentation with complete peace of mind.',
  },
  {
    icon: 'LifeBuoy',
    title: 'After-Sales Support',
    description:
      'Our relationship continues after handover. We assist with secondary market resale, tenant placement, and asset rental yield management.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Chaudhry Kamran Akram',
    designation: 'Overseas Pakistani Investor',
    location: 'London, United Kingdom',
    rating: 5,
    quote:
      'Being based in London, investing in Lahore always felt risky with unreliable agents. X Marketing completely changed my experience with Indigo Walk on Defence Road. Everything from virtual tours to official allotment papers was handled with absolute transparency.',
    project: 'Invested in Indigo Walk Commercial',
  },
  {
    id: 2,
    name: 'Dr. Tariq Mahmood',
    designation: 'Senior Consultant Physician',
    location: 'DHA Phase 5, Lahore',
    rating: 5,
    quote:
      'X Marketing took the time to understand my priorities and recommended Madina Mall & Residency in Bahria Orchard. Their guidance was clear, and the construction pace is phenomenal.',
    project: 'Invested in Madina Mall & Residency',
  },
  {
    id: 3,
    name: 'Naveed Akhtar Malik',
    designation: 'Textile Industry Executive',
    location: 'Gulberg III, Lahore',
    rating: 5,
    quote:
      'The speed and professionalism of the X Marketing team is unmatched in Pakistan. They helped us secure our corporate office in record time. Highly recommended for any serious real estate investor.',
    project: 'Commercial Portfolio Investor',
  },
];
