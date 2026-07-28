import type { Metadata } from 'next';
import Image from 'next/image';

import ButtonLink from '@/components/ui/ButtonLink';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/our-clinic');
}

const mosaic = [
  {
    src: '/images/image-mosaic-5-img.jpg',
    alt: 'The waiting lounge at Savannah Age Management Medicine',
    className: 'lg:row-span-2',
  },
  {
    src: '/images/image-mosaic-6-img.jpg',
    alt: 'A provider reviewing a personalised treatment plan with a client',
    className: '',
  },
  {
    src: '/images/image-mosaic-7-img.jpg',
    alt: 'Pore purifying pro-infusion serum in the treatment device',
    className: '',
  },
  {
    src: '/images/image-mosaic-8-img.jpg',
    alt: 'A client receiving a medical-grade facial',
    className: 'lg:col-span-2',
  },
];

export default function OurClinicPage() {
  return (
    <>
      <PageJsonLd route="/our-clinic" />
      <PageHero
        title="Our Clinic"
        intro="Our clinic is your destination for advanced, personalized aesthetic treatments that promote healthy, radiant skin and a more confident you."
        image="/images/banner-13-bg.jpg"
        imageAlt="The waiting lounge at Savannah Age Management Medicine"
        position="center 45%"
      />

      {/* ---------------- Welcome + image mosaic ---------------- */}
      <section className="bg-white py-16 sm:py-20 lg:pb-[72px] lg:pt-[96px]">
        <div className="shell">
          <Reveal className="mx-auto max-w-[900px] text-center">
            <p className="eyebrow mb-4 text-navy">
              Welcome To Savannah Age Management Medicine
            </p>

            <h2 className="display-2 [text-wrap:initial]">
              A Destination For Bespoke
              <br className="hidden sm:block" /> Aesthetic Care
            </h2>

            <p className="mx-auto mt-6 max-w-[840px] text-[15px] leading-[1.9]">
              At Savannah Age Management Medicine, we offer cutting-edge science and dedicated
              experts to enhance your natural beauty. Our philosophy is simple: beauty is
              timeless, and every individual deserves to feel confident. Through a curated
              selection of age-defying treatments, we craft bespoke protocols designed to
              revitalize, rejuvenate, and achieve your desired results.
            </p>

            <div className="mt-10 flex justify-center">
              <ButtonLink href="/contact-us">Book Appointment</ButtonLink>
            </div>
          </Reveal>

          {/* Matches #image-mosaic-d: 50px gutters, 20px radius, 600px tall row. */}
          <div className="mt-14 grid gap-[30px] sm:grid-cols-2 lg:mt-[68px] lg:h-[600px] lg:grid-cols-[1.85fr_1fr_0.69fr] lg:grid-rows-[1.466fr_1fr] lg:gap-[50px]">
            {mosaic.map((item, i) => (
              <Reveal
                key={item.src}
                delay={i * 120}
                className={`h-[240px] sm:h-[280px] lg:h-auto ${item.className}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[20px] shadow-[0_0_14px_rgba(0,0,0,0.2)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Cutting-edge technology ---------------- */}
      <section className="bg-mist py-16 sm:py-20 lg:py-[104px]">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-[100px]">
            <Reveal>
              <div className="relative aspect-[576/648] w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/photo-content-11-img.jpg"
                  alt="A treatment room at Savannah Age Management Medicine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="max-w-[460px]">
                <p className="eyebrow mb-4 text-rose-deep">Cutting-Edge Technology</p>

                <h2 className="display-2 [text-wrap:initial]">
                  Crafting Beauty With
                  <br className="hidden sm:block" /> Precision And Passion
                </h2>

                <p className="mt-6 text-[15px] leading-[1.9]">
                  Our highly trained professionals are masters of their craft, with years of
                  specialized training and a dedication to the art and science of age management.
                  With a passion for excellence, they stay at the forefront of the latest
                  aesthetic advancements, offering each client a level of care that is
                  unparalleled and deeply personalized.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The inside-out approach ---------------- */}
      <section className="bg-haze">
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex items-center px-5 py-16 sm:px-8 lg:order-1 lg:justify-end lg:py-24 lg:pl-12 lg:pr-14 xl:pl-16">
            <Reveal className="w-full max-w-[500px]">
              <p className="eyebrow mb-4 text-rose-deep">Synergistic Wellness</p>

              <h2 className="display-2 [text-wrap:initial]">
                The Inside-Out
                <br className="hidden sm:block" /> Approach
              </h2>

              <p className="mt-6 text-[15px] leading-[1.9]">
                At Savannah Age Management Medicine, we believe that true transformation begins
                from the inside out. Our regenerative therapies, including Bioidentical Hormone
                Replacement Therapy (BHRT) and medical weight loss, work in harmony with aesthetic
                treatments to enhance your health and appearance. By optimizing your internal
                wellness, these therapies support your body&rsquo;s natural vitality, creating the
                perfect foundation for achieving sustainable and visible results. Experience the
                power of integrated care that prioritizes both how you look and how you
                feel&mdash;because when your inner health is thriving, your outer glow follows
                naturally.
              </p>

              <ButtonLink href="/contact-us" className="mt-9">
                Meet Our Experts
              </ButtonLink>
            </Reveal>
          </div>

          {/* Bleeds to the right edge of the viewport */}
          <div className="relative order-1 min-h-[340px] sm:min-h-[440px] lg:order-2 lg:min-h-[620px]">
            <Image
              src="/images/photo-content-12-img.jpg"
              alt="A consultation at Savannah Age Management Medicine"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
