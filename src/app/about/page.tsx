import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flame, Beer, HeartHandshake, UtensilsCrossed, Award, ArrowRight } from "lucide-react";
import { site } from "@/lib/data";

export const metadata = {
  title: "Our Story & Craft | Dempsey's Burger Pub Wichita",
  description:
    "Learn about Dempsey's Burger Pub on Douglas Ave in Wichita, KS. Never-frozen smashed Angus beef, scratch sauces, and 20 rotating craft beer taps.",
};

const PILLARS = [
  {
    icon: Flame,
    title: "Never-Frozen Smashed Beef",
    copy: "Our proprietary beef blend is delivered fresh, never frozen, and smashed on a scorching 500-degree flattop to seal in juices with signature crispy lacy edges.",
  },
  {
    icon: Beer,
    title: "20 Rotating Craft Taps",
    copy: "From local Kansas IPAs to world-renowned stouts and sours, our tap list rotates weekly so there is always a new draft to discover.",
  },
  {
    icon: UtensilsCrossed,
    title: "Scratch-Made Everything",
    copy: "House-pickled jalapeños, craft beer cheese, Kennebec hand-cut fries, and custom aiolis are prepped fresh in our kitchen every single morning.",
  },
  {
    icon: HeartHandshake,
    title: "Wichita Neighborhood Spirit",
    copy: "We built Dempsey's to be Wichita's go-to gathering spot — whether you're celebrating with coworkers, catching game day, or unwinding on our patio.",
  },
];

const STATS = [
  { value: "20+", label: "Craft Beers on Tap" },
  { value: "100%", label: "Fresh Never-Frozen Beef" },
  { value: "7 Days", label: "Open for Lunch & Dinner" },
  { value: "#1", label: "Yelp Best Burger in Kansas" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-char text-cream">
        {/* Page Hero */}
        <section className="relative bg-olive py-20 lg:py-28 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-char/40 to-olive pointer-events-none" />
          <div className="mx-auto max-w-5xl container-px relative z-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cheddar">
              Douglas Avenue, Wichita KS
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mt-3 leading-tight">
              Welcome to Dempsey&apos;s Burger Pub
            </h1>
            <p className="mt-6 text-cream-dim text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
              We started with a simple belief: a burger pub should take zero shortcuts. From our hand-cut Kennebec fries to toasted brioche buns and craft pints, every detail is made with pride.
            </p>
          </div>
        </section>

        {/* Story & Heritage Section */}
        <section className="py-20 lg:py-28 bg-char">
          <div className="mx-auto max-w-6xl container-px">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-olive-light">
                  Our Roots
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mt-2 leading-snug">
                  Built on Good Food, Cold Beer, and Good Company
                </h2>
                <p className="mt-5 text-sm sm:text-base text-cream-dim leading-relaxed">
                  Located at 3700 East Douglas Avenue, Dempsey&apos;s Burger Pub has grown into a Wichita landmark for burger enthusiasts and craft beer lovers alike. What started as a vision for an authentic neighborhood pub has become an institution celebrated for high standards and warm Kansas hospitality.
                </p>
                <p className="mt-4 text-sm sm:text-base text-cream-dim leading-relaxed">
                  We don&apos;t use frozen patties, bagged fries, or prefabricated sauces. When you order our Classic Cheddar Smash or the Bourbon Apple Brie, you taste the difference made by fresh ingredients, skilled line cooks, and true passion for the craft.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 rounded-full bg-cheddar px-7 py-3 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-all shadow-lg"
                  >
                    Browse The Menu <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/reservations"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-xs font-bold uppercase tracking-wider text-cream hover:bg-white/10 transition-all"
                  >
                    Reserve a Table
                  </Link>
                </div>
              </div>

              {/* High-res Atmospheric Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl shadow-xl aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
                      alt="Juicy gourmet burger stacked high"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl shadow-xl aspect-square">
                    <img
                      src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop"
                      alt="Craft beers on tap"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-3xl shadow-xl aspect-square">
                    <img
                      src="https://images.unsplash.com/photo-1574521091464-a55e7763c1e5?q=80&w=800&auto=format&fit=crop"
                      alt="Bartender pouring cold draft beer"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl shadow-xl aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                      alt="Cozy, bustling pub interior"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-olive py-12 border-y border-white/10">
          <div className="mx-auto max-w-6xl container-px">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cheddar">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-cream-dim/90 font-medium tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Four Craft Pillars */}
        <section className="py-20 lg:py-28 bg-char-soft">
          <div className="mx-auto max-w-6xl container-px">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cheddar">
                The Dempsey Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mt-2">
                What Sets Our Pub Apart
              </h2>
              <p className="text-cream-dim text-sm mt-3">
                Behind every bite and every pour is an unwavering commitment to authenticity and culinary craftsmanship.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="rounded-3xl bg-char border border-white/10 p-7 shadow-xl hover:border-cheddar/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-2xl bg-olive-light/50 flex items-center justify-center text-cheddar mb-5">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-cream">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-cream-dim/80">
                        {p.copy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Press Accolade */}
        <section className="py-16 bg-olive border-t border-white/10">
          <div className="mx-auto max-w-4xl container-px text-center">
            <Award size={36} className="mx-auto text-cheddar mb-4" />
            <blockquote className="font-serif text-2xl sm:text-3xl font-bold text-cream leading-snug">
              &ldquo;Does a Wichita spot serve the best cheeseburger in Kansas? Yelp reviewers think so.&rdquo;
            </blockquote>
            <p className="mt-4 text-xs sm:text-sm text-cream-dim font-medium">
              — The Wichita Eagle / Yelp Top 100 Burgers in America
            </p>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-20 bg-char text-center">
          <div className="mx-auto max-w-3xl container-px">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
              Pull Up a Stool. Enjoy Yourself.
            </h2>
            <p className="mt-4 text-sm text-cream-dim leading-relaxed">
              We&apos;re open 7 days a week at {site.address}. Walk-ins are always welcomed, or book your table ahead of time to guarantee your spot.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/reservations"
                className="rounded-full bg-cheddar px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-all shadow-xl"
              >
                Book Your Table Online
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-white/10 transition-all"
              >
                View Hours &amp; Location
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
