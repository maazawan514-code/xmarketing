/**
 * ============================================================================
 * BRAND CONFIGURATION & MASTER CONTENT OBJECT
 * ============================================================================
 * Edit your project details, developer name, location, and copy right here.
 * All texts, labels, images, and milestones automatically update across the site.
 */

export interface BrandConfig {
  projectName: string;
  shortName: string;
  developerName: string;
  location: string;
  elevation: string;
  tagline: string;
  positioningStatement: string;
  publicReleaseMonth: string;
  contactPhone: string;
  contactEmail: string;
  legalDisclaimer: string;
  copyrightYear: number;
}

export const BRAND: BrandConfig = {
  // Brand placeholders — effortlessly editable:
  projectName: 'THE AURELIA RESIDENCES & APARTMENT-HOTEL', // [PROJECT NAME]
  shortName: 'THE AURELIA',
  developerName: 'KINGSFORD & VALE HERITAGE DEVELOPMENTS', // [DEVELOPER NAME]
  location: 'ST. MORITZ RIDGEWAY, SWITZERLAND', // [LOCATION]
  elevation: 'ELEVATION 1,822M', // [ELEVATION]
  tagline: 'Slower days. Deeper breaths. Above the timberline.', // [TAGLINE]
  positioningStatement: 'An intimate collection of 64 private residences and penthouses enveloped by virgin alpine forest',
  publicReleaseMonth: 'OCTOBER',
  contactPhone: '+41 81 837 5000',
  contactEmail: 'concierge@theaurelia-residences.com',
  legalDisclaimer:
    'Prices, specifications, rental yields, floor plans and architectural renderings are indicative and subject to change without notice. Registration of interest does not constitute an offer, reservation or legal contract. Fully managed hotel returns depend on seasonal occupancy and market conditions.',
  copyrightYear: 2026,
};

// 3. INTRO SECTION CONTENT
export const INTRO_CONTENT = {
  label: 'The Project',
  headingLine1: 'Slower days.',
  headingLine2: 'Deeper breaths.',
  paragraph1:
    'Carved into the sun-drenched granite ledge of the St. Moritz ridgeway, The Aurelia is an architectural sanctuary designed for those who measure wealth not in minutes, but in quietude. Here, the scent of stone pine replaces city air, and floor-to-ceiling glass captures the quiet drama of shifting alpine clouds.',
  paragraph2:
    'Operated 365 days a year as a five-star apartment-hotel, every residence pairs the enduring permanence of private freehold ownership with the invisible, effortless service of a world-class grand hotel. When you are away, your residence is seamlessly managed and monetized within our global hospitality portfolio.',
  stats: [
    { value: 1822, suffix: 'm', label: 'Elevation', desc: 'Above sea level on pristine ridge' },
    { value: 64, suffix: '', label: 'Private Residences', desc: 'From studios to sky penthouses' },
    { value: 365, suffix: '', label: 'Days Operated', desc: 'Year-round five-star hotel management' },
    { value: 4, suffix: '', label: 'Thermal Spas', desc: 'Geothermally heated outdoor baths' },
  ],
};

// 4. TICKER SELLING POINTS
export const MARQUEE_ITEMS = [
  '10% To Book',
  '1% Monthly',
  'Public Release This October',
  '365 Days Managed Hotel Operation',
  'Freehold Alpine Title Deeds',
  'Private Heated Plunge Pools',
  'Michelin-Inspired Hearth Restaurant',
  'Full Concierge & Valet Service',
  'Ski-In / Ski-Out Access',
];

