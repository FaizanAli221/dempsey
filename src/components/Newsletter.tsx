"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error — check your connection and try again.");
    }
  };

  return (
    <section id="newsletter" className="bg-char-soft relative">
      <div className="mx-auto max-w-2xl container-px py-16 lg:py-20 text-center">
        <div className="mx-auto h-12 w-12 rounded-md bg-olive-light flex items-center justify-center mb-6">
          <span className="font-serif text-xl font-bold text-cream">d</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">Newsletter</h2>
        <p className="text-cream-dim mt-3">Sign up for our newsletter &amp; get exclusive offers and invites!</p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto text-left">
          <label htmlFor="newsletter-email" className="block text-xs text-cream-dim mb-1">
            Email (required)
          </label>
          <div className="flex items-end gap-3 border-b border-cream-dim/40 focus-within:border-cheddar pb-2 transition-colors">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="e.g. email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 bg-transparent text-cream placeholder:text-cream-dim/50 focus:outline-none disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-3 text-sm font-semibold tracking-wide text-char hover:bg-cheddar transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
            {status === "loading" ? "Submitting…" : "Submit"}
          </button>

          <div role="status" aria-live="polite" className="mt-4 min-h-[1.5rem]">
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-cheddar">
                <CheckCircle2 size={16} /> {message}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} /> {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
