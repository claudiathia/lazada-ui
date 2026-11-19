export interface ClosersPrincipleTag {
  letter: 'C' | 'L' | 'O' | 'S' | 'E' | 'R';
  name: string;
  evidenceOutOf4: number;
  badgeBg: string;
  badgeText: string;
}

export interface ClosersClickPoint {
  number: number;
  id: string;
  shortTitle: string;
  principles: ClosersPrincipleTag[];
  originalLazada: string;
  improvedRedMart: string;
  whyItWorks: string;
  guardrail: string;
  liveSectionAnchor: string;
}

export const CLOSERS_CLICK_POINTS: ClosersClickPoint[] = [
  {
    number: 1,
    id: 'identity-status',
    shortTitle: 'Healthier Choice, Nutri-Grade B & #1 Drink Rank',
    principles: [
      {
        letter: 'O',
        name: 'Own Identity',
        evidenceOutOf4: 1,
        badgeBg: '#5B3FA2',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'S',
        name: 'Status',
        evidenceOutOf4: 2,
        badgeBg: '#8F6A00',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'R',
        name: 'Recognition',
        evidenceOutOf4: 2,
        badgeBg: '#136F44',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Healthier Choice and Nutri-Grade details are buried inside lower product specifications with no category rank shown above the fold.',
    improvedRedMart:
      'Surfaces HPB Healthier Choice ("Lower in Sugar"), Nutri-Grade B (0% Sugar), and "#1 Most Purchased Drink" directly at the top of the listing.',
    whyItWorks:
      'Aligns with the buyer’s self-image as a health-conscious shopper ("Tribes & Ties") while using #1 ranking and official HPB certification as immediate validation.',
    guardrail:
      'Only display verified Singapore HPB Healthier Choice and official Nutri-Grade B ratings.',
    liveSectionAnchor: '#top',
  },
  {
    number: 2,
    id: 'stickiness-reorder',
    shortTitle: 'Personal Repeat-Purchase Memory + 1-Click Buy Again',
    principles: [
      {
        letter: 'S',
        name: 'Stickiness',
        evidenceOutOf4: 3,
        badgeBg: '#142B52',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'C',
        name: 'Convenience',
        evidenceOutOf4: 4,
        badgeBg: '#1E6F95',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Treats every visitor like a first-time shopper; requires manually selecting pack variant, quantity, and clicking through standard checkout steps.',
    improvedRedMart:
      'Shows "You have purchased this item 3 times before" paired with a 1-click "Buy Again (1-Click)" action.',
    whyItWorks:
      'Stickiness leverages prior commitment and pantry habit loops (3/4 evidence), while 1-Click Reorder creates the path of least resistance (4/4 evidence).',
    guardrail:
      'Never auto-add items without explicit user tap; keep reorder as an optional single-click shortcut.',
    liveSectionAnchor: '#top',
  },
  {
    number: 3,
    id: 'sale-countdown',
    shortTitle: 'Red Discount Framing + 3-Hour Deal Countdown',
    principles: [
      {
        letter: 'L',
        name: 'Loss Avoidance',
        evidenceOutOf4: 3,
        badgeBg: '#A92B2B',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'E',
        name: 'Emotion',
        evidenceOutOf4: 1,
        badgeBg: '#C56713',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Displays standard orange $16.45 pricing with plain muted "-24%" text and no time boundary on the promotional price.',
    improvedRedMart:
      'Highlights the savings in red ("Save $5.15 · -24% OFF") alongside a live 3-hour countdown ("02:59:xx left until deal ends").',
    whyItWorks:
      'Loss Avoidance frames waiting as losing $5.15 in savings, while red visual urgency triggers emotional momentum before rational price comparison.',
    guardrail:
      'Per the Emotion guardrail, keep typography calm and tabular without flashing banners or deceptive fake resets.',
    liveSectionAnchor: '#top',
  },
  {
    number: 4,
    id: 'low-stock-scarcity',
    shortTitle: 'Red Stock Scarcity ("Only 3 cartons left")',
    principles: [
      {
        letter: 'L',
        name: 'Loss Avoidance',
        evidenceOutOf4: 3,
        badgeBg: '#A92B2B',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Displays calm neutral text ("In Stock — 48 cartons available"), giving shoppers no reason to complete checkout today.',
    improvedRedMart:
      'Displays "Only 3 cartons left at this price" in red with a depletion bar matching the live maximum quantity cap.',
    whyItWorks:
      'Non-Loss > Gain: people work harder to avoid losing an available carton at the deal price than to gain a generic discount later.',
    guardrail:
      'Keep the scarcity count synchronized with actual selectable inventory in the quantity stepper.',
    liveSectionAnchor: '#top',
  },
  {
    number: 5,
    id: 'repurchase-top-review',
    shortTitle: '52 Repeat Buyers + Bumped-Up Top Review Highlight',
    principles: [
      {
        letter: 'R',
        name: 'Recognition',
        evidenceOutOf4: 2,
        badgeBg: '#136F44',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'S',
        name: 'Status',
        evidenceOutOf4: 2,
        badgeBg: '#8F6A00',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Shows only an aggregate 4.9 star count near the title; written reviews sit below the fold beneath long product specifications.',
    improvedRedMart:
      'Adds "52 customers repurchased this more than twice", highlights 1 Top Review directly inside the listing, and bumps Reviews above Specifications.',
    whyItWorks:
      'People take others’ repeat choices as proof of quality, and surfacing the #1 most-helpful verified review convinces buyers before they bounce.',
    guardrail:
      'Highlight only one concise, authentic verified review inside the purchase box; keep all normal reviews accessible below.',
    liveSectionAnchor: '#reviews',
  },
  {
    number: 6,
    id: 'delivery-status-ladder',
    shortTitle: 'Free Delivery Ladder + "Users Like You Bought" Top-Ups',
    principles: [
      {
        letter: 'S',
        name: 'Status',
        evidenceOutOf4: 2,
        badgeBg: '#8F6A00',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'O',
        name: 'Own Identity',
        evidenceOutOf4: 1,
        badgeBg: '#5B3FA2',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'R',
        name: 'Recognition',
        evidenceOutOf4: 2,
        badgeBg: '#136F44',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'C',
        name: 'Convenience',
        evidenceOutOf4: 4,
        badgeBg: '#1E6F95',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Free delivery minimum ($60.00) is tucked inside the right-hand sidebar without progress cues or companion drink top-ups.',
    improvedRedMart:
      'Places a live Free Priority Delivery progress bar above the CTA paired with 1-click "+ Add" drinks ("Other users like you also bought").',
    whyItWorks:
      'Status shows exact distance to the $60 tier; Own Identity ("users like you") & Recognition validate peer drink pairings; Convenience lets buyers top up in 1 click without leaving the page.',
    guardrail:
      'Recommend genuinely complementary zero-sugar/pantry drinks and update delivery progress live with no hidden thresholds.',
    liveSectionAnchor: '#top',
  },
  {
    number: 7,
    id: 'top-five-drinks',
    shortTitle: 'Top 5 Most Purchased Drinks Leaderboard (#1–#5)',
    principles: [
      {
        letter: 'S',
        name: 'Status',
        evidenceOutOf4: 2,
        badgeBg: '#8F6A00',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'R',
        name: 'Recognition',
        evidenceOutOf4: 2,
        badgeBg: '#136F44',
        badgeText: '#FFFFFF',
      },
      {
        letter: 'C',
        name: 'Convenience',
        evidenceOutOf4: 4,
        badgeBg: '#1E6F95',
        badgeText: '#FFFFFF',
      },
    ],
    originalLazada:
      'Shows a generic unranked "Customers Also Bought" grid at the bottom of the page with no leaderboard hierarchy.',
    improvedRedMart:
      'Introduces a ranked #1–#5 "Top 5 Most Purchased Drinks on RedMart" leaderboard highlighting #1 Coca-Cola Zero Sugar with 1-click "+ Add" buttons.',
    whyItWorks:
      'Combines peer status ranking (#1 choice), repeat-buyer social proof, and frictionless 1-click cart top-ups to reach the $60 free delivery rung.',
    guardrail:
      'Rank items transparently by verified RedMart case volume and repeat-order counts.',
    liveSectionAnchor: '#top-drinks',
  },
];
