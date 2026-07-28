import { prisma } from '@/lib/prisma';
import { HoursKind, FooterLinkGroup } from '@/lib/generated/prisma/client';
import { buildFooterFallback, type FooterData } from '@/lib/data/shape';

export async function getFooterData(): Promise<FooterData> {
  try {
    const [siteSetting, socialLinks, locations, footerLinks] = await Promise.all([
      prisma.siteSetting.findUniqueOrThrow({ where: { id: 'main' } }),
      prisma.socialLink.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.location.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { hours: { orderBy: { sortOrder: 'asc' } } },
      }),
      prisma.footerNavLink.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);

    return {
      site: {
        name: siteSetting.name,
        phone: siteSetting.phone,
        phoneHref: siteSetting.phoneHref,
        email: siteSetting.email,
        emailHref: siteSetting.emailHref,
        bookingUrl: siteSetting.bookingUrl,
        copyrightText: siteSetting.copyrightText,
      },
      socials: socialLinks.map((s) => ({ label: s.label, href: s.href, icon: s.icon })),
      locations: locations.map((location) => ({
        city: location.city,
        badge: location.badge ?? undefined,
        addressLines: (location.addressLines as string[]) ?? [],
        hours: location.hours
          .filter((h) => h.kind === HoursKind.FULL)
          .map((h) => ({ days: h.days, time: h.time })),
        hoursShort: location.hours
          .filter((h) => h.kind === HoursKind.SHORT)
          .map((h) => ({ days: h.days, time: h.time })),
      })),
      quickLinks: footerLinks
        .filter((l) => l.group === FooterLinkGroup.QUICK_LINK)
        .map((l) => ({ label: l.label, href: l.href })),
      footerServices: footerLinks
        .filter((l) => l.group === FooterLinkGroup.FOOTER_SERVICE)
        .map((l) => ({ label: l.label, href: l.href })),
    };
  } catch {
    return buildFooterFallback();
  }
}
