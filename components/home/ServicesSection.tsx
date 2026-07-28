import Link from 'next/link';

import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  ArrowRight,
  BloomIcon,
  FacialIcon,
  IvDripIcon,
  LaserHairIcon,
  LaserSkinIcon,
  SyringeIcon,
} from '@/components/icons';

/** Row-major order — matches the two-column layout of the live site. */
const cards = [
  { label: 'Medical-Grade Facials', href: '/medical-grade-facials', Icon: FacialIcon },
  { label: 'Laser Hair Removal', href: '/laser-hair-removal', Icon: LaserHairIcon },
  {
    label: 'Injectables & Wrinkle Prevention',
    href: '/injectables-wrinkle-prevention',
    Icon: SyringeIcon,
  },
  {
    label: 'Laser Skin Rejuvenation',
    href: '/laser-skin-rejuvenation',
    Icon: LaserSkinIcon,
  },
  {
    label: 'IV Infusion Therapy & Vitamin Injections',
    href: '/iv-infusion-therapy-vitamin-injections',
    Icon: IvDripIcon,
  },
  { label: 'Vaginal Rejuvenation', href: '/vaginal-rejuvenation', Icon: BloomIcon },
];

export default function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Medical-Grade Aesthetics, Tailored To You"
            intro="Experience the transformative power of science-backed beauty treatments designed to rejuvenate your skin and enhance your confidence."
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1036px] gap-3.5 md:grid-cols-2 lg:mt-14">
          {cards.map(({ label, href, Icon }, i) => (
            <Reveal key={href} delay={i * 70} className="h-full">
              <Link
                href={href}
                className={`group flex h-full items-center gap-5 rounded-lg px-6 py-[26px] transition-colors duration-300 sm:px-8 ${
                  i % 2 === 0 ? 'bg-mint hover:bg-mint/60' : 'bg-aqua hover:bg-aqua/60'
                }`}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-sage/45 text-sage">
                  <Icon className="h-7 w-7" />
                </span>

                <span className="flex-1 font-serif text-[18px] leading-snug text-navy sm:text-[21px]">
                  {label}
                </span>

                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-light text-white transition-all duration-300 group-hover:bg-rose-deep group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-11 flex justify-center" delay={120}>
          <ButtonLink href="/contact-us">Book Appointment</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
