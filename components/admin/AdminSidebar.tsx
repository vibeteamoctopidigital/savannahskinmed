'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logoutAction } from '@/app/admin/actions';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  exactOnly?: boolean;
};

const navItems: NavItem[] = [
  {
    href: '/admin/dashboard',
    label: 'Overview',
    exactOnly: true,
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/submissions',
    label: 'Submissions',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/content/team',
    label: 'Our Team',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/content/specials',
    label: 'Specials & Offers',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/content/blog',
    label: 'Blogs',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/content/site',
    label: 'Locations & Hours',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/seo',
    label: 'SEO',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    href: '/admin/dashboard/settings',
    label: 'Account Settings',
    icon: (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.exactOnly ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <aside className="sticky top-0 flex h-screen w-[245px] shrink-0 flex-col justify-between border-r border-[#D9EFE2] bg-[#EEFBF2] px-3.5 py-6 text-slate-700">
      {/* Top Section: Header + Flat Navigation */}
      <div className="space-y-6 overflow-y-auto pr-1">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] font-serif text-lg font-bold text-white shadow-sm">
            S
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-serif text-[16px] font-semibold leading-tight text-[#064E3B]">
              Savannah Admin
            </h1>
            <p className="truncate text-[11px] font-medium text-[#059669]/70">Management Console</p>
          </div>
        </div>

        {/* Flat Stable Nav List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
                  active
                    ? 'bg-[#D6F3E2] text-[#047857] font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-[#E3F8EC] hover:text-[#064E3B]'
                }`}
              >
                <span className={active ? 'text-[#059669]' : 'text-slate-400 group-hover:text-[#059669]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Footer Actions */}
      <div className="mt-4 space-y-2 border-t border-[#D5EEDD] pt-4">
        {/* Visit Site */}
        <Link
          href="/"
          target="_blank"
          className="group flex items-center gap-3 rounded-xl px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-[#E3F8EC] hover:text-[#064E3B]"
        >
          <svg className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>Visit Website</span>
        </Link>

        {/* Sign Out */}
        <form action={logoutAction}>
          <button
            type="submit"
            className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-left text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-[#E3F8EC] hover:text-[#B91C1C]"
          >
            <svg className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-[#B91C1C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign out</span>
          </button>
        </form>

        {/* User Info */}
        <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-white/60 px-3 py-2 border border-[#D9EFE2]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#059669] text-[11px] font-semibold text-white">
            {email.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-[#064E3B]">{email}</p>
            <p className="text-[10px] text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
