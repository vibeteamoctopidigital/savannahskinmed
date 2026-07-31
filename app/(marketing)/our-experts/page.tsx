import type { Metadata } from 'next';
import Image from 'next/image';

import ElevateCta from '@/components/home/ElevateCta';
import ButtonLink from '@/components/ui/ButtonLink';
import PageHero from '@/components/ui/PageHero';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
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
        image="https://res.cloudinary.com/khs2rcsr/image/upload/v1785410848/team_z2yiiz.jpg"
        imageAlt="Our Team at Savannah Age Management Medicine"
        position="center 45%"
      />

      {/* Intro Header Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="shell text-center">
          <p className="eyebrow mb-4 text-navy font-semibold text-[12px] sm:text-[13px] uppercase tracking-widest2">
            EXPERIENCE THE EXPERTISE
          </p>
          <h2 className="display-2 mx-auto max-w-4xl text-navy">
            Beauty, Precision, And Excellence
          </h2>
          <p className="mx-auto mt-6 max-w-[840px] text-[15.5px] sm:text-[16.5px] leading-[1.8] text-ink">
            We believe that the key to timeless beauty lies in a personalized approach to care. Our team&apos;s mission is to provide exceptional, results-driven treatments tailored to each client&apos;s individual goals, all while maintaining the highest standards of safety, comfort, and luxury. We combine cutting-edge medical advancements with an artist&apos;s touch, ensuring that every treatment leaves you feeling rejuvenated, radiant, and confident.
          </p>
          <div className="mt-8 flex justify-center">
            <BookAppointmentButton className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-[13px] font-bold tracking-widest2 text-white uppercase transition-colors hover:bg-navy-deep">
              <span>BOOK APPOINTMENT</span>
              <span className="text-[16px] leading-none">&rarr;</span>
            </BookAppointmentButton>
          </div>
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
                <div className="relative flex h-[240px] w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[6px] border-white bg-navy/5 shadow-xl sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.imageAlt || member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 240px, 320px"
                    />
                  ) : (
                    <span className="text-[14px] font-medium text-muted">No Photo</span>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-center">
                  <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-navy font-normal leading-tight">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="mt-2.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-widest2 text-navy">
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