// 5. LOCATION FEATURE CONTENT
export const LOCATION_CONTENT = {
  eyebrow: 'The Location',
  heading: 'The only address on the main ridgeway.',
  description:
    'Positioned on the highest permitted building plateau along the Engadin crest, The Aurelia enjoys unencumbered 360-degree vistas across frozen lakes, pine valleys, and snow-crested peaks. While just four minutes from the village funicular and private aviation hub, the estate feels entirely detached from the world below.',
  mainImage:
    'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1920&q=85',
  mosaicImages: [
    {
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      caption: 'The Alpine Plateau',
    },
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      caption: 'Refined Granite & Timber Architecture',
    },
    {
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      caption: 'Thermal Sanctuary Terrace',
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      caption: 'Sunset Over St. Moritz Valley',
    },
  ],
  timeline: [
    {
      time: '07:00',
      label: 'First Light',
      text: 'Mist rises from the frozen valley floor as dawn turns the snow peaks pale rose; steam rolls across your private balcony hot tub.',
    },
    {
      time: '13:00',
      label: 'Midday',
      text: 'Fresh powder skiing down direct private trails, followed by dry-aged wagyu and truffled polenta by the terrace fireplace.',
    },
    {
      time: '18:30',
      label: 'Golden Hour',
      text: 'A glass of biodynamic pinot noir as the sky shifts through amber and indigo, reflected in the heated outdoor infinity pool.',
    },
    {
      time: '22:00',
      label: 'Nightfall',
      text: 'Silence so deep you can hear the pine branches settle; fire crackles softly in the stone hearth under a cathedral of stars.',
    },
  ],
};

// 6. RESIDENCES CONTENT
export interface ResidenceCard {
  id: string;
  name: string;
  tag: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  image: string;
  description: string;
  features: string[];
}

export const RESIDENCES_CONTENT: {
  eyebrow: string;
  heading: string;
  intro: string;
  cards: ResidenceCard[];
  crownFeature: {
    eyebrow: string;
    heading: string;
    subheading: string;
    description: string;
    features: string[];
    image: string;
  };
} = {
  eyebrow: 'The Residences',
  heading: 'From studios to penthouses.',
  intro:
    'Every home is rendered in tactile, honest materials: rough-hewn Valser quartzite, hand-brushed smoked oak, burnished brass, and cashmere textiles. Fully furnished to five-star hotel standards with custom Italian cabinetry.',
  cards: [
    {
      id: 'studio',
      name: 'The Alpine Studio',
      tag: 'Forest View',
      area: '52 m² / 560 sq ft',
      bedrooms: 'Studio Suite',
      bathrooms: '1 Spa Bath',
      image:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85',
      description:
        'An exquisitely proportioned pied-à-terre featuring a sunken stone hearth, bespoke bar armoire, and sliding glass wall opening to a sheltered pine terrace.',
      features: ['Private stone soaking tub', 'Integrated Gaggenau kitchenette', 'Heated oak floors'],
    },
    {
      id: '1-bed',
      name: 'The 1-Bedroom Residence',
      tag: 'Valley Panorama',
      area: '88 m² / 947 sq ft',
      bedrooms: '1 Master Bedroom',
      bathrooms: '1.5 Bathrooms',
      image:
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=85',
      description:
        'Dual-exposure living room with dual-sided gas fireplace, walk-through dressing suite, and expansive outdoor terrace overlooking the frozen lake.',
      features: ['Dual-aspect corner glass', 'Walk-in bespoke dressing room', 'Dedicated ski locker'],
    },
    {
      id: '2-bed',
      name: 'The 2-Bedroom Chalet Suite',
      tag: 'Peak Panorama',
      area: '142 m² / 1,528 sq ft',
      bedrooms: '2 Ensuite Bedrooms',
      bathrooms: '2.5 Bathrooms',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
      description:
        'The ideal family layout with separate guest suite, eight-person solid oak dining table, private sauna, and deep terrace with integrated barbecue hearth.',
      features: ['Private cedarwood sauna', 'Wrap-around panoramic terrace', 'Chef’s island kitchen'],
    },
    {
      id: '3-bed',
      name: 'The 3-Bedroom Estate Suite',
      tag: 'Glacier Vistas',
      area: '215 m² / 2,314 sq ft',
      bedrooms: '3 Ensuite Bedrooms',
      bathrooms: '3.5 Bathrooms',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
      description:
        'Grand salon with 3.4-meter ceiling heights, private elevator foyer, secondary service entrance, and master suite occupying its own secluded wing.',
      features: ['Direct private elevator entry', 'Separate staff entrance', 'Wine tasting cellar room'],
    },
    {
      id: 'duplex',
      name: 'The Duplex Sky Villa',
      tag: 'Double Height',
      area: '280 m² / 3,014 sq ft',
      bedrooms: '3 Bedrooms + Study',
      bathrooms: '4 Bathrooms',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
      description:
        'Soaring two-story cathedral glass frame framing the southern sky, cantilevered sculptural steel staircase, and upper-level private library mezzanine.',
      features: ['6.2m cathedral ceilings', 'Private sky library lounge', 'Outdoor heated dining loggia'],
    },
    {
      id: 'penthouse-estate',
      name: 'The Crest Penthouse',
      tag: 'Crown Jewel',
      area: '390 m² / 4,198 sq ft',
      bedrooms: '4 Ensuite Bedrooms',
      bathrooms: '5 Bathrooms',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
      description:
        'Occupying the entire top tier of the central ridge pavilion, featuring a rooftop garden, cantilevered infinity plunge pool, and unencumbered 360-degree views.',
      features: ['Private heated plunge pool', 'Rooftop winter garden', 'Dedicated 24/7 private butler'],
    },
  ],
  crownFeature: {
    eyebrow: 'The Crown Collection',
    heading: 'The Sovereign Sky Penthouse.',
    subheading: 'A 420-square-metre private aerie suspended above the clouds.',
    description:
      'Engineered with a heated black-granite infinity plunge pool that cantilevers four meters beyond the building envelope. Floating above the snow line, this crown residence features a dedicated private wellness pavilion, personal sommelier cellar, 360-degree glass walls, and round-the-clock bespoke butler service.',
    features: [
      'Private 8-metre heated cantilevered infinity pool',
      'Direct subterranean double-garage with private lift access',
      'Hand-carved Vals quartzite open hearth fireplace',
      'Exclusive allocation of 2 permanent private ski lockers',
    ],
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1920&q=85',
  },
};

