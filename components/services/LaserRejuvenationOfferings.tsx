import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

const offerings = [
  {
    title: 'BBL® (BroadBand Light)',
    description:
      "The world's most powerful IPL (Intense Pulsed Light) device. BBL effectively targets pigment, redness, and sun damage. It also stimulates collagen production for younger-looking skin over time.",
  },
  {
    title: 'MOXI® Laser',
    description:
      'A gentle, non-ablative fractional laser that provides a "prejuvenation" treatment to maintain skin health. It is perfect for treating light sun damage, uneven pigmentation, and improving overall skin tone and texture with minimal downtime.',
  },
  {
    title: 'Halo®',
    description:
      "The world's first hybrid fractional laser. Halo combines non-ablative and ablative wavelengths to deliver deep dermal rejuvenation and epidermal renewal. It provides remarkable results for fine lines, deep wrinkles, sun damage, and enlarged pores.",
  },
  {
    title: 'ClearSilk®',
    description:
      'A non-ablative Nd:YAG laser that safely treats all skin types year-round. ClearSilk delivers gentle heat into the dermis to reduce redness, diffuse flushing, rosacea, and improve skin texture.',
  },
  {
    title: 'ClearV®',
    description:
      'The preferred choice for vascular treatments. ClearV uses a 1064nm Nd:YAG laser to safely and effectively treat visible vessels, broken capillaries, spider veins, and vascular lesions on the face and body.',
  },
];

export default function LaserRejuvenationOfferings() {
  return (
    <section id="offerings" className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">Laser Skin Rejuvenation Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8]">
                We offer a number of state-of-the-art laser and non-laser procedures, designed to provide a range of solutions based on comfort level, price point, and number of desired treatments.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-8 text-[15.5px] leading-[1.8] text-ink">
              {offerings.map((offering, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                  <h3 className="font-sans text-[17px] font-bold text-navy">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-muted">
                    {offering.description}
                  </p>
                </div>
              ))}

              <div className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Microneedling
                </h3>
                <p className="mt-2 text-muted">
                  While not a laser, microneedling is a highly effective skin rejuvenation treatment often combined or alternated with laser therapies. It creates controlled micro-injuries in the skin, triggering the body&apos;s natural healing process to stimulate collagen and elastin production. This improves skin texture, reduces the appearance of scars, and enhances the absorption of topical skincare products.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link href="/injectables-wrinkle-prevention" className="font-medium cursor-pointer hover:text-rose transition-colors">
                &larr; INJECTABLES &amp; WRINKLE PREVENTION
              </Link>
              <Link href="/medical-grade-facials" className="font-medium cursor-pointer hover:text-rose transition-colors">
                MEDICAL-GRADE FACIALS &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
