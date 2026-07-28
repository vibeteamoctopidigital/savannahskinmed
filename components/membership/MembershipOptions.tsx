import Image from 'next/image';
import RequestButton from '@/components/booking/RequestButton';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/icons';

const essentialsFeatures = [
  '$129 credit added to your wallet (applied towards any aesthetic treatment or skincare)',
  '10% OFF all retail skincare products (Alastin, SkinMedica, ZO Skin Health)',
  '$50 OFF Botox or Xeomin injections (minimum of 30 units)',
  '$100 OFF Dermal Fillers per syringe (Juvederm, Radiesse, Restylane, Sculptra)',
  'FREE B12 shot per month (or applied as $25 credit toward IV Therapy)',
  '10% OFF IV Therapy and Wellness',
  'Access to VIP Events & priority booking for all promotions',
  'Complimentary consultations',
  'Customized skincare regimen plan from one of our expert aestheticians',
];

const eliteFeatures = [
  '$299 credit added to your wallet (applied towards any treatment)',
  '15% OFF all retail skincare products (Alastin, SkinMedica, ZO Skin Health)',
  '$75 OFF Botox or Xeomin injections (minimum of 30 units)',
  '$150 OFF Dermal Fillers per syringe (Juvederm, Radiesse, Restylane, Sculptra)',
  '1 FREE IV Therapy Treatment per month (Myers Cocktail or Immunity)',
  '1 FREE DiamondGlow or Hydrafacial treatment every 3 months',
  '15% OFF all Laser Treatments (Halo, BBL, Moxi, Laser Hair Removal)',
  'Complimentary Birthday Treatment (Chemical Peel or Dermaplaning)',
  'Access to VIP Events & priority booking for all promotions',
  'Complimentary consultations',
  'Customized skincare regimen plan from one of our expert aestheticians',
];

export default function MembershipOptions() {
  return (
    <section className="section bg-white" id="membership-options">
      <div className="shell">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4 text-navy">CHOOSE YOUR PATH</p>
          <h2 className="display-2 italic text-navy">Membership Options</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Aesthetic Essentials Card */}
          <Reveal className="relative overflow-hidden rounded-[20px] text-white">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/images/photo-content-14-img.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#be8596]/85" />
            </div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col">
              <div className="text-center mb-10">
                <p className="text-[14px] font-sans uppercase tracking-widest2 opacity-90 mb-2">Aesthetic Essentials</p>
                <div className="font-serif text-[42px] leading-none mb-1">$129<span className="text-[18px]">/month</span></div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {essentialsFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-white/90" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] leading-[1.6]">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center mt-auto">
                <p className="text-[12px] opacity-70 italic">*6 month minimum commitment</p>
              </div>
            </div>
          </Reveal>

          {/* Radiant Elite Card */}
          <Reveal className="relative overflow-hidden rounded-[20px] text-white">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/images/photo-content-15-img.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#13285c]/85" />
            </div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col">
              <div className="text-center mb-10">
                <p className="text-[14px] font-sans uppercase tracking-widest2 opacity-90 mb-2">Radiant Elite</p>
                <div className="font-serif text-[42px] leading-none mb-1">$299<span className="text-[18px]">/month</span></div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {eliteFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-white/90" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] leading-[1.6]">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center mt-auto">
                <p className="text-[12px] opacity-70 italic">*6 month minimum commitment</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="text-center">
          <RequestButton withArrow>Request More Details</RequestButton>
        </Reveal>
      </div>
    </section>
  );
}