// 7. THE ESTATE / AMENITIES CONTENT
export const ESTATE_CHAPTERS = [
  {
    chapter: 'Chapter I',
    title: 'The Thermal Infinity Pool',
    subtitle: '38°C Geothermal Waters Floating Above The Pines',
    description:
      'Bathe in mineral-rich spring waters heated geothermally to a constant 38°C, while fresh snow settles softly on your shoulders. The pool extends twelve meters into open air, creating the optical illusion of spilling directly into the valley abyss.',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Submerged hydrotherapy jets & ergonomic stone recliners',
      'Continuous ozone filtration with zero chemical chlorine odor',
      'Poolside champagne and herbal broth service',
    ],
  },
  {
    chapter: 'Chapter II',
    title: 'The Alpine Sanctuary & Herbal Spa',
    subtitle: 'Century-Old Swiss Pine & Mountain Salt Therapy',
    description:
      'Conceived as a subterranean sanctuary of calm, our wellness floor combines traditional Finnish dry saunas with bio-herbal steam grottos infused with wild local botanicals harvested from the surrounding valley slopes.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Swiss stone pine sauna overlooking private snow courtyard',
      'Himalayan salt vapor grotto & crushed ice fountain',
      'Four treatment suites with private open-air plunge tubs',
    ],
  },
  {
    chapter: 'Chapter III',
    title: 'The Panorama Skywalk',
    subtitle: 'A Glass-Floored Cantilever into the Alpine Firmament',
    description:
      'Suspended twenty-five meters above the forest canopy, the cantilevered glass skywalk provides an unparalleled vantage point for stargazing and morning meditation. At dusk, heated copper handrails invite quiet contemplation of the setting sun.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Low-iron acoustic structural glass floor panels',
      'Zero-glare night lighting for certified dark-sky astronomy',
      'Private sunrise yoga sessions booked upon request',
    ],
  },
  {
    chapter: 'Chapter IV',
    title: 'Private Forest Meditation Pods',
    subtitle: 'Secluded Timber Cocoons Nestled Among The Larch Trees',
    description:
      'Scattered discreetly along a private heated walking path through the property’s four hectares of ancient larch and pine woods, these intimate cedar pavilions offer heated shearling seating and bespoke acoustic soundscapes.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Wood-burning cast iron stoves with prepared kindling',
      'Dedicated silent zones for reading and digital detox',
      'Direct intercom to the estate tea sommelier',
    ],
  },
  {
    chapter: 'Chapter V',
    title: 'The Hearth Restaurant & Cellar',
    subtitle: 'Zero-Kilometer Alpine Gastronomy by Firelight',
    description:
      'Led by culinary talent with triple Michelin heritage, The Hearth champions wild game, heirloom mountain root vegetables, and artisan cheese aged in subterranean stone vaults. An 8,000-bottle cellar houses rare Swiss, Burgundy, and Piedmont vintages.',
    image:
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Central open firepit and wood-burning rotisserie',
      'Walk-in sommelier tasting room with rare vintage enotecas',
      'In-residence private dining service with dedicated private chef',
    ],
  },
];

