export interface ProductVariant {
  id: string;
  sku: string;
  label: string;
  shortLabel: string;
  cansCount: number;
  volumeMl: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  stock: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'nutrition-card';
  src?: string;
  alt: string;
  caption: string;
}

export interface Voucher {
  id: string;
  title: string;
  discountAmount: number;
  minSpend: number;
  code: string;
  description: string;
  validUntil: string;
}

export interface DeliverySlot {
  id: string;
  dayLabel: string;
  dateLabel: string;
  windowLabel: string;
  feeLabel: string;
  available: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  date: string;
  variant: string;
  comment: string;
  helpfulCount: number;
  photos?: string[];
  sellerReply?: string;
}

export interface QuestionItem {
  id: string;
  question: string;
  askedBy: string;
  askedDate: string;
  answer?: string;
  answeredBy?: string;
  answeredDate?: string;
}

export interface RelatedProduct {
  id: string;
  itemId: string;
  skuId: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  ratingCount: number;
  soldText: string;
  image?: string;
  svgType?: 'schweppes' | 'pokka' | 'dasani';
  nutriGrade: 'A' | 'B' | 'C' | 'D';
  healthierChoice?: boolean;
}

export const MAIN_PRODUCT_ID = '2034443802';
export const MAIN_SKU_ID = '11107987307';

export const PRODUCT_TITLE = 'Coca-Cola Zero Sugar (24 X 320ML) - Case [Packaging May Vary]';

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: 'case-24',
    sku: '2034443802_SGAMZ-11107987307',
    label: '24 x 320ml (Case)',
    shortLabel: '24 x 320ml Case',
    cansCount: 24,
    volumeMl: 7680,
    price: 16.45,
    originalPrice: 21.60,
    discountPercent: 24,
    stock: 48,
    image: '/src/assets/images/coke_zero_case_main_1795070553630.jpg',
  },
  {
    id: 'pack-12',
    sku: '2034443802_SGAMZ-11107987308',
    label: '12 x 320ml (Half Case)',
    shortLabel: '12 x 320ml Pack',
    cansCount: 12,
    volumeMl: 3840,
    price: 9.20,
    originalPrice: 11.40,
    discountPercent: 19,
    stock: 32,
    image: '/src/assets/images/coke_zero_open_carton_1795070554932.jpg',
  },
  {
    id: 'pack-6',
    sku: '2034443802_SGAMZ-11107987309',
    label: '6 x 320ml (6-Pack)',
    shortLabel: '6 x 320ml Pack',
    cansCount: 6,
    volumeMl: 1920,
    price: 4.95,
    originalPrice: 5.90,
    discountPercent: 16,
    stock: 64,
    image: '/src/assets/images/coke_zero_can_chilled_1795070554161.jpg',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    type: 'image',
    src: '/src/assets/images/coke_zero_case_main_1795070553630.jpg',
    alt: 'Coca-Cola Zero Sugar 24 x 320ml Case Carton',
    caption: '24 x 320ml Carton Case',
  },
  {
    id: 'g2',
    type: 'image',
    src: '/src/assets/images/coke_zero_can_chilled_1795070554161.jpg',
    alt: 'Coca-Cola Zero Sugar 320ml Chilled Aluminum Can',
    caption: '320ml Chilled Can View',
  },
  {
    id: 'g3',
    type: 'image',
    src: '/src/assets/images/coke_zero_open_carton_1795070554932.jpg',
    alt: 'Coca-Cola Zero Sugar Open 24-Can Carton',
    caption: 'Open Carton Arrangement',
  },
  {
    id: 'g4',
    type: 'image',
    src: '/src/assets/images/coke_zero_glass_ice_1795070554615.jpg',
    alt: 'Coca-Cola Zero Sugar Served Over Ice',
    caption: 'Serving Suggestion',
  },
  {
    id: 'g5',
    type: 'nutrition-card',
    alt: 'Coca-Cola Zero Sugar Nutrition Information & Singapore Nutri-Grade B',
    caption: 'Nutrition & Nutri-Grade B',
  },
];

