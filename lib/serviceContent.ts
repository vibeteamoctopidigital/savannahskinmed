export type ServiceContent = {
  slug: string;
  title: string;
  intro: string;
  body: string[];
};

export const serviceContent: ServiceContent[] = [
  {
    slug: 'medical-grade-facials',
    title: 'Medical Grade Facials',
    intro:
      'Clinical facials built around your skin type, tone and goals — from deep cleansing to dermaplaning and resurfacing.',
    body: [
      'Our medical-grade facials go well beyond a spa treatment. Each session begins with a skin assessment so your provider can select the actives, exfoliation and extractions that will do the most for your skin.',
      'Whether you are treating congestion, dullness, texture or early signs of ageing, we build a plan that keeps your skin healthy between visits as well as glowing on the day.',
    ],
  },
  {
    slug: 'laser-hair-removal',
    title: 'Laser Hair Removal',
    intro:
      'Comfortable, effective laser hair reduction delivered by providers with decades of combined laser experience.',
    body: [
      'Laser hair removal targets the pigment in the hair follicle to reduce regrowth over a series of treatments. We tailor settings to your skin tone and hair type so that every session is both safe and effective.',
      'Your provider will walk you through the full procedure before we begin, and check in with you throughout to keep you comfortable from start to finish.',
    ],
  },
  {
    slug: 'injectables-wrinkle-prevention',
    title: 'Injectables & Wrinkle Prevention',
    intro:
      'Neuromodulators and dermal fillers used with a light touch, to soften lines while keeping your expressions your own.',
    body: [
      'Injectable treatments relax the muscles that create dynamic lines and restore volume where it has been lost. Used early and consistently, they are one of the most effective ways to prevent lines from setting in.',
      'We plan your treatment around your facial anatomy and the result you are after — refreshed and rested rather than done.',
    ],
  },
  {
    slug: 'laser-skin-rejuvenation',
    title: 'Laser Skin Rejuvenation',
    intro:
      'Resurfacing and pigment correction that improves tone, texture and clarity with minimal downtime.',
    body: [
      'Laser skin rejuvenation stimulates collagen and breaks down unwanted pigment, addressing sun damage, redness, fine lines and uneven texture in a single technology.',
      'Most clients see progressive improvement over a short series of treatments, with results that continue to develop as new collagen forms.',
    ],
  },
  {
    slug: 'iv-infusion-therapy-vitamin-injections',
    title: 'IV Infusion Therapy & Vitamin Injections',
    intro:
      'Hydration, vitamins and antioxidants delivered directly into the bloodstream for fast, efficient absorption.',
    body: [
      'IV infusion therapy bypasses the digestive system so your body can use the full dose of what it is given. Our blends support energy, immunity, recovery and skin health.',
      'Vitamin injections offer a quicker alternative for clients who want a regular top-up of B12, lipotropics or vitamin D without a full infusion.',
    ],
  },
  {
    slug: 'vaginal-rejuvenation',
    title: 'Vaginal Rejuvenation',
    intro:
      'Discreet, non-surgical treatment to improve comfort, tone and confidence — in a private, judgement-free setting.',
    body: [
      'Non-surgical vaginal rejuvenation uses controlled energy to stimulate collagen in the vaginal tissue, improving laxity, dryness and mild stress incontinence.',
      'Consultations are private and unhurried. Your provider will explain what the treatment can and cannot do so you can decide what is right for you.',
    ],
  },
  {
    slug: 'aesthetic-membership-program',
    title: 'Aesthetic Membership Program',
    intro:
      'A monthly membership that makes consistent, results-driven skincare more affordable year round.',
    body: [
      'Members receive a monthly treatment credit, preferred pricing on additional services and product, and priority access to seasonal specials.',
      'Because the best aesthetic results come from consistency rather than one-off treatments, membership is designed to keep you on plan.',
    ],
  },
];

export const getServiceContent = (slug: string) =>
  serviceContent.find((service) => service.slug === slug);
