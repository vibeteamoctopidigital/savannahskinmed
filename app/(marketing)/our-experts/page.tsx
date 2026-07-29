import type { Metadata } from 'next';
import Image from 'next/image';

import ElevateCta from '@/components/home/ElevateCta';
import ButtonLink from '@/components/ui/ButtonLink';
import PageHero from '@/components/ui/PageHero';
import { getTeamMembers } from '@/lib/data/team';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/our-experts');
}

export default async function OurExpertsPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <PageJsonLd route="/our-experts" />
      <PageHero
        title="Our Team"
        intro="Savannah Skin and Med Spa is dedicated to helping you look and feel your absolute best at any age with medical aesthetics in Savannah."
        image="/images/clinic-hero.jpg"
        imageAlt="Our Team at Savannah Age Management Medicine"
        position="center 45%"
      />

      {/* Intro Header Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="shell text-center">
          <p className="eyebrow mb-4 text-rose-deep">
            SAVANNAH&apos;S PREMIER AESTHETICS TEAM
          </p>
          <h2 className="display-2 mx-auto max-w-4xl text-navy">
            Beauty, Precision, And Excellence
          </h2>
          <p className="mx-auto mt-6 max-w-[840px] text-[15px] leading-[1.9] text-muted">
            At Savannah Skin and Med Spa, we believe that looking your best starts with feeling confident in your skin. Our team of highly trained medical professionals, nurses, and aestheticians is dedicated to delivering personalized, state-of-the-art treatments that enhance your natural beauty. Combining years of clinical experience with a passion for aesthetic excellence, we are committed to helping you achieve your unique aesthetic goals.
          </p>
          <ButtonLink href="/contact-us" className="mt-8">
            Book a Consultation
          </ButtonLink>
        </div>
      </section>

      {/* Team Members List */}
      <section className="bg-[#FAF9F5] py-16 sm:py-24 lg:py-28">
        <div className="shell space-y-16 sm:space-y-20 lg:space-y-24">
          {teamMembers.map((member, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={member.id}
                className={`flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-14 ${
                  isFirst
                    ? 'p-0'
                    : 'rounded-[32px] bg-white p-8 sm:p-12 lg:p-14 shadow-sm border border-navy/[0.04]'
                }`}
              >
                <div className="relative h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px] shrink-0 overflow-hidden rounded-full border-[6px] border-white shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.imageAlt || member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 240px, 320px"
                  />
                </div>
                <div className="min-w-0 flex-1 text-center lg:text-left">
                  <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-navy font-normal leading-tight">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="mt-2.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-widest2 text-rose-deep">
                      {member.role}
                    </p>
                  )}
                  {member.highlight && (
                    <p className="mt-1 text-[13px] font-medium text-navy-soft">
                      {member.highlight}
                    </p>
                  )}
                  <div className="mt-6 space-y-5 text-[15px] leading-[1.85] text-muted">
                    {member.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ElevateCta />
    </>
  );
}
