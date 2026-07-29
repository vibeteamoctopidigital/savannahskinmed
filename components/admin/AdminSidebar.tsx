'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logoutAction } from '@/app/admin/actions';

type NavItem = { href: string; label: string; icon: string; color: string };
type NavSection = { heading: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    heading: 'Overview',
    items: [{ href: '/admin/dashboard', label: 'Dashboard', icon: '⌂', color: '#6366f1' }],
  },
  {
    heading: 'Workflow',
    items: [
      { href: '/admin/dashboard/submissions', label: 'Submissions', icon: '✉', color: '#38bdf8' },
    ],
  },
  {
    heading: 'Content',
    items: [
      { href: '/admin/dashboard/content/team', label: 'Our Team', icon: '👥', color: '#a855f7' },
      { href: '/admin/dashboard/content/site', label: 'Locations & Hours', icon: '▦', color: '#2dd4bf' },
      { href: '/admin/dashboard/content/specials', label: 'Aesthetic Specials', icon: '★', color: '#fbbf24' },
      { href: '/admin/dashboard/content/blog', label: 'Blog', icon: '✎', color: '#f472b6' },
    ],
  },
  {
    heading: 'Site',
    items: [
      { href: '/admin/dashboard/settings', label: 'Settings', icon: '⚙', color: '#fb923c' },
      { href: '/admin/dashboard/seo', label: 'SEO', icon: '◎', color: '#60a5fa' },
    ],
  },
];

const ACCENT = '#fb7a4f';

function NavIcon({ icon, color, active }: { icon: string; color: string; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[14px] transition-all duration-150"
      style={{
        backgroundColor: active ? color : `${color}22`,
        color: active ? '#ffffff' : color,
        boxShadow: active ? `0 4px 12px -2px ${color}88` : 'none',
      }}
    >
      {icon}
    </span>
  );
}

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin/dashboard' ? pathname === href : pathname.startsWith(href);

  return (
    <div className="sticky top-4 self-start h-[calc(100vh-2rem)] shrink-0 rounded-[26px] bg-gradient-to-b from-violet-500 via-fuchsia-500 to-rose-400 p-[2px] shadow-menu z-30">
      <aside className="flex h-full w-[228px] flex-col rounded-[24px] bg-[#0d0f24] text-white overflow-hidden">
        {/* Header — never shrinks, always fully visible */}
        <div className="flex shrink-0 items-center gap-2.5 px-5 py-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-serif text-[15px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(129,79,255,0.55)]">
            S
          </span>
          <div className="min-w-0">
            <p className="font-serif text-[14.5px] font-semibold leading-tight text-white">
              Admin Portal
            </p>
            <p className="truncate text-[10.5px] text-white/40">Management Console</p>
          </div>
        </div>

        {/* Nav — takes whatever space is left; scrolls internally only if it
            truly doesn't fit, so it can never overlap the header or footer. */}
        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 py-1">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest2 text-white/30">
                {section.heading}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-medium transition-all duration-150 ${
                          active
                            ? 'bg-white/[0.07] text-white'
                            : 'text-white/55 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <span
                          className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-opacity"
                          style={{ backgroundColor: ACCENT, opacity: active ? 1 : 0 }}
                          aria-hidden="true"
                        />
                        <NavIcon icon={item.icon} color={item.color} active={active} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer — never shrinks, always fully visible */}
        <div className="shrink-0 border-t border-white/[0.08] px-3 py-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <NavIcon icon="↗" color="#2dd4bf" active={false} />
            Visit site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[12.5px] font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              <NavIcon icon="⇥" color="#60a5fa" active={false} />
              Logout
            </button>
          </form>

          <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-3 py-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-purple-500 text-[12px] font-semibold text-white">
              {email.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-white">{email}</p>
              <p className="text-[10.5px] text-white/40">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
