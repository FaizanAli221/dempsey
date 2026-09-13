import Link from "next/link";
import { MapPin, CalendarCheck, Utensils } from "lucide-react";
import { site } from "@/lib/data";

interface HeroProps {
  onOpenReservation?: () => void;
}

export default function Hero({ onOpenReservation }: HeroProps) {
  return (
    <section id="top" className="relative">
      <div className="relative h-[80vh] min-h-[500px] w-full overflow-hidden lg:h-[85vh]">
        <img
          src="https://images.unsplash.com/photo-1721223016439-76be1d2b3bc8?q=80&w=1600&auto=format&fit=crop"
          alt="Warm, dimly lit interior of Dempsey's Burger Pub with patrons at wooden tables"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/40 to-char/60" />
        <div className="absolute inset-0 bg-char/10" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 lg:pb-20 text-center container-px">
          <span className="font-serif italic text-cheddar text-xl mb-3">Welcome. Enjoy Yourself.</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.05] max-w-3xl">
            Gourmet burgers, cold beer, good company
          </h1>
          <p className="mt-4 text-cream-dim text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Never-frozen smashed Angus beef, hand-cut Kennebec fries, and 20 rotating craft drafts on Douglas Avenue in Wichita.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar transition-all shadow-xl hover:scale-105"
            >
              <Utensils size={15} />
              Explore Full Menu
            </Link>
            {onOpenReservation ? (
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-char/40 backdrop-blur-sm px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-cheddar hover:border-cheddar hover:text-char transition-all shadow-xl hover:scale-105"
              >
                <CalendarCheck size={16} />
                Book a Table
              </button>
            ) : (
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-char/40 backdrop-blur-sm px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-cheddar hover:border-cheddar hover:text-char transition-all shadow-xl hover:scale-105"
              >
                <CalendarCheck size={16} />
                Book a Table
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="bg-olive-light/90 py-3.5">
        <div className="container-px flex items-center justify-center gap-2 text-center text-xs sm:text-sm text-cream font-medium">
          <MapPin size={16} className="shrink-0 text-cheddar" />
          <span>{site.address}</span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-cheddar hidden sm:inline">Dine-In · Heated Patio · Takeout</span>
        </div>
      </div>
    </section>
  );
}
