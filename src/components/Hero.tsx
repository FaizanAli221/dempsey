import { MapPin, CalendarCheck } from "lucide-react";
import { site } from "@/lib/data";

interface HeroProps {
  onOpenReservation?: () => void;
}

export default function Hero({ onOpenReservation }: HeroProps) {
  return (
    <section id="top" className="relative">
      <div className="relative h-[78vh] min-h-[460px] w-full overflow-hidden lg:h-[85vh]">
        <img
          src="https://images.unsplash.com/photo-1721223016439-76be1d2b3bc8?q=80&w=1600&auto=format&fit=crop"
          alt="Warm, dimly lit interior of Dempsey's Burger Pub with patrons at wooden tables"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/20 to-char/50" />
        <div className="absolute inset-0 bg-char/10" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 text-center container-px">
          <p className="font-serif italic text-cheddar text-lg mb-3">Welcome. Enjoy Yourself.</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.05] max-w-3xl">
            Gourmet burgers, cold beer, good company
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-cream px-8 py-3 text-sm font-semibold tracking-wide text-char hover:bg-cheddar transition-colors shadow-lg"
            >
              View Menu
            </a>
            {onOpenReservation && (
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-char/40 backdrop-blur-sm px-8 py-3 text-sm font-semibold tracking-wide text-cream hover:bg-cheddar hover:border-cheddar hover:text-char transition-colors shadow-lg"
              >
                <CalendarCheck size={16} />
                Book a Table
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-olive-light/90 py-3">
        <div className="container-px flex items-center justify-center gap-2 text-center text-sm text-cream">
          <MapPin size={16} className="shrink-0 text-cheddar" />
          <span>{site.address}</span>
        </div>
      </div>
    </section>
  );
}
