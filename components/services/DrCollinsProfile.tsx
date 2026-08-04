import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

export default function DrCollinsProfile() {
  return (
     <section className="section bg-white">
      
        <Reveal>
          <div className="mx-auto flex container flex-col items-start gap-10 md:flex-row md:gap-16">
            <div className="relative shrink-0 overflow-hidden rounded-full">
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

            <div className="text-left md:pt-2">
              <h2 className="font-serif text-[36px] text-navy md:text-[42px]"> Harry S. Collins, DO, FACOG, Medical Director</h2>

              <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-muted">
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
     
    </section>
  );
}
