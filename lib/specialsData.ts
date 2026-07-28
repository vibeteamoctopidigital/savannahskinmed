export type Location = 'statesboro' | 'pooler';

type PriceTier = {
  label: string;
  detail: string;
};

type TierCard = {
  id: string;
  variant: 'tiers';
  image: string;
  imageAlt: string;
  title: string;
  tiers: [PriceTier, PriceTier];
  cta: string;
  locations?: Location[];
};

type StoryCard = {
  id: string;
  variant: 'story';
  image: string;
  imageAlt: string;
  title?: string;
  eyebrow?: string;
  headline: string;
  description: string;
  cta: string;
  locations?: Location[];
};

export type SpecialCard = TierCard | StoryCard;

export const specialCards: SpecialCard[] = [
  {
    id: 'partial-bikini',
    variant: 'tiers',
    image: '/images/grid-12-img.jpg',
    imageAlt: 'Laser hair removal treatment on the bikini area',
    title: 'Partial Bikini Bundle',
    tiers: [
      { label: 'Bundle Of 3 Partial Bikini:', detail: 'Get 10% Off ($945, Regularly $1,050)' },
      { label: 'Bundle Of 6 Partial Bikini:', detail: 'Get 15% Off ($1,785, Regularly $2,100)' },
    ],
    cta: 'Claim',
  },
  {
    id: 'full-bikini',
    variant: 'tiers',
    image: '/images/grid-13-img.jpg',
    imageAlt: 'Laser hair removal treatment for a full bikini package',
    title: 'Full Bikini Bundle',
    tiers: [
      { label: 'Bundle Of 3 Full Bikini:', detail: 'Get 10% Off ($1,080, Regularly $1,200)' },
      { label: 'Bundle Of 6 Full Bikini:', detail: 'Get 15% Off ($2,040, Regularly $2,400)' },
    ],
    cta: 'Claim',
  },
  {
    id: 'underarms',
    variant: 'tiers',
    image: '/images/grid-11-img.jpg',
    imageAlt: 'Laser hair removal treatment on the underarm',
    title: 'Underarms Bundle',
    tiers: [
      { label: 'Bundle Of 3 Underarms:', detail: 'Get 10% Off ($810, Regularly $900)' },
      { label: 'Bundle Of 6 Underarms:', detail: 'Get 15% Off ($1,530, Regularly $1,800)' },
    ],
    cta: 'Claim',
  },
  {
    id: 'refer-a-friend',
    variant: 'story',
    image: '/images/grid-10-img.jpg',
    imageAlt: 'Refer a friend and double the rewards this quarter',
    headline: 'Sharing Is Caring',
    description:
      'DOUBLE The Referral Rewards! All Patients Who Refer Other Patients Will Receive $100 Instead Of $50 To Their Account, Through The End Of June. *Valid From April - June',
    cta: 'Claim',
  },
  {
    id: 'micro-peel',
    variant: 'story',
    image: '/images/grid-img.jpg',
    imageAlt: 'Enzymatic peel facial treatment',
    title: 'Micro Peel Bundle',
    headline: 'Book 3 Enzymatic Peels - Save 10%',
    description:
      'Reveal glowing skin and balanced tone! These lunchtime peels are perfect for those that are new to skin care or preparing for an event. Done in 45 minutes our enzymatic peels are short but very effective for a dramatic skin refresh.',
    cta: 'Claim',
  },
  {
    id: 'microneedling',
    variant: 'story',
    image: '/images/grid-2-img.jpg',
    imageAlt: 'Microneedling facial treatment',
    title: 'Microneedling Bundle',
    headline: 'Book And Save! Book 3 Microneedling Facials And Save 10%',
    description:
      'Improve texture, reduce fine lines, and support collagen production with this favorite treatment. Add a plasma boost for extra powerful regenerative properties. Limited downtime - best done in a series.',
    cta: 'Claim',
  },
  {
    id: 'diamondglow',
    variant: 'story',
    image: '/images/grid-3-img.jpg',
    imageAlt: 'SkinMedica serums used in the DiamondGlow facial',
    title: 'DiamondGlow® Facial',
    headline: 'Book 3 DiamondGlow® Facials And Save 10%',
    description:
      'Clinically proven dermabrasion treatment that exfoliates, extracts, and infuses customized SkinMedica® serums so you leave with a long-lasting glow.',
    cta: 'Claim',
  },
  {
    id: 'custom-medical-facial',
    variant: 'story',
    image: '/images/grid-4-img.jpg',
    imageAlt: 'Custom medical facial with a clay mask',
    title: 'Custom Medical Facial',
    headline: 'Book 3 Custom Medical Facials And Save 10%',
    description:
      "Let our estheticians customize a facial for your skin using our professional line of skincare. Cleanse, exfoliate, hydrate and glow with these clinical-grade facials. Best done in a series for optimal results.",
    cta: 'Claim',
  },
  {
    id: 'student-discounts',
    variant: 'story',
    image: '/images/grid-5-img.jpg',
    imageAlt: 'Dermaplaning treatment for the student discount special',
    title: 'Student Discounts',
    headline: 'Exclusive Offers for Students!',
    description:
      'Get Any Customized Medical Facial For $200 (Regularly $250) OR Get a FREE Dermaplane with any DiamondGlow® Facial! Complementary with student ID.',
    cta: 'Claim',
  },
];
