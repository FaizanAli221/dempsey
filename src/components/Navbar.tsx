"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarCheck } from "lucide-react";
import { site } from "@/lib/data";

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-char/95 backdrop-blur-md border-b border-white/10">
        <div className="container-px flex h-18 items-center justify-between lg:justify-center lg:gap-8">
          {/* Left Links */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium">
            {site.navLinks.slice(0, 3).map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    active
                      ? "text-cheddar font-semibold"
                      : "text-cream-dim/90 hover:text-cheddar"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cheddar rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-olive-light ring-1 ring-white/10 shadow-inner hover:scale-105 transition-transform lg:mx-3"
          >
            <span className="font-serif text-2xl font-bold text-cream">d</span>
          </Link>

          {/* Right Links */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium">
            {site.navLinks.slice(3).map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    active
                      ? "text-cheddar font-semibold"
                      : "text-cream-dim/90 hover:text-cheddar"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cheddar rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center ml-4">
            {onOpenReservation ? (
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-1.5 rounded-full bg-cheddar px-5 py-2 text-xs font-bold text-char hover:bg-cheddar-dark transition-all shadow-md hover:shadow-cheddar/20"
              >
                <CalendarCheck size={14} />
                Book Table
              </button>
            ) : (
              <Link
                href="/reservations"
                className="inline-flex items-center gap-1.5 rounded-full bg-cheddar px-5 py-2 text-xs font-bold text-char hover:bg-cheddar-dark transition-all shadow-md hover:shadow-cheddar/20"
              >
                <CalendarCheck size={14} />
                Book Table
              </Link>
            )}
          </div>

          {/* Mobile Right CTA & Hamburger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            {onOpenReservation ? (
              <button
                onClick={onOpenReservation}
                className="rounded-full bg-cheddar px-3.5 py-1.5 text-xs font-bold text-char hover:bg-cheddar-dark transition-colors"
              >
                Book
              </button>
            ) : (
              <Link
                href="/reservations"
                className="rounded-full bg-cheddar px-3.5 py-1.5 text-xs font-bold text-char hover:bg-cheddar-dark transition-colors"
              >
                Book
              </Link>
            )}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="-mr-1.5 p-2 text-cream hover:text-cheddar transition-colors"
            >
              <Menu size={26} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-[visibility] ${open ? "visible" : "invisible delay-300"}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-olive shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="font-serif text-lg font-bold text-cream">Dempsey&apos;s</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1 text-cream">
                <X size={24} strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex flex-col px-6 py-4">
              {site.navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`py-3.5 text-lg font-serif border-b border-white/5 last:border-none flex items-center justify-between ${
                      active ? "text-cheddar font-bold" : "text-cream hover:text-cheddar"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-cheddar" />}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t border-white/10">
            {onOpenReservation ? (
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-cheddar py-3.5 text-sm font-bold text-char hover:bg-cheddar-dark transition-colors shadow-lg"
              >
                <CalendarCheck size={16} />
                Reserve a Table
              </button>
            ) : (
              <Link
                href="/reservations"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-cheddar py-3.5 text-sm font-bold text-char hover:bg-cheddar-dark transition-colors shadow-lg"
              >
                <CalendarCheck size={16} />
                Reserve a Table
              </Link>
            )}
            <p className="text-center text-xs text-cream-dim/60 mt-4">
              {site.address} · {site.phone}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
