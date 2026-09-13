"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Loader2, AlertCircle, Utensils, ShieldAlert } from "lucide-react";
import type { ApiResponse, MenuCategory, MenuItem } from "@/lib/types";

const CATEGORIES = ["All", "Burgers", "Drinks", "Sides", "Daily Specials"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAllergen, setSelectedAllergen] = useState<string>("All");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        const body: ApiResponse<MenuCategory[]> = await res.json();

        if (!res.ok || !body.success || !body.data) {
          throw new Error(!body.success ? body.error : "Failed to load menu data.");
        }

        if (!cancelled) {
          setCategories(body.data);
          setStatus("ready");
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(err instanceof Error ? err.message : "Menu service unavailable.");
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
        throw new Error(!body.success ? body.error : "Failed to load menu data.");
      }
      setCategories(body.data);
      setStatus("ready");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Menu service unavailable.");
    }
  };

  // Flatten and filter items
  const filteredItems = useMemo(() => {
    const list: { item: MenuItem; category: string }[] = [];

    categories.forEach((cat) => {
      if (activeCategory === "All" || activeCategory === cat.category) {
        cat.items.forEach((item) => {
          // Check search query
          const matchesQuery =
            searchQuery.trim() === "" ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.category.toLowerCase().includes(searchQuery.toLowerCase());

          // Check allergen exclusion filter
          const matchesAllergen =
            selectedAllergen === "All" ||
            !item.allergens.includes(selectedAllergen.toLowerCase());

          if (matchesQuery && matchesAllergen) {
            list.push({ item, category: cat.category });
          }
        });
      }
    });

    return list;
  }, [categories, activeCategory, searchQuery, selectedAllergen]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-char text-cream">
        {/* Page Hero Header */}
        <section className="relative bg-olive py-16 lg:py-24 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f28c28_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="mx-auto max-w-5xl container-px relative z-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cheddar">
              Craft Kitchen &amp; Taproom
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mt-2 leading-tight">
              Our Full Menu
            </h1>
            <p className="mt-4 text-cream-dim text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every burger is smashed with certified fresh Angus beef, served on toasted brioche with scratch sauces, alongside 20 cold rotating craft drafts.
            </p>

            {/* Quick Search & Filter Controls */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative flex items-center rounded-full bg-char/80 border border-white/15 px-4 py-2 shadow-xl focus-within:border-cheddar focus-within:ring-1 focus-within:ring-cheddar transition-all">
                <Search size={18} className="text-cream-dim/60 shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="Search burgers, craft beers, loaded fries…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-cream-dim/60 hover:text-cream ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs & Dietary Filters Bar */}
        <section className="sticky top-18 z-20 bg-char/95 backdrop-blur-md border-b border-white/10 py-4 shadow-md">
          <div className="mx-auto max-w-6xl container-px flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-cheddar text-char shadow-md font-bold"
                      : "bg-white/5 text-cream hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dietary Preference Filter */}
            <div className="flex items-center gap-2 text-xs text-cream-dim shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-cream-dim/60 hidden sm:inline">
                Exclude:
              </span>
              {["All", "Gluten", "Dairy", "Egg"].map((alg) => (
                <button
                  key={alg}
                  onClick={() => setSelectedAllergen(alg)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] transition-colors ${
                    selectedAllergen === alg
                      ? "bg-olive-light text-cream font-semibold border border-cheddar/40"
                      : "bg-char-soft text-cream-dim/70 hover:text-cream"
                  }`}
                >
                  {alg === "All" ? "No Filter" : `No ${alg}`}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items Container */}
        <section className="mx-auto max-w-6xl container-px py-16">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-24 text-cream-dim">
              <Loader2 size={36} className="animate-spin text-cheddar mb-3" />
              <p className="font-serif text-lg">Preparing the kitchen pass…</p>
            </div>
          )}

          {status === "error" && (
            <div className="mx-auto max-w-md rounded-3xl bg-char-soft border border-red-500/30 p-8 text-center shadow-xl">
              <AlertCircle size={40} className="mx-auto text-red-400 mb-3" />
              <h3 className="font-serif text-xl font-bold text-cream">Unable to load menu</h3>
              <p className="text-cream-dim text-sm mt-2">{errorMessage}</p>
              <button
                onClick={handleRetry}
                className="mt-6 rounded-full bg-cheddar px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {status === "ready" && filteredItems.length === 0 && (
            <div className="text-center py-20 rounded-3xl bg-white/5 border border-white/5 p-8 max-w-md mx-auto">
              <Utensils size={36} className="mx-auto text-cream-dim/40 mb-3" />
              <h3 className="font-serif text-xl font-bold text-cream">No dishes found</h3>
              <p className="text-cream-dim text-xs mt-1">
                Try searching for a different keyword or resetting your allergen filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setSelectedAllergen("All");
                }}
                className="mt-5 rounded-full bg-white/10 px-5 py-2 text-xs font-medium text-cream hover:bg-white/20 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {status === "ready" && filteredItems.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map(({ item, category }) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-char-soft border border-white/10 p-6 shadow-xl transition-all duration-300 hover:border-cheddar/50 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Dish Image */}
                    <div className="relative mb-5 h-52 w-full overflow-hidden rounded-2xl bg-char">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-char/85 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-cheddar border border-cheddar/30 shadow-lg">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-md bg-olive-light/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
                        {category}
                      </div>
                    </div>

                    {/* Dish Title & Description */}
                    <h2 className="font-serif text-2xl font-bold text-cream group-hover:text-cheddar transition-colors">
                      {item.name}
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-cream-dim/80">
                      {item.description}
                    </p>
                  </div>

                  {/* Allergen Badges & Quick Action */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.allergens.length > 0 ? (
                          item.allergens.map((alg) => (
                            <span
                              key={alg}
                              className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-medium text-cream-dim/70 capitalize"
                            >
                              {alg}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-olive-light font-semibold">
                            Allergen-free
                          </span>
                        )}
                      </div>

                      <Link
                        href="/reservations"
                        className="shrink-0 text-xs font-semibold text-cheddar hover:underline inline-flex items-center gap-1"
                      >
                        Book Table &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Allergen & Kitchen Notice Callout */}
          <div className="mt-16 rounded-3xl bg-olive-light/20 border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <ShieldAlert size={28} className="text-cheddar shrink-0 mt-1" />
              <div>
                <h4 className="font-serif text-lg font-bold text-cream">Dietary &amp; Food Allergy Note</h4>
                <p className="text-xs text-cream-dim/80 mt-1 leading-relaxed max-w-2xl">
                  Please let our staff know about any food allergies before ordering. While we take every precaution in our scratch kitchen, items are prepared in facilities that handle gluten, dairy, nuts, and eggs.
                </p>
              </div>
            </div>
            <Link
              href="/reservations"
              className="shrink-0 rounded-full bg-cheddar px-6 py-3 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-colors shadow-lg"
            >
              Reserve Table
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
