'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Logo from './Logo';
import { locations, primaryNav, services, site, socials } from '@/lib/site';
import { trackClickToCall } from '@/lib/analytics';
import {
  ArrowLongRight,
  ArrowRight,
  ChevronDown,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
} from '@/components/icons';

export default function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route changes should always dismiss any open navigation surface.
  useEffect(() => {
    setMobileOpen(false);
    setMobileClosing(false);
    setDesktopOpen(false);
    setMobileServicesOpen(false);
    if (mobileCloseTimer.current) clearTimeout(mobileCloseTimer.current);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen && !mobileClosing ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, mobileClosing]);

  const closeMobileDrawer = () => {
    setMobileClosing(true);
    if (mobileCloseTimer.current) clearTimeout(mobileCloseTimer.current);
    mobileCloseTimer.current = setTimeout(() => {
      setMobileOpen(false);
      setMobileClosing(false);
    }, 350);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setDesktopOpen(false);
      setMobileClosing(true);
      if (mobileCloseTimer.current) clearTimeout(mobileCloseTimer.current);
      mobileCloseTimer.current = setTimeout(() => {
        setMobileOpen(false);
        setMobileClosing(false);
      }, 350);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /** Small grace period so the pointer can travel from trigger to panel. */
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDesktopOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Fixed: the bar stays at the top of the viewport at all times. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >

 
      <div className={`mx-auto flex items-center justify-between py-4 px-4 sm:py-5 sm:px-6 lg:min-h-[110px] lg:px-12 shell ${scrolled ? 'lg:py-3' : 'lg:py-6'}`}>
        <Logo variant={scrolled ? 'dark' : 'light'} src={logoUrl} />

        {/* ---------------- Desktop navigation ---------------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const hasChildren = 'children' in item && !!item.children;

              if (!hasChildren) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`block rounded-md px-4 py-2 font-sans text-[14px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                        isActive(item.href)
                          ? scrolled ? 'text-navy' : 'text-white'
                          : scrolled ? 'text-navy/80 hover:text-navy' : 'text-white hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={desktopOpen}
                    aria-haspopup="true"
                    onClick={() => setDesktopOpen((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-2 font-sans text-[14px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                      desktopOpen || isActive('/services')
                        ? scrolled ? 'text-navy' : 'text-white'
                        : scrolled ? 'text-navy/80 hover:text-navy' : 'text-white hover:text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        desktopOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {desktopOpen && (
                    <div
                      className="absolute left-1/2 top-full w-[min(92vw,570px)] -translate-x-1/2 pt-5"
                      onMouseEnter={openMenu}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="animate-menuIn rounded-xl bg-white p-2 shadow-menu">
                        <ul>
                          {services.map((service, i) => (
                            <li key={service.href}>
                              <Link
                                href={service.href}
                                target={service.href.startsWith('http') ? '_blank' : undefined}
                                rel={service.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`group flex items-center justify-between gap-6 px-6 py-[15px] text-[16px] leading-snug transition-colors duration-300 hover:text-rose-deep ${
                                  i !== 0 ? 'border-t border-navy/10' : ''
                                } ${
                                  service.label === 'Health & Wellness Services' 
                                    ? 'bg-cream/40 font-semibold text-navy' 
                                    : 'text-navy'
                                }`}
                              >
                                <span>{service.label}</span>
                                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---------------- Call to action / mobile toggle ---------------- */}
        <div className="flex items-center gap-4 sm:gap-5 lg:gap-3">
          <a
            href={site.phoneHref}
            onClick={trackClickToCall}
            className="hidden rounded-full w-[263px] h-[50px]  items-center justify-center bg-navy px-7 py-[13px] font-sans text-[14px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-navy-deep lg:flex"
          >
            Call: {site.phone}
          </a>

          {/* Below the CALL pill's breakpoint the number collapses to a glyph. */}
          <a
            href={site.phoneHref}
            onClick={trackClickToCall}
            aria-label={`Call ${site.phone}`}
            className={`grid h-10 w-10 place-items-center transition-opacity hover:opacity-75 xl:hidden ${
              scrolled ? 'text-navy' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'
            }`}
          >
            <PhoneIcon className="h-[25px] w-[25px]" />
          </a>

          <button
            type="button"
            onClick={() => mobileOpen ? closeMobileDrawer() : setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={`grid h-12 w-12 place-items-center transition-opacity hover:opacity-75 lg:hidden ${
              scrolled ? 'text-navy' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'
            }`}
          >
            {mobileOpen ? <CloseIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
          </button>
        </div>
      </div>
      </header>

      {/* ---------------- Mobile drawer ---------------- */}
      {(mobileOpen || mobileClosing) && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[60] bg-black/50 lg:hidden ${
              mobileClosing ? 'animate-fadeOutBlack' : 'animate-fadeInBlack'
            }`}
            onClick={() => !mobileClosing && closeMobileDrawer()}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className={`fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden ${
            mobileClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
          }`}>
            {/* Drawer Header */}
            <div className="flex h-[70px] sm:h-[76px] items-center border-b border-navy/10 px-6 lg:h-[92px]">
              <button
                type="button"
                onClick={() => closeMobileDrawer()}
                aria-label="Close menu"
                className="flex items-center gap-4 text-navy transition-opacity hover:opacity-75"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="font-sans text-[13px] sm:text-[15px] font-bold tracking-wide">MAIN MENU</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-10">
              <ul className="flex flex-col gap-8 pt-4">
                {primaryNav.map((item) => {
                  const hasChildren = 'children' in item && !!item.children;

                  if (!hasChildren) {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="font-sans text-[16px] font-medium uppercase tracking-[0.02em] text-navy"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                        className="flex w-full items-center justify-between font-sans text-[16px] font-medium uppercase tracking-[0.02em] text-navy"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            mobileServicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileServicesOpen && (
                        <ul className="mt-6 flex flex-col gap-5 pl-4">
                          {services.map((service) => (
                            <li key={service.href}>
                              <Link
                                href={service.href}
                                target={service.href.startsWith('http') ? '_blank' : undefined}
                                rel={service.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`block font-sans text-[15px] leading-snug transition-colors ${
                                  service.label === 'Health & Wellness Services'
                                    ? 'font-semibold text-navy'
                                    : 'text-navy/80 hover:text-navy'
                                }`}
                              >
                                {service.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Contact Card */}
              <div className="mt-12 rounded-xl bg-navy p-6">
                <a href={site.phoneHref} onClick={trackClickToCall} className="mb-5 flex items-center gap-4 text-white hover:text-rose-light">
                  <PhoneIcon className="h-5 w-5 shrink-0" />
                  <span className="font-sans text-[13px] sm:text-[15px]">{site.phone}</span>
                </a>
                <div className="flex items-start gap-4 text-white">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="flex flex-col font-sans text-[12px] sm:text-[14px] leading-relaxed">
                    <span>{locations[0].address[0]},</span>
                    <span>{locations[0].address[1]}</span>
                  </div>
                </div>
              </div>

              {/* Footer Area */}
              <div className="mt-10 border-t border-navy/10 pt-8">
                <div className="mb-5 flex items-center gap-4">
                  {socials.map((social) => {
                    const Icon = {
                      facebook: FacebookIcon,
                      instagram: InstagramIcon,
                      linkedin: LinkedinIcon,
                    }[social.icon];
                    return (
                      <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener" className="text-navy hover:text-rose-deep">
                        <Icon className="h-[22px] w-[22px]" />
                      </a>
                    );
                  })}
                </div>
                <p className="font-sans text-[11px] sm:text-[13px] leading-snug text-navy">
                  Copyright © 2026 Savannah Age Management Medicine
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