export const AMENITIES_TILES = [
  {
    title: 'Technogym Artis Fitness Suite',
    category: 'High Performance',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Sunken Heated Yoga Terrace',
    category: 'Mind & Body',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Grand Timber & Stone Lobby',
    category: 'Arrival Experience',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Fireplace Library & Fumoir',
    category: 'Intimate Lounging',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Organic Botanical Salon',
    category: 'Personal Care',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Executive Private Boardroom',
    category: 'Seamless Business',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
];

export const ALL_AMENITIES_CHECKLIST = [
  '24/7 Multilingual Concierge Desk',
  'Private Heated Ski & Snowboard Lockers with Boot Dryers',
  'Valet Parking with High-Speed EV Superchargers',
  'Complimentary Chauffeured Mercedes Maybach Village Transfers',
  'Full In-Residence Dining & Breakfast Basket Delivery',
  'Daily Housekeeping & Nightly Turndown Ritual',
  'On-Site Ski Equipment Rental & Professional Tuning Workshop',
  'Temperature-Controlled Private Wine Cellar Lockers',
  'Children’s Forest Playground & Mountain Guides Club',
  'Pet Concierge with Heated Grooming Station & Sitting',
  'Helipad Landing Access (6-Minute Flight from Zurich Airport)',
  'High-Speed Symmetrical 10Gb Fiber Optic Across Estate',
];

// 8. GALLERIES CONTENT
export interface GalleryImage {
  url: string;
  title: string;
  caption: string;
}

export const ARCHITECTURE_GALLERY: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
    title: 'The South Facade at Sunset',
    caption: 'Local Valser granite and reclaimed timber designed to patina naturally against alpine winds.',
  },
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    title: 'The Thermal Cantilever Pool',
    caption: 'Uninterrupted water horizons floating 1,822 metres above sea level.',
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    title: 'Arrival Courtyard by Starlight',
    caption: 'Heated granite pavers ensure zero snow accumulation upon guest arrival.',
  },
  {
    url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85',
    title: 'The Morning Mountain Ridge',
    caption: 'Direct ski trail connectivity connecting seamlessly to the St. Moritz slope network.',
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    title: 'Glass Pavilion Lines',
    caption: 'Triple-glazed argon thermal envelopes with floor-to-ceiling panoramic sightlines.',
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    title: 'The Skywalk Overlook',
    caption: 'Cantilevered steel and structural glass floating above old-growth pine trees.',
  },
  {
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    title: 'The Hearth Pavilion Dining',
    caption: 'Monumental central fireplace around which evening culinary rituals unfold.',
  },
  {
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85',
    title: 'Winter Solstice Twilight',
    caption: 'The estate illuminated by warm 2400K ambient architectural lighting.',
  },
];

