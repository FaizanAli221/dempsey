"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from "lucide-react";
import type { ApiResponse, Review } from "@/lib/types";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        const body: ApiResponse<Review[]> = await res.json();

        if (!res.ok || !body.success) {
          throw new Error(!body.success ? body.error : "Failed to load reviews.");
        }

        if (!cancelled) {
          setReviews(body.data ?? []);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    loadReviews();
    return () => {
      cancelled = true;
    };
  }, []);

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  const current = reviews[index];

  return (
    <section id="reviews" className="bg-cream text-char">
      <div className="mx-auto max-w-3xl container-px py-16 lg:py-20 text-center">
        <p className="font-serif italic text-olive text-lg">Review by — Google</p>

        {status === "loading" && (
          <div className="flex justify-center py-10 text-char/40">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}

        {status === "error" && (
          <p className="text-char/60 text-sm py-10">
            Reviews are taking a break right now — check back shortly.
          </p>
        )}

        {status === "ready" && current && (
          <>
            <p className="font-semibold mt-3">{current.reviewer}</p>
            <div className="flex justify-center gap-1 mt-1 text-cheddar">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>

            <div className="flex items-center gap-4 sm:gap-8 mt-8">
              <button
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="shrink-0 p-2 rounded-full border border-char/15 text-char/60 hover:text-cheddar hover:border-cheddar transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex-1 flex items-center gap-3 sm:gap-5">
                <Quote size={28} className="hidden sm:block shrink-0 text-char/15 -scale-x-100" />
                <p className="text-char/80 leading-relaxed text-[15px] sm:text-base">{current.text}</p>
                <Quote size={28} className="hidden sm:block shrink-0 text-char/15" />
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Next review"
                className="shrink-0 p-2 rounded-full border border-char/15 text-char/60 hover:text-cheddar hover:border-cheddar transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === index ? "bg-cheddar" : "bg-char/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
