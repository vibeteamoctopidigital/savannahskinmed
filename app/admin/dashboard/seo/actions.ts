'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { RobotsDirective, SchemaSource } from '@/lib/generated/prisma/client';
import { syncPageSeoRoutes } from '@/lib/data/pageSeo';
import { slugToRoute } from '@/lib/seoRoutes';

export async function syncRoutesAction() {
  await syncPageSeoRoutes();
  revalidatePath('/admin/dashboard/seo');
}

export async function updatePageSeoAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  const slug = String(formData.get('slug') || '');
  if (!id) return;

  const route = slugToRoute(slug);

  await prisma.pageSeo.update({
    where: { id },
    data: {
      title: String(formData.get('title') || ''),
      description: String(formData.get('description') || ''),
      keywords: String(formData.get('keywords') || ''),
      canonicalUrl: String(formData.get('canonicalUrl') || ''),
      robots: (String(formData.get('robots')) as RobotsDirective) || RobotsDirective.INHERIT,
      schemaEnabled: formData.get('schemaEnabled') === 'on',
      schemaSource: (String(formData.get('schemaSource')) as SchemaSource) || SchemaSource.AUTO,
      customSchema: String(formData.get('customSchema') || ''),
    },
  });

  revalidatePath(route);
  revalidatePath('/admin/dashboard/seo');
  revalidatePath(`/admin/dashboard/seo/${slug}`);
  redirect('/admin/dashboard/seo');
}
