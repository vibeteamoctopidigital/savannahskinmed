import { prisma } from '@/lib/prisma';
import AdminSpecialCard from '@/components/admin/AdminSpecialCard';
import AddSpecialCardButton from '@/components/admin/AddSpecialCardButton';

export const dynamic = 'force-dynamic';

export default async function SpecialsContentPage() {
  let cards;
  try {
    cards = await prisma.specialCard.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { tiers: { orderBy: { sortOrder: 'asc' } } },
    });
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Aesthetic Specials</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Aesthetic Specials</h1>
        <p className="text-[13px] text-muted">
          Manage offer cards on the public /specials page.
          Upload images via Cloudinary, edit content, then save each card.
        </p>
      </div>

      {/* Offer Cards — visual card layout */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[19px] text-navy">Offer Cards</h2>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-muted">{cards.length} card{cards.length !== 1 ? 's' : ''}</p>
            <AddSpecialCardButton />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <AdminSpecialCard key={card.id} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}
