import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

const offerings = [
  {
    title: 'DiamondGlow® Hydrating Facial',
    description:
      'Experience a customizable, exfoliating treatment that deeply cleanses and infuses your skin with professional-grade SkinMedica® serums.',
  },
  {
    title: 'Dermaplaning Facial',
    description:
      'This mechanical exfoliation treatment gently removes the outer layer of dead skin cells and fine vellus hair (peach fuzz), leaving your skin instantly smoother and brighter. Our Dermaplaning Facial also includes a customized chemical peel, hydrojelly mask, and LED light therapy to maximize your glowing results.',
  },
  {
    title: 'PRP Microneedling',
    description:
      'Combine the benefits of microneedling with Platelet-Rich Plasma (PRP), which utilizes the growth factors in your own blood to significantly accelerate healing and enhance collagen production.',
  },
  {
    title: 'Microneedling + Exosome Serum',
    description:
      'Enhance your microneedling results with exosome serum, the latest innovation in regenerative aesthetics, which speeds up healing and significantly amplifies collagen production.',
  },
  {
    title: 'Microneedling with Hyaluronic Acid',
    description:
      'This standard microneedling treatment creates controlled micro-injuries to stimulate collagen production, paired with a hydrating hyaluronic acid serum that penetrates deeply for plumper, smoother skin. Includes an aftercare kit for optimal recovery.',
  },
];

export default function OfferingsList() {
  return (
    <section id="offerings" className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">Medical-Grade Facials Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8] text-[#555a64]">
                Discover advanced facials tailored to your skin's unique needs at transparent prices.
              </p>
              <div className="mx-auto mt-8 inline-flex rounded-full bg-cream px-8 py-3">
                <span className="font-sans text-[15px] font-bold tracking-widest text-navy uppercase">
                  Treatments
                </span>
              </div>
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
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link href="/iv-infusion-therapy-vitamin-injections" className="font-medium cursor-pointer hover:text-rose transition-colors">
                &larr; IV INFUSION THERAPY
              </Link>
              <BookAppointmentButton className="rounded-full bg-navy px-8 py-3 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
              <Link href="/injectables-wrinkle-prevention" className="font-medium cursor-pointer hover:text-rose transition-colors">
                INJECTABLES &amp; WRINKLE PREVENTION &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
