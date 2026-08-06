import Reveal from '@/components/ui/Reveal';
import { CreditsIcon, MemberPricingIcon, SyringeIcon, BirthdayPerksIcon } from './MembershipIcons';

const benefits = [
  {
    title: 'Credits Ready For You',
    description: 'Monthly dues bank to your account and roll forward — so nothing is ever wasted.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="29.5" stroke="#519B98" />
        <path
          d="M38.1516 30.2488C42.6539 25.7465 42.6539 18.4469 38.1516 13.9446C33.6493 9.4423 26.3497 9.4423 21.8474 13.9446C17.3451 18.4469 17.3451 25.7465 21.8474 30.2488C26.3497 34.7511 33.6493 34.7511 38.1516 30.2488Z"
          stroke="#519B98"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.0831 17.8158C31.4729 17.4574 30.0032 16.8029 28.8685 17.2737C27.3484 17.9044 27.0748 19.6231 28.1621 20.7203C28.8382 21.4027 29.5821 21.5249 30.8186 21.9941C32.3637 22.5806 32.9211 23.9216 32.5572 25.1591C32.2471 26.2139 31.2308 26.981 29.8694 26.981C29.0328 26.981 28.1074 26.7068 27.3418 26.1915"
          stroke="#519B98"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M30 27.1318V28.4175" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 15.7754V16.9962" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M42.2541 39.9001C42.2541 39.9001 37.6549 38.2392 33.7708 41.0335C29.8867 43.8278 29.9994 48.7164 29.9994 48.7164C29.9994 48.7164 34.5986 50.3774 38.4827 47.5831C42.3669 44.7888 42.2541 39.9001 42.2541 39.9001Z"
          stroke="#519B98"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.7455 37.4294C17.7455 37.4294 22.3447 35.7685 26.2288 38.5628C30.1129 41.3571 30.0002 46.2457 30.0002 46.2457C30.0002 46.2457 25.401 47.9067 21.5169 45.1124C17.6327 42.3181 17.7455 37.4294 17.7455 37.4294Z"
          stroke="#519B98"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M30.001 33.8838V52.2058" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Member-Only Pricing',
    description: 'Discounts on neurotoxins, $50 off filler per syringe, and seasonal offers.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="29.5" stroke="#519B98" />
        <path d="M21.7091 36.4193C17.0271 34.6698 13.6934 30.1562 13.6934 24.8639C13.6934 18.0533 19.2145 12.5322 26.0251 12.5322C32.403 12.5322 37.6501 17.3741 38.2911 23.5826" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M22.1096 31.767C19.7091 30.4024 18.0898 27.8219 18.0898 24.8633C18.0898 20.4806 21.6427 16.9277 26.0254 16.9277C29.6961 16.9277 32.7847 19.42 33.6913 22.8047" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M18.2461 24.8633H27.1518" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M33.9752 47.468C40.7858 47.468 46.3069 41.947 46.3069 35.1364C46.3069 28.3258 40.7858 22.8047 33.9752 22.8047C27.1646 22.8047 21.6436 28.3258 21.6436 35.1364C21.6436 41.947 27.1646 47.468 33.9752 47.468Z" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M33.9753 28.2061L36.24 31.9962L40.5445 32.9788L37.6397 36.3038L38.0353 40.7013L33.9753 38.9661L29.9155 40.7013L30.3111 36.3038L27.4062 32.9788L31.7107 31.9962L33.9753 28.2061Z" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
      </svg>
    ),
  },
  {
    title: 'Use on Almost Anything',
    description: 'Tox, fillers, CO2, PRP, microneedling, peels, skincare, and more.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="29.5" stroke="#519B98" />
        <mask id="mask0" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="12" y="13" width="33" height="33">
          <path d="M12.6201 13.5594H44.6906V45.6299H12.6201V13.5594Z" fill="white" />
        </mask>
        <g mask="url(#mask0)">
          <path d="M16.2168 31.4022C17.6845 32.8699 20.0641 32.8699 21.5318 31.4022L32.1617 20.7722L37.4767 26.0872L26.8467 36.7172C25.379 38.1849 25.379 40.5645 26.8467 42.0322" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21.5318 36.7172L16.2168 42.0322" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5596 39.3754L18.8746 44.6904" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33.4912 22.1013L36.1487 19.4439L38.8062 22.1013L36.1487 24.7588" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M43.7505 14.4995L37.4766 20.7734" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.8877 30.0739L28.1752 43.3613" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25.5186 27.4164L30.8336 32.7314" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30.833 27.4168L33.4905 30.0742" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25.5186 32.7311L28.1761 35.3887" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Birthday Perks',
    description: 'Exclusive gifts and complimentary treatments during your birthday month.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="29.5" stroke="#519B98" />
        <path d="M29.9989 47.7737H25.2733C21.6177 47.7737 18.6543 44.8103 18.6543 41.1547V35.4424H23.38C27.0355 35.4424 29.9989 38.4058 29.9989 42.0614V47.7737Z" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M25.7932 47.7737H18.3842C14.717 47.7737 11.7441 44.8007 11.7441 41.1335V38.376H17.6868C18.0156 38.376 18.3388 38.3998 18.6547 38.446" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M29.999 47.7737H34.7247C38.3803 47.7737 41.3437 44.8103 41.3437 41.1547V35.4424H36.618C32.9624 35.4424 29.999 38.4058 29.999 42.0614V47.7737Z" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M33.1445 47.7737H41.6151C45.2823 47.7737 48.2553 44.8008 48.2553 41.1335V38.376H42.3126C41.9838 38.376 41.6606 38.3998 41.3447 38.446" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M25.0352 35.6507V22.6221H34.9637V35.6507" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M33.1443 19.4774C33.1443 21.2141 31.7365 22.6218 29.9999 22.6218C28.2633 22.6218 26.8555 21.214 26.8555 19.4774C26.8555 17.7408 29.9999 14.8398 29.9999 14.8398C29.9999 14.8398 33.1443 17.7408 33.1443 19.4774Z" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M34.9637 26.6709V29.1611C34.9637 30.3687 33.9847 31.3476 32.7772 31.3476C31.5696 31.3476 30.5906 30.3687 30.5906 29.1611V26.6709H25.0352" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
        <path d="M42.7814 12.2266L44.5 15.0774L47.3509 16.796L44.5 18.5147L42.7814 21.3655L41.0628 18.5147L38.2119 16.796L41.0628 15.0774L42.7814 12.2266Z" stroke="#519B98" strokeWidth="1.5" strokeMiterlimit="10" />
      </svg>
    ),
  },
];
export default function MemberBenefits() {
  return (
    <section className="bg-[#F7F8F2] py-16 sm:py-20 lg:pt-0 lg:pb-16">
      <div className="shell max-w-[1250px]">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3 text-navy font-semibold uppercase tracking-widest2 text-[14px]">
            MORE VALUE, EVERY VISIT
          </p>
          <h2 className="font-serif text-[38px] sm:text-[48px] text-navy font-medium">
            Member Benefits
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Reveal
              key={index}
              className="rounded-[18px] bg-white p-7 sm:p-8 shadow-sm flex sm:flex-row flex-col sm:text-left text-center sm:items-start items-center gap-5 sm:gap-6"
            >
              <div className="shrink-0 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#5a8680] text-[#3d6e68]">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-[22px] sm:text-[24px] font-serif text-navy font-medium mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[15px] sm:text-[15.5px] leading-[1.65] text-[#334e68]">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
 <Reveal className="mx-auto max-w-[760px] mt-10 text-center">
            <h3 className="mb-4 font-serif text-[24px] text-navy">Membership Terms</h3>
            <p className="text-[16px] leading-[1.75] text-navy">
              Credits roll forward each month and in the event that the membership is cancelled
              outstanding credits can be refunded or used within 90 days. Aesthetic Essentials is
              a 3-month minimum commitment. Skin Revival is a 6-month minimum commitment.
            </p>
          </Reveal>
        
      </div>


      t
    </section>
  );
}

