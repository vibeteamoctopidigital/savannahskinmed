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
      { href: '/admin/dashboard/content/site', label: 'Locations & Hours', icon: '▦' },
      { href: '/admin/dashboard/content/specials', label: 'Aesthetic Specials', icon: '★' },
      { href: '/admin/dashboard/content/blog', label: 'Blog', icon: '✎' },
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
    <aside className="flex h-screen w-[252px] shrink-0 flex-col bg-navy-deep text-white">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 font-serif text-[14px] font-semibold text-white">
          S
        </span>
        <div className="min-w-0">
          <p className="font-serif text-[15.5px] font-semibold leading-tight text-white">
            Admin Portal
          </p>
          <p className="truncate text-[11px] text-white/40">Savannah Skin Med</p>
        </div>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 pb-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="mb-2.5 px-3 text-[10.5px] font-semibold uppercase tracking-widest2 text-white/30">
              {section.heading}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-150 ${
                        active
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-rose-light transition-opacity ${
                          active ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        aria-hidden="true"
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[12.5px] transition-colors ${
                          active ? 'bg-white/15' : 'bg-white/0 group-hover:bg-white/10'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] px-4 py-4">
        <Link
          href="/"
          target="_blank"
          className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center text-[12.5px]" aria-hidden="true">
            ↗
          </span>
          Visit site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center text-[12.5px]" aria-hidden="true">
              ⇥
            </span>
            Logout
          </button>
        </form>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
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
