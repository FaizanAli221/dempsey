"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Info,
  Armchair,
} from "lucide-react";
import { site, hours } from "@/lib/data";
import type { ApiResponse } from "@/lib/types";

const SEATING_OPTIONS = [
  "Main Dining Room",
  "High-Top Bar Area",
  "Covered Heated Patio",
  "Any Available Table",
] as const;

export default function ReservationsPage() {
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(getTomorrowDate());
  const [time, setTime] = useState("18:30");
  const [seatingPreference, setSeatingPreference] = useState<string>("Any Available Table");
  const [specialRequests, setSpecialRequests] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [confirmationId, setConfirmationId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          guests: Number(guests),
          date,
          time,
          seatingPreference,
          specialRequests: specialRequests.trim() || undefined,
        }),
      });

      const data: ApiResponse<{ id: string }> = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(!data.success ? data.error : "Failed to place reservation.");
        if (!data.success && data.details && typeof data.details === "object" && "fieldErrors" in data.details) {
          setFieldErrors((data.details as { fieldErrors: Record<string, string[]> }).fieldErrors ?? {});
        }
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Your table has been reserved!");
      if (data.data?.id) {
        setConfirmationId(data.data.id);
      }
    } catch {
      setStatus("error");
      setMessage("Network connection error. Please try again or give us a call.");
    }
  };

  const startNewReservation = () => {
    setName("");
    setEmail("");
    setPhone("");
    setGuests(2);
    setDate(getTomorrowDate());
    setTime("18:30");
    setSpecialRequests("");
    setStatus("idle");
    setMessage("");
    setConfirmationId("");
    setFieldErrors({});
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-char text-cream">
        {/* Page Hero */}
        <section className="relative bg-olive py-16 lg:py-24 border-b border-white/10 overflow-hidden">
          <div className="mx-auto max-w-4xl container-px relative z-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cheddar">
              Dine With Us
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mt-2 leading-tight">
              Table Reservations
            </h1>
            <p className="mt-4 text-cream-dim text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Book your spot at Dempsey&apos;s Burger Pub. We hold reservations for 15 minutes past scheduled time. Walk-ins are also warmly welcomed!
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl container-px">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 items-start">
              {/* Form Card or Success Confirmation */}
              <div className="rounded-3xl bg-char-soft border border-white/10 p-6 sm:p-10 shadow-2xl">
                {status === "success" ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cheddar/20 text-cheddar">
                      <CheckCircle2 size={48} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cheddar">
                      Reservation Confirmed
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-cream mt-1">
                      See You Soon, {name.split(" ")[0]}!
                    </h2>
                    <p className="mt-3 text-sm text-cream-dim max-w-md mx-auto leading-relaxed">
                      {message} A confirmation email has been logged. If your plans change, please give us a call.
                    </p>

                    <div className="my-8 rounded-2xl bg-char border border-white/10 p-6 text-left text-sm space-y-3">
                      <div className="flex justify-between border-b border-white/5 pb-2.5">
                        <span className="text-cream-dim">Guest Name:</span>
                        <span className="font-semibold text-cream">{name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2.5">
                        <span className="text-cream-dim">Party Size:</span>
                        <span className="font-semibold text-cream">
                          {guests} {guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2.5">
                        <span className="text-cream-dim">Date &amp; Time:</span>
                        <span className="font-semibold text-cheddar">
                          {date} at {time}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2.5">
                        <span className="text-cream-dim">Seating Area:</span>
                        <span className="font-semibold text-cream">{seatingPreference}</span>
                      </div>
                      {specialRequests && (
                        <div className="flex justify-between border-b border-white/5 pb-2.5">
                          <span className="text-cream-dim">Special Note:</span>
                          <span className="text-cream italic">{specialRequests}</span>
                        </div>
                      )}
                      {confirmationId && (
                        <div className="flex justify-between pt-1">
                          <span className="text-cream-dim">Confirmation Reference:</span>
                          <span className="font-mono text-xs text-cheddar">{confirmationId}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={startNewReservation}
                        className="rounded-full bg-cheddar px-8 py-3 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-all"
                      >
                        Book Another Table
                      </button>
                      <a
                        href="/menu"
                        className="rounded-full border border-white/20 px-8 py-3 text-xs font-bold uppercase tracking-wider text-cream hover:bg-white/10 transition-all text-center"
                      >
                        Preview Menu
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                        Reserve a Table
                      </h2>
                      <p className="text-xs sm:text-sm text-cream-dim mt-1.5">
                        Fill out the details below to request a table reservation.
                      </p>
                    </div>

                    {status === "error" && message && (
                      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-950/60 border border-red-500/40 p-4 text-xs sm:text-sm text-red-300">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{message}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Party Size Buttons */}
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream-dim mb-2">
                          <Users size={14} className="text-cheddar" /> Party Size
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setGuests(n)}
                              className={`h-11 w-11 rounded-xl font-bold text-sm transition-all ${
                                guests === n
                                  ? "bg-cheddar text-char shadow-md scale-105"
                                  : "bg-char border border-white/10 text-cream hover:border-cheddar/50"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                          <select
                            value={guests > 8 ? guests : 8}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className={`h-11 rounded-xl px-3 text-xs font-semibold bg-char border ${
                              guests > 8 ? "border-cheddar text-cheddar font-bold" : "border-white/10 text-cream"
                            }`}
                          >
                            <option value={8} disabled>More…</option>
                            {[9, 10, 11, 12, 14, 16, 20].map((n) => (
                              <option key={n} value={n}>
                                {n} Guests
                              </option>
                            ))}
                          </select>
                        </div>
                        {fieldErrors.guests && (
                          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.guests[0]}</p>
                        )}
                      </div>

                      {/* Date & Time Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="page-res-date" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream-dim mb-1.5">
                            <Calendar size={14} className="text-cheddar" /> Date
                          </label>
                          <input
                            id="page-res-date"
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream focus:border-cheddar focus:outline-none transition-colors"
                          />
                          {fieldErrors.date && (
                            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.date[0]}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="page-res-time" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream-dim mb-1.5">
                            <Clock size={14} className="text-cheddar" /> Time
                          </label>
                          <input
                            id="page-res-time"
                            type="time"
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream focus:border-cheddar focus:outline-none transition-colors"
                          />
                          {fieldErrors.time && (
                            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.time[0]}</p>
                          )}
                        </div>
                      </div>

                      {/* Seating Preference */}
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream-dim mb-2">
                          <Armchair size={14} className="text-cheddar" /> Seating Preference
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {SEATING_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setSeatingPreference(opt)}
                              className={`rounded-xl p-2.5 text-xs font-semibold text-center transition-all ${
                                seatingPreference === opt
                                  ? "bg-olive-light border border-cheddar text-cream shadow-sm"
                                  : "bg-char border border-white/10 text-cream-dim/80 hover:bg-white/5"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="border-t border-white/10 pt-6 space-y-4">
                        <h3 className="font-serif text-lg font-bold text-cream">
                          Contact Information
                        </h3>

                        <div>
                          <label htmlFor="page-res-name" className="block text-xs font-medium text-cream-dim mb-1">
                            Full Name (required)
                          </label>
                          <input
                            id="page-res-name"
                            type="text"
                            required
                            placeholder="Alex Morgan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                          />
                          {fieldErrors.name && (
                            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name[0]}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="page-res-email" className="block text-xs font-medium text-cream-dim mb-1">
                              Email Address (required)
                            </label>
                            <input
                              id="page-res-email"
                              type="email"
                              required
                              placeholder="alex@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                            />
                            {fieldErrors.email && (
                              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email[0]}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="page-res-phone" className="block text-xs font-medium text-cream-dim mb-1">
                              Phone Number (required)
                            </label>
                            <input
                              id="page-res-phone"
                              type="tel"
                              required
                              placeholder="(316) 555-0199"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                            />
                            {fieldErrors.phone && (
                              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.phone[0]}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="page-res-notes" className="block text-xs font-medium text-cream-dim mb-1">
                            Special Requests / Dietary Notes (optional)
                          </label>
                          <textarea
                            id="page-res-notes"
                            rows={3}
                            placeholder="Celebrating a birthday, need a high chair, or allergen details…"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors resize-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cheddar py-4 text-sm font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "loading" && <Loader2 size={18} className="animate-spin" />}
                        {status === "loading" ? "Confirming Table…" : "Book Reservation"}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Sidebar: Guidelines & Direct Call Info */}
              <div className="space-y-6">
                {/* Guidelines Box */}
                <div className="rounded-3xl bg-olive-light/25 border border-white/10 p-6 sm:p-8 shadow-xl">
                  <h3 className="font-serif text-xl font-bold text-cream flex items-center gap-2 mb-4">
                    <Info size={18} className="text-cheddar" /> Reservation Notes
                  </h3>
                  <ul className="text-xs sm:text-sm text-cream-dim/90 space-y-3 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cheddar font-bold mt-0.5">•</span>
                      <span>
                        <strong>15-Minute Grace Period:</strong> We hold tables for 15 minutes past reservation time before releasing them to waiting walk-in guests.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cheddar font-bold mt-0.5">•</span>
                      <span>
                        <strong>Large Groups (20+ Guests):</strong> For private events and large banquets, please call our pub directly so we can coordinate staffing and kitchen prep.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cheddar font-bold mt-0.5">•</span>
                      <span>
                        <strong>Patio Dining:</strong> Patio tables are weather permitting. If weather turns, we do our best to accommodate indoor seating.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Direct Call Card */}
                <div className="rounded-3xl bg-char-soft border border-white/10 p-6 sm:p-8 text-center shadow-xl">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-olive-light text-cheddar">
                    <Phone size={22} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-cream">Prefer to Book by Phone?</h4>
                  <p className="text-xs text-cream-dim mt-1">
                    Call our host desk during dining hours for same-day bookings or questions.
                  </p>
                  <a
                    href={`tel:${site.phone.replace(/[^\d]/g, "")}`}
                    className="mt-4 inline-flex items-center gap-2 text-base font-bold text-cheddar hover:underline"
                  >
                    {site.phone}
                  </a>
                </div>

                {/* Hours Card */}
                <div className="rounded-3xl bg-char-soft border border-white/10 p-6 text-xs text-cream-dim space-y-2 shadow-xl">
                  <p className="font-serif text-sm font-bold text-cream">Kitchen Operating Hours</p>
                  {hours.food.map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span>{h.day}</span>
                      <span className="text-cream">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
