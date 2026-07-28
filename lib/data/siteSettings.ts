import { prisma } from '@/lib/prisma';
import { buildSiteSettingsFallback, type SiteSettingsData } from '@/lib/data/shape';

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const row = await prisma.siteSetting.findUniqueOrThrow({ where: { id: 'main' } });
    return {
      name: row.name,
      description: row.description,
      phone: row.phone,
      phoneHref: row.phoneHref,
      email: row.email,
      emailHref: row.emailHref,
      address: row.address,
      bookingUrl: row.bookingUrl,
      copyrightText: row.copyrightText,
      logoUrl: row.logoUrl,
      faviconUrl: row.faviconUrl,
      googleAnalyticsId: row.googleAnalyticsId,
      metaPixelId: row.metaPixelId,
      headerTrackingCode: row.headerTrackingCode,
      footerTrackingCode: row.footerTrackingCode,
    };
  } catch {
    return buildSiteSettingsFallback();
  }
}
