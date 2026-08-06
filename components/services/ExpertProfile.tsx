import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

export default function ExpertProfile({}) {
  return (
    <section className="section bg-white">

        <Reveal>
          <div className="shell flex flex-col items-center md:items-start gap-10 md:flex-row md:gap-16">
            <div className="relative shrink-0 overflow-hidden rounded-full">
              <div className="relative h-[240px] w-[240px] min-[430px]:h-[280px] min-[430px]:w-[280px] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]">
                <Image
                  src="/images/photo-content-10-img.jpg"
                  alt="Rebecca Spacek - Licensed Aesthetician"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 400px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="text-center md:pt-2 md:text-left">
              <h2 className="font-serif text-[36px]  lg:text-[48px] text-navy font-medium">Rebecca Spacek</h2>

              <div className="mt-6 space-y-5 text-[14px] sm:text-[16px] leading-[1.8] text-[#0b2055]">
                <p>
                  Rebecca Spacek is an Assistant Cosmetic Laser Practitioner, a Master Cosmetologist, and has been a professional Aesthetician and Certified Lasographer for 22 years.
                </p>
                <p>
                  She is licensed in the State of Georgia and studied at the Scottsdale&apos;s Institute for Medical Aesthetics in Arizona. Becca began her professional career as an Assistant Cosmetic Laser Practitioner and Aesthetician in Savannah and has been helping to establish multiple med spas here in the local area. She is most proud of her work at Cannon Plastic and Reconstructive Surgery and Cannon MedSpa where she worked closely with cancer patients. Becca provided these vulnerable patients with treatment plans that helped rid them of the scarring caused by radiation treatments and surgeries. The services Becca provides helped boost the confidence of her patients while ensuring they remained completely comfortable during her services. Becca holds 12 different certificates, loves her work and prides herself on getting outstanding results for her patients.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
     
    </section>
  );
}