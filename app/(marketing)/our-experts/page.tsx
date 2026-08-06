import type { Metadata } from 'next';
import Image from 'next/image';

import ElevateCta from '@/components/home/ElevateCta';
import ButtonLink from '@/components/ui/ButtonLink';
import PageHero from '@/components/ui/PageHero';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import { getTeamMembers } from '@/lib/data/team';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';
import Reveal from '@/components/ui/Reveal';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/our-experts');
}

export default async function OurExpertsPage() {
  const teamMembers = await getTeamMembers();

  return (
    <section className='bg-[#F7F8F2]'>
      <PageJsonLd route="/our-experts" />
      <PageHero
        title="Our Team"
        intro="Savannah Skin and Med Spa is dedicated to helping you look and feel your absolute best at any age with medical aesthetics in Savannah."
          image="/clinic-hero.jpg"
        imageAlt="Our Team at Savannah Age Management Medicine"
        position="center 45%"
      />

      {/* Intro Header Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="shell text-center">
          <p className="eyebrow mb-4 text-navy font-bold text-[12px] sm:text-[14px] uppercase tracking-widest2">
            EXPERIENCE THE EXPERTISE
          </p>
          <h2 className="display-1v2 mx-auto max-w-4xl text-navy">
            Beauty, Precision, And Excellence
          </h2>
          <p className="mx-auto mt-6 max-w-[840px] text-[15.5px] sm:text-[16.5px] leading-[1.8] text-ink">
            We believe that the key to timeless beauty lies in a personalized approach to care. Our team&apos;s mission is to provide exceptional, results-driven treatments tailored to each client&apos;s individual goals, all while maintaining the highest standards of safety, comfort, and luxury. We combine cutting-edge medical advancements with an artist&apos;s touch, ensuring that every treatment leaves you feeling rejuvenated, radiant, and confident.
          </p>
          <div className="mt-8 flex justify-center">
            <BookAppointmentButton className="inline-flex items-center gap-2 rounded-full bg-navy  text-[14px] font-bold tracking-widest2 text-white uppercase transition-colors hover:bg-navy-deep">
              <span>BOOK APPOINTMENT</span>
              
            </BookAppointmentButton>
          </div>
        </div>
      </section>

<Reveal>
          <div className="mx-auto  pt-8 sm:pt-16 flex shell flex-col items-start gap-10 md:flex-row md:gap-20">
            <div className="relative shrink-0 overflow-hidden rounded-full">
              <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[500px] md:w-[500px]">
                 <Image
                  src="/images/team-6-img.png"
                  alt="Harry S. Collins, DO, FACOG, Medical Director"
                  fill
                  sizes="(max-width: 768px) 340px, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <div className="text-left md:pt-2 max-w-[680px]">
              <h2 className="font-normal text-[36px] text-navy md:text-[50px]"> Harry S. Collins, DO, FACOG, Medical Director</h2>
<p className="mt-2 text-[18px] sm:text-[22px] font-medium tracking-widest2 text-navy">
  Age Management Medicine Specialist
</p>
              <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-[#0b2055]">
          Doctor Harry Collins is a Life Fellow of the American College of Obstetricians and Gynecologists. Dr. Collins received his certification in Age Management Medicine with the nationally renowned Cenegenics Medical Institute. Cenegenics' certification in Age Management Medicine is jointly sponsored by Cenegenics Education and Research Foundation (CERF) and the Foundation for Care Management in Las Vegas, Nevada. CERF and the Foundation for Care Management are accredited with honors by seven sponsoring organizations including the American Medical Association and American Board of Medical Specialties. He graduated from the University of Colorado (Denver) with distinction, earning a BA in biology. He went on to earn his Doctor of Osteopathic Medicine degree from Kansas City University of Medicine and Biosciences. After completing an internship in family medicine at Womack Army Medical Center (Fort Bragg, North Carolina), he completed a residency in obstetrics and gynecology at Walter Reed Army Medical Center in Washington, DC.
              </div>
              <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-[#0b2055]">
                Dr. Collins is a graduate and prior affiliate of The Laser Vaginal Rejuvenation
                  Institute of Los Angeles, training under Dr. David Matlock (Dr. 90210) who pioneered the
                  trademarked procedure Laser Vaginal Rejuvenation. Throughout his medical career, Dr. Collins
                  has been devoted to the study of hormone optimization and age management medicine. Dr. Collins has had the
                  opportunity to train and work alongside some of the most respected surgeons in the country at one of the
                  most prestigious medical institutions, Walter Reed Army Medical Center. In 1984 he was the Command
                  Physician, U.S. Military Support Element Grenada (Operation Urgent Fury). He retired from the U.S. Army
                  Medical Corps as a Lt. Colonel. Trained and certified in Age Management Medicine, Dr. Collins brings Bio
                  Identical Hormone Optimization to the Southeast.
              </div>
            </div>
          </div>
      </Reveal>
      {/* Team Members List */}
      <section className="bg-[#F7F8F2] py-16 sm:py-24 lg:py-28">
        <div className="shell space-y-16 sm:space-y-20 lg:space-y-5">
          {teamMembers.slice(1,teamMembers.length).map((member, index) => {
            
            return (
              <div
                key={member.id}
                className={`flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-x-14 lg:gap-y-0  rounded-[32px] bg-white p-8 sm:p-12 lg:p-14 shadow-sm border border-navy/[0.04]
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
                <div className="min-w-0 w-full flex-1 text-center lg:text-left">
                  <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-navy font-normal leading-tight">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="mt-2.5 text-[13px] sm:text-[16px] font-bold 
                     tracking-widest2 text-navy">
                      {member.role}
                    </p>
                  )}
                  {member.highlight && (
                    <p className="mt-1 text-[13px] font-medium italic text-navy-soft">
                      {member.highlight}
                    </p>
                  )}
                  <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-navy">
                    {member.bio.split('\n\n').map((paragraph, i) => {
                      // Some bios lead with a pull-quote instead of using the
                      // dedicated `highlight` field — style it the same way.
                      const isQuote = i === 0 && /^[“"]/.test(paragraph);
                      return (
                        <p key={i} className={isQuote ? 'italic text-navy-soft' : undefined}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ElevateCta />
    </section>
  );
}
