import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

export default function DrCollinsProfile() {
  return (
    <section className="section bg-white pt-12 md:pt-24 relative">
      <div className="shell">
        <Reveal>
          <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
            <div className="group relative shrink-0 overflow-hidden rounded-full border-8 border-white shadow-xl transition-shadow duration-500 hover:shadow-2xl md:order-1 -mt-24 md:mt-0">
              <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]">
                <Image
                  src="/images/team-6-img.png"
                  alt="Harry S. Collins, DO, FACOG, Medical Director"
                  fill
                  sizes="(max-width: 768px) 340px, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <div className="md:order-2 md:pt-8 text-center md:text-left">
              <h2 className="font-serif text-[36px] text-navy md:text-[44px]">
                Harry S. Collins, DO, FACOG, Medical Director
              </h2>

              <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-muted">
                <p>
                  Dr. Collins is a graduate and prior affiliate of The Laser Vaginal Rejuvenation
                  Institute of Los Angeles, training under Dr. David Matlock (Dr. 90210) who pioneered the
                  trademarked procedure Laser Vaginal Rejuvenation. Throughout his medical career, Dr. Collins
                  has been devoted to the study of hormone optimization and age management medicine. Dr. Collins has had the
                  opportunity to train and work alongside some of the most respected surgeons in the country at one of the
                  most prestigious medical institutions, Walter Reed Army Medical Center. In 1984 he was the Command
                  Physician, U.S. Military Support Element Grenada (Operation Urgent Fury). He retired from the U.S. Army
                  Medical Corps as a Lt. Colonel. Trained and certified in Age Management Medicine, Dr. Collins brings Bio
                  Identical Hormone Optimization to the Southeast.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
