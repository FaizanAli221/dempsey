import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { site, hours } from "@/lib/data";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.8h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.14c-.28-.04-1.23-.12-2.34-.12-2.3 0-3.88 1.4-3.88 4V10.2H8.1v3h2.28V21h3.12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const mapQuery = encodeURIComponent(site.address);

  return (
    <footer id="footer" className="bg-char border-t border-white/10">
      {/* Interactive Map banner */}
      <div className="h-64 sm:h-80 w-full relative">
        <iframe
          title="Dempsey's Burger Pub location map"
          className="h-full w-full grayscale-[25%] contrast-[1.1] border-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        />
        <div className="absolute top-4 left-4 rounded-xl bg-char/90 backdrop-blur-sm border border-white/10 p-3 text-xs text-cream hidden sm:flex items-center gap-2 shadow-lg">
          <MapPin size={14} className="text-cheddar" />
          <span>3700 East Douglas Ave, Wichita, KS</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl container-px py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-olive-light text-cream font-serif font-bold text-lg">
                d
              </div>
              <span className="font-serif text-xl font-bold text-cream">Dempsey&apos;s</span>
            </div>
            <p className="text-xs text-cream-dim leading-relaxed mb-6">
              Gourmet smashed beef burgers, hand-cut fries, and 20 rotating craft beer taps right in the heart of Wichita, Kansas.
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cheddar hover:text-char transition-colors text-cream"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cheddar hover:text-char transition-colors text-cream"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Google Reviews"
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cheddar hover:text-char transition-colors text-cream text-xs font-bold"
              >
                G
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-serif text-base font-bold text-cream mb-4">Explore</h3>
            <ul className="space-y-2.5 text-xs text-cream-dim">
              <li>
                <Link href="/" className="hover:text-cheddar transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-cheddar transition-colors">
                  Full Menu &amp; Drinks
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cheddar transition-colors">
                  Our Story &amp; Craft
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-cheddar transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cheddar transition-colors">
                  Contact &amp; Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours Col */}
          <div>
            <h3 className="font-serif text-base font-bold text-cream mb-4 flex items-center gap-1.5">
              <Clock size={15} className="text-cheddar" /> Hours
            </h3>
            <p className="text-[11px] font-semibold tracking-wider text-cheddar mb-1 uppercase">Kitchen</p>
            <ul className="text-cream-dim text-xs space-y-1 mb-3">
              {hours.food.map((h) => (
                <li key={h.day} className="flex justify-between gap-2">
                  <span>{h.day}</span>
                  <span className="text-cream-dim/70">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] font-semibold tracking-wider text-cheddar mb-1 uppercase">Bar Service</p>
            <ul className="text-cream-dim text-xs space-y-1">
              {hours.bar.map((h) => (
                <li key={h.day} className="flex justify-between gap-2">
                  <span>{h.day}</span>
                  <span className="text-cream-dim/70">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-serif text-base font-bold text-cream mb-4">Visit Us</h3>
            <p className="text-cream-dim text-xs leading-relaxed flex items-start gap-2">
              <MapPin size={14} className="text-cheddar shrink-0 mt-0.5" />
              <span>3700 East Douglas Ave<br />Wichita, KS 67208</span>
            </p>
            <p className="flex items-center gap-2 text-cream-dim text-xs mt-3">
              <Phone size={14} className="text-cheddar shrink-0" />
              <a href={`tel:${site.phone.replace(/[^\d]/g, "")}`} className="hover:text-cheddar transition-colors">
                {site.phone}
              </a>
            </p>
            <p className="flex items-center gap-2 text-cream-dim text-xs mt-2.5">
              <Mail size={14} className="text-cheddar shrink-0" />
              <span className="text-cream-dim/80">info@dempseyswichita.com</span>
            </p>

            <Link
              href="/reservations"
              className="mt-5 inline-block rounded-full bg-white/10 hover:bg-cheddar hover:text-char px-5 py-2 text-xs font-semibold text-cream transition-colors"
            >
              Book Table
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-5">
        <div className="mx-auto max-w-6xl container-px flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-dim/60">
          <p>© {new Date().getFullYear()} Dempsey&apos;s Burger Pub. All rights reserved.</p>
          <p>Wichita, Kansas · Smashed to order, poured cold.</p>
        </div>
      </div>
    </footer>
  );
}
