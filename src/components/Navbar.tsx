"use client";

import { useEffect, useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import { site } from "@/lib/data";

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-char border-b border-white/10">
        <div className="container-px flex h-16 items-center justify-between lg:justify-center lg:gap-8">
          <div className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide text-cream-dim">
            {site.navLinks.slice(0, 3).map((link) => (
              <a key={link.label} href={link.href} className="hover:text-cheddar transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <a href="#top" aria-label={`${site.name} home`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-olive-light lg:mx-2">
            <span className="font-serif text-xl font-bold text-cream">d</span>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide text-cream-dim">
            {site.navLinks.slice(3).map((link) => (
              <a key={link.label} href={link.href} className="hover:text-cheddar transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {onOpenReservation && (
            <button
              onClick={onOpenReservation}
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-cheddar px-4 py-1.5 text-xs font-bold text-char hover:bg-cheddar-dark transition-colors shadow-sm ml-2"
            >
              <CalendarCheck size={14} />
              Book Table
            </button>
          )}

          <div className="flex items-center gap-2 lg:hidden">
            {onOpenReservation && (
              <button
                onClick={onOpenReservation}
                className="rounded-full bg-cheddar px-3 py-1.5 text-xs font-bold text-char hover:bg-cheddar-dark transition-colors"
              >
                Book
              </button>
            )}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-mr-2 p-2 text-cream"
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
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-xs bg-olive shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="font-serif text-lg text-cream">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1 text-cream">
              <X size={24} strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex flex-col px-6 py-4">
            {site.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-serif text-cream border-b border-white/5 last:border-none"
              >
                {link.label}
              </a>
            ))}

            {onOpenReservation && (
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenReservation();
                }}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-cheddar py-3 text-sm font-semibold text-char hover:bg-cheddar-dark transition-colors shadow-lg"
              >
                <CalendarCheck size={16} />
                Book a Table
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
