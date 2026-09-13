import { Phone } from "lucide-react";
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
    <footer id="footer" className="bg-olive">
      {/* Map */}
      <div className="h-64 sm:h-80 w-full">
        <iframe
          title="Dempsey's Burger Pub location map"
          className="h-full w-full grayscale-[30%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        />
      </div>

      <div className="mx-auto max-w-6xl container-px py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-cream mb-3">Location</h3>
            <p className="text-cream-dim text-sm leading-relaxed">
              3700 East Douglas Ave
              <br />
              Wichita, KS 67208
            </p>
            <p className="flex items-center gap-2 text-cream-dim text-sm mt-4">
              <Phone size={14} className="text-cheddar" /> {site.phone}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-cream mb-3">Hours</h3>
            <p className="text-xs font-semibold tracking-wide text-cheddar mb-1">FOOD HOURS</p>
            <ul className="text-cream-dim text-sm space-y-0.5 mb-4">
              {hours.food.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold tracking-wide text-cheddar mb-1">BAR HOURS</p>
            <ul className="text-cream-dim text-sm space-y-0.5 mb-4">
              {hours.bar.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
            <ul className="text-cream-dim/70 text-xs space-y-0.5">
              {hours.holidays.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-cream mb-3">Find Us On…</h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cheddar hover:text-char transition-colors text-cream"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cheddar hover:text-char transition-colors text-cream"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Google Reviews"
                className="h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cheddar hover:text-char transition-colors text-cream text-sm font-bold"
              >
                G
              </a>
            </div>

            <h3 className="font-serif text-lg font-bold text-cream mb-2 mt-8">Contact Us</h3>
            <a href={`tel:${site.phone.replace(/[^\d]/g, "")}`} className="text-cream-dim text-sm hover:text-cheddar transition-colors">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl container-px py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-dim/70">
          <p>© {new Date().getFullYear()} Dempsey&apos;s Burger Pub. All rights reserved.</p>
          <p>3700 East Douglas Ave, Wichita, KS 67208</p>
        </div>
      </div>
    </footer>
  );
}
