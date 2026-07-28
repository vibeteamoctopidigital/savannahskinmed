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
                  alt="Rebecca Sproul - Licensed Aesthetician"
                  fill
                  sizes="(max-width: 768px) 340px, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <div className="md:order-2 md:pt-8">
              <h2 className="font-serif text-[36px] text-navy md:text-[44px]">Rebecca Sproul</h2>
              <p className="eyebrow mt-3 text-rose">
                Licensed Aesthetician &amp; Laser Specialist
              </p>

              <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-muted">
                <p>
                  Rebecca is a Licensed Aesthetician with a passion for helping her patients achieve
                  their skincare goals.
                </p>
                <p>
                  She believes that the best results are achieved through a combination of in-office
                  treatments and a customized at-home skincare regimen. She works closely with each
                  patient to develop a personalized plan that addresses their unique needs and concerns.
                </p>
                <p>
                  Rebecca is dedicated to continuing her education and staying up-to-date on the
                  latest advancements in medical aesthetics. She is certified in a wide range of
                  treatments, including laser hair removal, chemical peels, and microneedling, and
                  is committed to providing her patients with the highest level of care.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
