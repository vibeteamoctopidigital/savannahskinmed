import Link from 'next/link';

import Logo from './Logo';
import { getFooterData } from '@/lib/data/footer';
import { getSiteSettings } from '@/lib/data/siteSettings';
import {
  ClockIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TwitterIcon,
} from '@/components/icons';

const socialIcons: Record<string, typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
};

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 font-sans text-[15px] font-semibold text-navy">{children}</h3>
  );
}

export default async function Footer() {
  const [footer, siteSettings] = await Promise.all([getFooterData(), getSiteSettings()]);

  return (
    <footer className="bg-white pt-16 lg:pt-[104px]">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.05fr_1.35fr_0.9fr_1.25fr] lg:gap-10">
          {/* ---------------- Brand ---------------- */}
          <div>
            <Logo variant="dark" src={siteSettings.logoUrl || undefined} />

            <ul className="mt-7 flex items-center gap-3">
              {footer.socials.map((social) => {
                const Icon = socialIcons[social.icon] ?? FacebookIcon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition-colors duration-300 hover:bg-rose-deep"
                    >
                      <Icon className="h-[17px] w-[17px]" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className="mt-7 space-y-3 text-[14px]">
              <li className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-navy" />
                <a href={footer.site.emailHref} className="text-navy transition-colors duration-300 hover:text-rose-deep">
                  {footer.site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-navy" />
                <a href={footer.site.phoneHref} className="text-navy transition-colors duration-300 hover:text-rose-deep">
                  {footer.site.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* ---------------- Contact info ---------------- */}
          <div>
            <ColumnHeading>Contact Info</ColumnHeading>

            <div className="space-y-7">
              {footer.locations.map((location) => (
                <div key={location.city}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <p className="font-sans text-[14px] font-semibold text-navy">
                      {location.city}
                    </p>
                    {location.badge && (
                      <span className="rounded-[3px] bg-navy px-2 py-[3px] font-sans text-[9px] font-medium leading-none text-white">
                        {location.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 flex items-start gap-2.5 text-[14px] text-navy">
                    <PinIcon className="mt-[3px] h-4 w-4 shrink-0" />
                    <span>{location.addressLines.join(', ')}</span>
                  </p>

                  <p className="mt-4 font-sans text-[13px] font-semibold text-rose-deep">
                    Office Hours
                  </p>
                  <p className="mt-1.5 flex items-start gap-2.5 text-[14px] text-navy">
                    <ClockIcon className="mt-[3px] h-4 w-4 shrink-0" />
                    <span>
                      {location.hoursShort.map((entry, i) => (
                        <span key={entry.days}>
                          {i > 0 && <span className="px-2 text-navy/40">|</span>}
                          {entry.days} {entry.time}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- Quick links ---------------- */}
          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-[18px]">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-navy transition-colors duration-300 hover:text-rose-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- Services ---------------- */}
          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="space-y-[18px]">
              {footer.footerServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-navy transition-colors duration-300 hover:text-rose-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- Legal bar ---------------- */}
        <div className="mt-[72px] border-t border-navy/10 py-8">
          <p className="text-center font-sans text-[11px] uppercase tracking-[0.08em] text-navy/70">
            {footer.site.copyrightText}
            <span className="px-2.5 text-navy/30">|</span>
            All Rights Reserved
            <span className="px-2.5 text-navy/30">|</span>
            <Link href="/privacy-policy" className="transition-colors duration-300 hover:text-rose-deep">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
