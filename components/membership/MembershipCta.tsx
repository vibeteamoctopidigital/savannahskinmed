import Image from 'next/image';
import RequestButton from '@/components/booking/RequestButton';
import Reveal from '@/components/ui/Reveal';

export default function MembershipCta() {
  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        {/* Text Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-20 lg:py-20 bg-[#f8f7f5]">
          <Reveal className="max-w-[480px] mx-auto lg:ml-auto lg:mr-0 xl:mr-16">
            <p className="eyebrow mb-4 text-navy">JOIN TODAY</p>
            <h2 className="display-3 italic mb-6 text-navy">Ready To Experience Membership?</h2>
            
            <p className="text-[16px] leading-[1.75] text-muted mb-10">
              Join the Savannah Age Management Medicine family and start investing in your skin.
            </p>

            <RequestButton withArrow>Request More Details</RequestButton>
          </Reveal>
        </div>

        {/* Image Side */}
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
          <Image
            src="/images/photo-content-15-img.jpg"
            alt="Group of women enjoying the results of their aesthetic treatments"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
