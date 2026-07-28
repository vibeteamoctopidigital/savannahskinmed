'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logoutAction } from '@/app/admin/actions';

type NavItem = { href: string; label: string; icon: string };
type NavSection = { heading: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    heading: 'Overview',
    items: [{ href: '/admin/dashboard', label: 'Dashboard', icon: '⌂' }],
  },
  {
    heading: 'Workflow',
    items: [{ href: '/admin/dashboard/submissions', label: 'Submissions', icon: '✉' }],
  },
  {
    heading: 'Content',
    items: [
      { href: '/admin/dashboard/content/site', label: 'Site & Footer', icon: '▦' },
      { href: '/admin/dashboard/content/specials', label: 'Aesthetic Specials', icon: '★' },
    ],
  },
  {
    heading: 'Site',
    items: [
      { href: '/admin/dashboard/settings', label: 'Settings', icon: '⚙' },
      { href: '/admin/dashboard/seo', label: 'SEO', icon: '◎' },
    ],
  },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin/dashboard' ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col bg-navy-deep text-white">
      <div className="px-6 py-6">
        <p className="font-serif text-[18px] leading-tight text-white">Admin Portal</p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest2 text-white/35">
              {section.heading}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-white/10 text-white'
                        : 'text-white/65 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span aria-hidden="true" className="w-4 text-center text-[13px]">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <Link
          href="/"
          target="_blank"
          className="mb-1 block rounded-lg px-3 py-2 text-[13px] font-medium text-white/65 hover:bg-white/5 hover:text-white"
        >
          ↗ Visit site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            ⇥ Logout
          </button>
        </form>

        <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-deep text-[12px] font-semibold text-white">
            {email.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium text-white">{email}</p>
            <p className="text-[11px] text-white/40">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
