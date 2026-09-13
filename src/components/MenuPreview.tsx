"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, AlertCircle, Utensils, ArrowRight } from "lucide-react";
import type { ApiResponse, MenuCategory, MenuItem } from "@/lib/types";

const CATEGORIES = ["All", "Burgers", "Drinks", "Sides", "Daily Specials"] as const;
type SelectedCategory = (typeof CATEGORIES)[number];

export default function MenuPreview() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<SelectedCategory>("All");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        const body: ApiResponse<MenuCategory[]> = await res.json();

        if (!res.ok || !body.success || !body.data) {
          throw new Error(!body.success ? body.error : "Failed to load menu items.");
        }

        if (!cancelled) {
          setCategories(body.data);
          setStatus("ready");
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(err instanceof Error ? err.message : "Unable to reach the menu service.");
        }
      }
    }

    fetchMenu();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRetry = async () => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/menu");
      const body: ApiResponse<MenuCategory[]> = await res.json();

      if (!res.ok || !body.success || !body.data) {
        throw new Error(!body.success ? body.error : "Failed to load menu items.");
      }

      setCategories(body.data);
      setStatus("ready");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unable to reach the menu service.");
    }
  };

  const displayedItems: { item: MenuItem; category: string }[] = [];
  categories.forEach((cat) => {
    if (activeCategory === "All" || activeCategory === cat.category) {
      cat.items.forEach((item) => {
        displayedItems.push({ item, category: cat.category });
      });
    }
  });

  return (
    <section id="menu" className="bg-olive scroll-mt-16">
      {/* Intro Header */}
      <div className="mx-auto max-w-6xl container-px pt-16 lg:pt-24 pb-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-cheddar uppercase">
              Fresh From The Kitchen &amp; Tap
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight mt-2">
              Dempsey&apos;s Full Menu
            </h2>
            <p className="font-serif italic text-cheddar text-xl mt-2">Welcome. Enjoy Yourself.</p>
            <p className="mt-5 text-cream-dim leading-relaxed max-w-md">
              Prepare your taste buds for a burger experience like no other. At Dempsey&apos;s, we&apos;re
              dedicated to serving up mouthwatering burgers, hand-cut fries, and cold pints that will leave you
              craving more. Never-frozen beef, toasted buns, and a bar stocked for whatever the night calls for.
            </p>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[5/4] lg:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1000&auto=format&fit=crop"
              alt="Bacon cheeseburger with melting cheddar and BBQ sauce"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="border-t border-white/10 bg-olive-light/30 backdrop-blur-sm sticky top-16 z-20 py-4">
        <div className="mx-auto max-w-6xl container-px">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-cheddar text-char shadow-md"
                    : "bg-char/30 text-cream hover:bg-char/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="mx-auto max-w-6xl container-px py-12 lg:py-16">
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 text-cream-dim">
            <Loader2 size={32} className="animate-spin text-cheddar mb-3" />
            <p className="text-sm font-medium">Loading freshly prepared menu…</p>
          </div>
        )}

        {status === "error" && (
          <div className="mx-auto max-w-md rounded-2xl bg-char/40 border border-red-500/30 p-8 text-center">
            <AlertCircle size={36} className="mx-auto text-red-400 mb-3" />
            <h3 className="font-serif text-lg font-bold text-cream">Menu temporarily unavailable</h3>
            <p className="text-cream-dim text-sm mt-1">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="mt-6 rounded-full bg-cheddar px-6 py-2 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {status === "ready" && displayedItems.length === 0 && (
          <div className="text-center py-16 text-cream-dim">
            <Utensils size={32} className="mx-auto text-cream-dim/40 mb-3" />
            <p className="text-base font-serif">No items found in this category.</p>
          </div>
        )}

        {status === "ready" && displayedItems.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedItems.map(({ item, category }) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-char-soft/80 border border-white/5 p-5 shadow-xl transition-all duration-300 hover:border-cheddar/40 hover:-translate-y-1"
              >
                <div>
                  <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-char">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-char/80 px-3 py-1 text-xs font-bold text-cheddar backdrop-blur-sm border border-cheddar/20">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="absolute bottom-3 left-3 rounded-md bg-olive-light/90 px-2.5 py-0.5 text-[11px] font-semibold text-cream uppercase tracking-wider">
                      {category}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-cream group-hover:text-cheddar transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-cream-dim/80">
                    {item.description}
                  </p>
                </div>

                {item.allergens.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-cream-dim/50 mr-1">
                      Allergens:
                    </span>
                    {item.allergens.map((alg) => (
                      <span
                        key={alg}
                        className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-cream-dim/70 capitalize"
                      >
                        {alg}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {status === "ready" && (
          <div className="mt-14 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar transition-all shadow-xl hover:scale-105"
            >
              <span>Explore Full Menu &amp; Drink List</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
