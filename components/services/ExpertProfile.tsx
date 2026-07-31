import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

export default function ExpertProfile() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <Reveal>
          <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
            <div className="group relative shrink-0 overflow-hidden rounded-full border-8 border-cream shadow-xl transition-shadow duration-500 hover:shadow-2xl md:order-1">
              {/* Using a placeholder portrait image from the existing assets */}
              <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]">
                <Image
                  src="/images/photo-content-10-img.jpg"
                  alt="Rebecca Spacek - Licensed Aesthetician"
                  fill
                  sizes="(max-width: 768px) 340px, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <div className="text-center md:order-2 md:pt-8">
              <h2 className="font-serif text-[36px] text-navy md:text-[44px]">Rebecca Spacek</h2>
              <p className="eyebrow mt-3 text-rose">
                Licensed Aesthetician &amp; Laser Specialist
              </p>

              <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-muted">
                <p>
                  Rebecca Spacek is an Assistant Cosmetic Laser Practitioner, a Master Cosmetologist, and has been a professional Aesthetician and Certified Lasographer for 12 years.
                </p>
                <p>
                  She is licensed in the State of Georgia and studied at the Scottsdale&apos;s Institute for Medical Aesthetics in Arizona. Becca began her professional career as an Assistant Cosmetic Laser Practitioner and Aesthetician in Savannah and has been helping to establish multiple med spas here in the local area. She is most proud of her work at Cannon Plastic and Reconstructive Surgery and Cannon MedSpa where she worked closely with cancer patients. Becca provided these vulnerable patients with treatment plans that helped rid them of the scarring caused by radiation treatments and surgeries. The services Becca provides helped boost the confidence of her patients while ensuring they remained completely comfortable during her services. Becca holds 12 different certificates, loves her work and prides herself on getting outstanding results for her patients.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
