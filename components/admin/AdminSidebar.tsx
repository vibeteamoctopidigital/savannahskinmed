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
    <aside className="flex h-screen w-[228px] shrink-0 flex-col justify-between bg-navy-deep text-white">
      <div className="min-h-0">
        <div className="flex items-center gap-2 px-5 py-4">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 font-serif text-[13px] font-semibold text-white">
            S
          </span>
          <p className="font-serif text-[14.5px] font-semibold leading-tight text-white">
            Admin Portal
          </p>
        </div>

        <nav className="space-y-3.5 px-3">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest2 text-white/30">
                {section.heading}
              </p>
              <ul>
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-150 ${
                          active
                            ? 'bg-white/[0.08] text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 h-3.5 w-[3px] -translate-y-1/2 rounded-full bg-rose-light transition-opacity ${
                            active ? 'opacity-100' : 'opacity-0'
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          aria-hidden="true"
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md text-[12px] transition-colors ${
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
      </div>

      <div className="border-t border-white/[0.08] px-3 py-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center text-[12px]" aria-hidden="true">
            ↗
          </span>
          Visit site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center text-[12px]" aria-hidden="true">
              ⇥
            </span>
            Logout
          </button>
        </form>

        <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-deep text-[11px] font-semibold text-white">
            {email.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11.5px] font-medium text-white">{email}</p>
            <p className="text-[10.5px] text-white/40">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
