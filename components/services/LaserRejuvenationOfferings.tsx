import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

const offerings = [
  {
    title: 'IPL (Intense Pulse Light) Treatment, Often Called Photofacials',
    description:
      'IPL treatments deliver a variety of light wavelengths to the skin in short bursts, penetrating down to the dermis. IPL is often used to reduce sun damage, reduce age spots, scarring, hyperpigmentation, and unwanted veins. IPL does not use a laser and leaves less visible swelling and redness on the skin, requiring less downtime.',
  },
  {
    title: 'Non-Ablative Laser Resurfacing',
    description:
      "This treatment delivers pinpoint laser pulses to penetrate deep within the skin and spur collagen production without altering the skin's surface. The head delivered during this treatment helps to remodel the collagen layer to encourage cellular turnover and plump the skin. As it is penetrating deep within the skin, it can also be used to reduce rosacea, spider veins, and deep acne scars.",
  },
  {
    title: 'CO2 Laser Resurfacing',
    description:
      'A powerful laser treatment to dramatically improve tone, texture, and appearance in a single treatment. Experience extraordinary tightening and pigmentation reduction is possible in as little as one treatment. Due to the nature of this treatment, a skin consultation is required in advance.',
  },
  {
    title: 'Microneedling',
    description:
      "Aesthetic microneedling uses fine needles to create micro-channels in the skin, triggering your body's natural healing response to boost collagen and elastin production. We enhance this treatment with an active exosome serum—powerful cellular messengers that accelerate tissue repair and regeneration at the deepest levels. Together, they deliver visible improvements in skin texture, fine lines, scarring, and overall radiance, with optimal results appearing after a customized treatment series.",
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
              <div className="mt-8 rounded-full bg-[#FAF9F5] py-3.5 text-center font-sans text-[16px] sm:text-[17px] font-semibold text-navy">
                Treatments
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-8 text-[15.5px] leading-[1.8] text-ink">
              {offerings.map((offering, i) => (
                <div key={i} className="relative">
                  <h3 className="font-sans text-[17px] sm:text-[18px] font-bold text-navy">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-muted">
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link
                href="/injectables-wrinkle-prevention"
                className="font-medium cursor-pointer transition-colors hover:text-rose"
              >
                &larr; WRINKLE PREVENTION
              </Link>
              <Link
                href="/iv-infusion-therapy-vitamin-injections"
                className="font-medium cursor-pointer transition-colors hover:text-rose"
              >
                IV INFUSION THERAPY &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