export const INTERIOR_GALLERY: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    title: 'Grand Living Salon',
    caption: 'Custom linen upholstery, raw travertine cocktail tables, and floor-to-ceiling glass.',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    title: 'Master Bedroom Suite',
    caption: 'Cashmere wall paneling and direct morning sunrise views over the crest.',
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    title: 'Private Soaking Pavilion',
    caption: 'Monolithic freestanding stone bath overlooking snow-laden mountain pines.',
  },
  {
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    title: 'Chef Kitchen & Wine Bar',
    caption: 'Flamed granite countertops paired with concealed Gaggenau 400 Series appliances.',
  },
  {
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    title: 'Alpine Study & Library',
    caption: 'Smoked oak joinery, Italian leather desk, and crackling gas fireplace.',
  },
  {
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
    title: 'Private Dining Loggia',
    caption: 'Seating for ten guests with integrated warming drawers and sommelier station.',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    title: 'Double-Height Penthouse Atrium',
    caption: 'Cathedral ceilings framing dramatic views of alpine clouds and constellations.',
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    title: 'Private In-Suite Wellness Sauna',
    caption: 'Aromatic cedar slats and custom tempered glass wall facing the alpine valley.',
  },
];

// 9. SEASONAL BANNER
export const SEASONAL_CONTENT = {
  eyebrow: 'All-Year Appeal',
  heading: 'Four Seasons High.',
  statValue: '365',
  statLabel: 'Days a year operated',
  description:
    'While winter brings champagne powder snow and ski-in / ski-out access, summer reveals wildflower meadows, high-altitude hiking, crystal-clear sailing on Lake Silvaplana, and crisp 22°C mountain afternoons.',
  image:
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=85',
};

// 10. OWNERSHIP / INCOME SECTION
export const OWNERSHIP_CONTENT = {
  eyebrow: 'The Investment Model',
  heading: 'Own it. Earn from it. Never worry about it.',
  subheading: 'A hands-off asset class delivering lifestyle privilege and institutional yield.',
  image:
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
  bullets: [
    {
      title: 'Fully Managed Hotel Operation',
      description:
        'Your residence is incorporated into our boutique luxury rental pool when you are not in residence. Housekeeping, linen replacement, global booking marketing, and concierge are completely handled.',
    },
    {
      title: 'Unrestricted Private Use with Priority Booking',
      description:
        'Enjoy your home whenever you wish with simple reservation through your private owner portal. Arrive to your personal pantry stocked and your ski gear waiting in your private locker.',
    },
    {
      title: 'Institutional European Tax Efficiencies',
      description:
        'Direct freehold title registered in the Swiss Land Registry (Grundbuch). Designed to optimize inheritance planning, with attractive depreciation and VAT rebate benefits on managed hospitality units.',
    },
  ],
};

// 11. DEVELOPER SECTION
export const DEVELOPER_CONTENT = {
  eyebrow: 'The Custodians',
  heading: 'Built to stand for two hundred winters.',
  founderName: 'Alistair Kingsford-Vale',
  founderTitle: 'Founder & Design Principal, Kingsford & Vale',
  founderPortrait:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
  quote:
    '“True luxury in the modern world is not gold taps or gilded cornices. It is silence. It is massive stone that retains the afternoon warmth. It is knowing that every detail has been anticipated before you even form the thought.”',
  bio:
    'For over three decades, Kingsford & Vale has curated an uncompromising portfolio of heritage restorations, private island retreats, and alpine estates across Switzerland, Austria, and the Scottish Highlands. Our foundational creed is simple: build only what deepens with age, honors the land, and ennobles the human spirit.',
  historyHighlights: [
    '32 years of bespoke European alpine development',
    'Recipient of 4 Prix Versailles Architectural Laureates',
    '100% private equity funded — zero institutional debt pressure',
  ],
};

// 12. REGISTRATION SECTION
export const REGISTRATION_BENEFITS = [
  {
    number: 'I.',
    title: 'First Allocation Priority',
    desc: 'Registered founders receive tier-one selection of residence views, floor levels, and corner penthouses prior to general public release.',
  },
  {
    number: 'II.',
    title: 'Founders’ Early Access',
    desc: 'Access exclusive pre-launch releases, curated residence selections, and complimentary bespoke furniture packages.',
  },
  {
    number: 'III.',
    title: 'Full Architectural Particulars',
    desc: 'Immediate dispatch of the 148-page linen-bound monograph, floor plans, legal prospectus, and invitation to our private London/Zurich salons.',
  },
];