export const RED_MART_VOUCHERS: Voucher[] = [
  {
    id: 'v-rm3',
    title: '$3 Off RedMart',
    discountAmount: 3,
    minSpend: 60,
    code: 'RM3OFF60',
    description: 'Valid on all RedMart groceries with min. spend $60',
    validUntil: 'Valid till 30 Nov 2026',
  },
  {
    id: 'v-rm8',
    title: '$8 Off RedMart',
    discountAmount: 8,
    minSpend: 120,
    code: 'RM8OFF120',
    description: 'Valid on bulk beverages & pantry orders with min. spend $120',
    validUntil: 'Valid till 30 Nov 2026',
  },
  {
    id: 'v-coke2',
    title: '$2 Off Coca-Cola',
    discountAmount: 2,
    minSpend: 30,
    code: 'COKE2OFF',
    description: 'Brand voucher on participating Coca-Cola cases',
    validUntil: 'Valid till 25 Nov 2026',
  },
];

export const SINGAPORE_AREAS = [
  { label: 'Central · Orchard (238801)', region: 'Central', district: 'Orchard', postal: '238801' },
  { label: 'Central · Tiong Bahru (168732)', region: 'Central', district: 'Bukit Merah', postal: '168732' },
  { label: 'East · Tampines (529509)', region: 'East', district: 'Tampines', postal: '529509' },
  { label: 'East · Bedok (460208)', region: 'East', district: 'Bedok', postal: '460208' },
  { label: 'West · Jurong East (609601)', region: 'West', district: 'Jurong East', postal: '609601' },
  { label: 'North · Woodlands (730888)', region: 'North', district: 'Woodlands', postal: '730888' },
  { label: 'North-East · Punggol (828868)', region: 'North-East', district: 'Punggol', postal: '828868' },
];

export const DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: 'slot-1',
    dayLabel: 'Tomorrow',
    dateLabel: 'Thu, 19 Nov',
    windowLabel: '10:00 AM - 12:00 PM',
    feeLabel: 'FREE ≥ $60',
    available: true,
  },
  {
    id: 'slot-2',
    dayLabel: 'Tomorrow',
    dateLabel: 'Thu, 19 Nov',
    windowLabel: '2:00 PM - 4:00 PM',
    feeLabel: 'FREE ≥ $60',
    available: true,
  },
  {
    id: 'slot-3',
    dayLabel: 'Tomorrow',
    dateLabel: 'Thu, 19 Nov',
    windowLabel: '7:00 PM - 9:00 PM',
    feeLabel: 'FREE ≥ $60',
    available: true,
  },
  {
    id: 'slot-4',
    dayLabel: 'Friday',
    dateLabel: 'Fri, 20 Nov',
    windowLabel: '8:00 AM - 10:00 AM',
    feeLabel: 'FREE ≥ $60',
    available: true,
  },
  {
    id: 'slot-5',
    dayLabel: 'Saturday',
    dateLabel: 'Sat, 21 Nov',
    windowLabel: '12:00 PM - 2:00 PM',
    feeLabel: 'Popular',
    available: true,
  },
];

export const NUTRITION_ROWS = [
  { nutrient: 'Energy', per100ml: '0 kcal (0 kJ)', perServing: '0 kcal (0 kJ)' },
  { nutrient: 'Protein', per100ml: '0.0 g', perServing: '0.0 g' },
  { nutrient: 'Total Fat', per100ml: '0.0 g', perServing: '0.0 g' },
  { nutrient: '— Saturated Fat', per100ml: '0.0 g', perServing: '0.0 g' },
  { nutrient: 'Carbohydrate', per100ml: '0.0 g', perServing: '0.0 g' },
  { nutrient: '— Total Sugars', per100ml: '0.0 g', perServing: '0.0 g' },
  { nutrient: 'Dietary Fibre', per100ml: '0.0 g', perServing: '0.0 g' },
  { nutrient: 'Sodium', per100ml: '11 mg', perServing: '35 mg' },
];

