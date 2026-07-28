import Image from 'next/image';
import RequestButton from '@/components/booking/RequestButton';

export default function MembershipHero() {
  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden bg-[#b9bcc2] py-16 lg:h-[85vh] lg:min-h-[600px] lg:max-h-[880px] lg:py-0">
      <Image
        src="/images/banner-16-bg.jpg"
        alt="Aesthetic Membership Program"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'center' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 sm:bg-gradient-to-r sm:from-black/40 sm:via-black/10 sm:to-transparent" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="shell relative z-10 pt-10 lg:pt-20">
        <div className="mx-auto max-w-[780px] text-center">
          <h1 className="display-1 animate-fadeUp text-white text-shadow-hero [text-wrap:initial] [animation-delay:100ms]">
            Aesthetic Membership Program
          </h1>

          <p className="mx-auto mt-7 max-w-[645px] animate-fadeUp text-[20px] leading-[1.7] text-white text-shadow-hero [animation-delay:150ms]">
            A smarter way to maintain your aesthetic results with exclusive member pricing, flexible monthly credits, and a plan designed around you.
          </p>

          <div className="mt-9 flex flex-col animate-fadeUp items-center justify-center gap-y-6 sm:flex-row sm:gap-x-8 [animation-delay:240ms]">
            <RequestButton withArrow>Request More Details</RequestButton>
          </div>
        </div>
      </div>
    </section>
  );
}
