'use client';

import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export type BeforeAfterSlide = {
  before: number;
  after: number;
  procedure: string;
};

type BeforeAfterStaticProps = {
  title?: string;
  eyebrow?: string;
  slides?: BeforeAfterSlide[];
  bg?: string;
};

const defaultSlides: BeforeAfterSlide[] = [
  { before: 19, after: 20, procedure: 'Laser Hair Removal' },
];

const src = (n: number) => `/images/before-after-${n}-img.jpg`;

export default function BeforeAfterStatic({
  title = 'Results You Can See, Confidence You Can Feel',
  eyebrow = 'Before & After Procedures',
  slides = defaultSlides,
  bg,
}: BeforeAfterStaticProps) {
  const slide = slides[0];

  return (
    <section className={`section ${bg || 'bg-white'} pt-4 lg:pt-8`}>
      <Reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Before Column */}
            <div className="flex flex-col">
              <div className="bg-teal-500 text-white rounded-full py-2.5 sm:py-3 px-8 sm:px-10 text-center font-serif text-2xl sm:text-3xl font-medium mb-4 sm:mb-6">
                Before
              </div>
              <div className="relative w-full aspect-[5/3] overflow-hidden rounded-3xl">
                <Image
                  src={src(slide.before)}
                  alt={`Before the ${slide.procedure} procedure`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* After Column */}
            <div className="flex flex-col">
              <div className="bg-rose text-white rounded-full py-2.5 sm:py-3 px-8 sm:px-10 text-center font-serif text-2xl sm:text-3xl font-medium mb-4 sm:mb-6">
                After
              </div>
              <div className="relative w-full aspect-[5/3] overflow-hidden rounded-3xl">
                <Image
                  src={src(slide.after)}
                  alt={`After the ${slide.procedure} procedure`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Procedure Label Overlay */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-white/60 rounded-full px-6 sm:px-8 py-2 sm:py-2.5">
                  <p className="font-sans text-[11px] sm:text-[12px] font-medium uppercase tracking-widest text-navy whitespace-nowrap">
                    Procedure: <span className="font-bold">{slide.procedure}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