export const PRODUCT_SPECIFICATIONS = [
  { label: 'Brand', value: 'Coca-Cola' },
  { label: 'SKU', value: '2034443802_SGAMZ-11107987307' },
  { label: 'Pack Type', value: 'Value Pack / Carton Case (24 Cans)' },
  { label: 'Volume per Can', value: '320 ml (Total 7.68 Litres)' },
  { label: 'Nutri-Grade (SG)', value: 'Grade B (0% Sugar, 0% Saturated Fat)' },
  { label: 'Healthier Choice', value: 'Yes — HPB Healthier Choice (Lower in Sugar)' },
  { label: 'Dietary & Halal', value: 'Halal Certified, Sugar-Free, Zero Calorie' },
  { label: 'Storage Condition', value: 'Store in a cool, dry place away from direct sunlight' },
  { label: 'Country of Origin', value: 'Malaysia / Singapore' },
  { label: 'Shelf Life Guarantee', value: 'Minimum 4 months upon RedMart delivery' },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Wei Ming T.',
    verified: true,
    rating: 5,
    date: '14 Nov 2026',
    variant: '24 x 320ml (Case)',
    comment: 'Super convenient ordering the 24-can carton through RedMart instead of carrying heavy boxes from the supermarket. Carton arrived sealed with zero dented cans and expiry is May 2027.',
    helpfulCount: 38,
    photos: [
      '/src/assets/images/coke_zero_case_main_1795070553630.jpg',
      '/src/assets/images/coke_zero_open_carton_1795070554932.jpg',
    ],
    sellerReply: 'Thank you for shopping with RedMart! Glad the carton arrived in pristine condition.',
  },
  {
    id: 'rev-2',
    author: 'Nadia R.',
    verified: true,
    rating: 5,
    date: '10 Nov 2026',
    variant: '24 x 320ml (Case)',
    comment: 'Best price during RedMart promo with voucher stacked. Tastes crisp and fizzy especially over ice, and no sugar crash afterwards. Always my pantry staple.',
    helpfulCount: 24,
    photos: ['/src/assets/images/coke_zero_glass_ice_1795070554615.jpg'],
  },
  {
    id: 'rev-3',
    author: 'Jason L.',
    verified: true,
    rating: 5,
    date: '06 Nov 2026',
    variant: '24 x 320ml (Case)',
    comment: 'Delivered right on time within my 10am-12pm morning slot. Love that Coca-Cola Zero Sugar carries the Healthier Choice symbol and Nutri-Grade B.',
    helpfulCount: 19,
  },
  {
    id: 'rev-4',
    author: 'Priya S.',
    verified: true,
    rating: 4,
    date: '01 Nov 2026',
    variant: '24 x 320ml (Case)',
    comment: 'Good value for 24 cans. One corner of the outer cardboard box was slightly scuffed during transit, though all 24 aluminum cans inside were completely intact and fizzy.',
    helpfulCount: 11,
  },
  {
    id: 'rev-5',
    author: 'Kenneth C.',
    verified: true,
    rating: 5,
    date: '27 Oct 2026',
    variant: '12 x 320ml (Half Case)',
    comment: 'Repeat buyer every month. Used the Add Items to Delivery feature the night before to add two cartons without extra shipping fee.',
    helpfulCount: 15,
    photos: ['/src/assets/images/coke_zero_can_chilled_1795070554161.jpg'],
  },
  {
    id: 'rev-6',
    author: 'Siti A.',
    verified: true,
    rating: 5,
    date: '21 Oct 2026',
    variant: '24 x 320ml (Case)',
    comment: 'Halal certified, long shelf life, and tastes closest to classic Coke compared to other zero-sugar sodas.',
    helpfulCount: 9,
  },
  {
    id: 'rev-7',
    author: 'Desmond K.',
    verified: true,
    rating: 3,
    date: '15 Oct 2026',
    variant: '24 x 320ml (Case)',
    comment: 'Product itself is great, received the newer red-can packaging instead of the all-black label shown in older batches, taste is identical.',
    helpfulCount: 7,
    sellerReply: 'Hi Desmond, thank you for your feedback! As noted in the title [Packaging May Vary], Coca-Cola has refreshed the outer design while keeping the exact Zero Sugar recipe.',
  },
];

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: 'q1',
    question: 'What is the expiry date for the current batch of 24 x 320ml cases?',
    askedBy: 'Marcus T.',
    askedDate: '12 Nov 2026',
    answer: 'Our current RedMart warehouse batch has best-before dates between April 2027 and June 2027. We guarantee at least 4 months remaining shelf life upon delivery.',
    answeredBy: 'RedMart Official',
    answeredDate: '12 Nov 2026',
  },
  {
    id: 'q2',
    question: 'Is this Halal certified for Singapore Muslim consumers?',
    askedBy: 'Farah H.',
    askedDate: '04 Nov 2026',
    answer: 'Yes, Coca-Cola Zero Sugar canned in Malaysia/Singapore for local retail is Halal certified (JAKIM / MUIS recognized).',
    answeredBy: 'RedMart Official',
    answeredDate: '04 Nov 2026',
  },
  {
    id: 'q3',
    question: 'Why does the title say [Packaging May Vary]?',
    askedBy: 'Cheryl W.',
    askedDate: '28 Oct 2026',
    answer: 'Coca-Cola periodically updates seasonal or classic red-and-black Zero Sugar carton artwork. Regardless of outer box design, all cases contain 24 x 320ml cans of Coca-Cola Zero Sugar.',
    answeredBy: 'RedMart Official',
    answeredDate: '29 Oct 2026',
  },
  {
    id: 'q4',
    question: 'Can I add this carton to my existing RedMart delivery order?',
    askedBy: 'Benny K.',
    askedDate: '19 Oct 2026',
    answer: 'Yes! You can use RedMart’s "Add Items to Delivery" option before your order cut-off time (11:00 PM prior to delivery day) with no extra delivery charge.',
    answeredBy: 'RedMart Official',
    answeredDate: '19 Oct 2026',
  },
];

export const RELATED_SHELF_PRODUCTS: RelatedProduct[] = [
  {
    id: 'rel-1',
    itemId: '2034443805',
    skuId: '11107987310',
    title: 'Coca-Cola Original Taste (24 X 320ML) - Case',
    brand: 'Coca-Cola',
    price: 16.45,
    originalPrice: 21.60,
    discountPercent: 24,
    rating: 4.9,
    ratingCount: 1920,
    soldText: '10K+ sold',
    image: '/src/assets/images/coke_classic_case_1795070554999.jpg',
    nutriGrade: 'D',
  },
  {
    id: 'rel-2',
    itemId: '2034443818',
    skuId: '11107987324',
    title: 'Sprite Lemon-Lime Zero Sugar (24 X 320ML) - Case',
    brand: 'Sprite',
    price: 15.90,
    originalPrice: 20.80,
    discountPercent: 24,
    rating: 4.9,
    ratingCount: 842,
    soldText: '5K+ sold',
    image: '/src/assets/images/sprite_zero_case_1795070554622.jpg',
    nutriGrade: 'B',
    healthierChoice: true,
  },
  {
    id: 'rel-3',
    itemId: '2034443890',
    skuId: '11107987391',
    title: 'Coca-Cola Zero Sugar (12 X 320ML) - Pack',
    brand: 'Coca-Cola',
    price: 9.20,
    originalPrice: 11.40,
    discountPercent: 19,
    rating: 4.8,
    ratingCount: 615,
    soldText: '3.2K sold',
    image: '/src/assets/images/coke_zero_open_carton_1795070554932.jpg',
    nutriGrade: 'B',
    healthierChoice: true,
  },
  {
    id: 'rel-4',
    itemId: '2034443912',
    skuId: '11107987401',
    title: 'Schweppes Soda Water Mixer (24 X 320ML) - Case',
    brand: 'Schweppes',
    price: 15.20,
    originalPrice: 19.50,
    discountPercent: 22,
    rating: 4.9,
    ratingCount: 478,
    soldText: '2.8K sold',
    svgType: 'schweppes',
    nutriGrade: 'A',
    healthierChoice: true,
  },
  {
    id: 'rel-5',
    itemId: '2034443955',
    skuId: '11107987444',
    title: 'Pokka Jasmine Green Tea Less Sugar (24 X 300ML)',
    brand: 'Pokka',
    price: 14.50,
    originalPrice: 18.20,
    discountPercent: 20,
    rating: 4.9,
    ratingCount: 1140,
    soldText: '6.4K sold',
    svgType: 'pokka',
    nutriGrade: 'B',
    healthierChoice: true,
  },
  {
    id: 'rel-6',
    itemId: '2034443988',
    skuId: '11107987490',
    title: 'Dasani Pure Drinking Water (24 X 600ML) - Case',
    brand: 'Dasani',
    price: 7.90,
    originalPrice: 9.80,
    discountPercent: 19,
    rating: 4.9,
    ratingCount: 2310,
    soldText: '15K+ sold',
    svgType: 'dasani',
    nutriGrade: 'A',
    healthierChoice: true,
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, count: 1364 },
  { stars: 4, count: 88 },
  { stars: 3, count: 18 },
  { stars: 2, count: 6 },
  { stars: 1, count: 6 },
];
