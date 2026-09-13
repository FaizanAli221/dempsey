"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { X, Calendar, Clock, Users, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { ApiResponse } from "@/lib/types";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  // Default to tomorrow 7:00 PM for easy valid testing
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setStatus("idle");
    setMessage("");
    setFieldErrors({});
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

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
        }),
      });

      const data: ApiResponse<{ id: string }> = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(!data.success ? data.error : "Unable to complete reservation.");
        if (!data.success && data.details && typeof data.details === "object" && "fieldErrors" in data.details) {
          setFieldErrors((data.details as { fieldErrors: Record<string, string[]> }).fieldErrors ?? {});
        }
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Reservation confirmed!");
      if (data.data?.id) {
        setReservationId(data.data.id);
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please check your internet connection.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setGuests(2);
    setDate(getTomorrowDate());
    setTime("18:30");
    setStatus("idle");
    setMessage("");
    setReservationId("");
    setFieldErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Dialog Content */}
      <div className="relative w-full max-w-lg rounded-3xl bg-char border border-white/10 p-6 sm:p-8 shadow-2xl z-10 my-auto">
        <button
          onClick={handleClose}
          aria-label="Close reservation modal"
          className="absolute right-5 top-5 rounded-full p-2 text-cream-dim hover:bg-white/10 hover:text-cream transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cheddar/20 text-cheddar">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream">Table Reserved!</h3>
            <p className="mt-2 text-sm text-cream-dim leading-relaxed">{message}</p>

            <div className="my-6 rounded-2xl bg-olive-light/20 border border-white/10 p-5 text-left text-xs text-cream-dim space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-cream">Guest:</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-cream">Party Size:</span>
                <span>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-cream">Date &amp; Time:</span>
                <span>{date} at {time}</span>
              </div>
              {reservationId && (
                <div className="flex justify-between pt-2 border-t border-white/5">
                  <span className="font-semibold text-cream">Confirmation ID:</span>
                  <span className="font-mono text-[11px] text-cheddar">{reservationId.slice(0, 8)}</span>
                </div>
              )}
            </div>

            <button
              onClick={resetForm}
              className="w-full rounded-full bg-cheddar py-3 text-sm font-semibold tracking-wide text-char hover:bg-cheddar-dark transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-cheddar">
                Dempsey&apos;s Burger Pub
              </span>
              <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-1">
                Reserve Your Table
              </h3>
              <p className="text-xs text-cream-dim mt-1">
                Join us for smashed burgers, ice-cold pints, and great vibes.
              </p>
            </div>

            {status === "error" && message && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-950/50 border border-red-500/40 p-3 text-xs text-red-300">
                <AlertCircle size={16} className="shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label htmlFor="res-date" className="flex items-center gap-1.5 text-xs font-medium text-cream-dim mb-1">
                    <Calendar size={13} className="text-cheddar" /> Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl bg-char-soft border border-white/10 px-3.5 py-2.5 text-sm text-cream focus:border-cheddar focus:outline-none transition-colors"
                  />
                  {fieldErrors.date && (
                    <p className="mt-1 text-[11px] text-red-400">{fieldErrors.date[0]}</p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="res-time" className="flex items-center gap-1.5 text-xs font-medium text-cream-dim mb-1">
                    <Clock size={13} className="text-cheddar" /> Time
                  </label>
                  <input
                    id="res-time"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl bg-char-soft border border-white/10 px-3.5 py-2.5 text-sm text-cream focus:border-cheddar focus:outline-none transition-colors"
                  />
                  {fieldErrors.time && (
                    <p className="mt-1 text-[11px] text-red-400">{fieldErrors.time[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guests */}
                <div>
                  <label htmlFor="res-guests" className="flex items-center gap-1.5 text-xs font-medium text-cream-dim mb-1">
                    <Users size={13} className="text-cheddar" /> Guests
                  </label>
                  <select
                    id="res-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-xl bg-char-soft border border-white/10 px-3.5 py-2.5 text-sm text-cream focus:border-cheddar focus:outline-none transition-colors"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-char text-cream">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.guests && (
                    <p className="mt-1 text-[11px] text-red-400">{fieldErrors.guests[0]}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="res-phone" className="block text-xs font-medium text-cream-dim mb-1">
                    Phone Number
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    placeholder="(316) 555-0100"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-char-soft border border-white/10 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-[11px] text-red-400">{fieldErrors.phone[0]}</p>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="res-name" className="block text-xs font-medium text-cream-dim mb-1">
                  Full Name
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-char-soft border border-white/10 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-[11px] text-red-400">{fieldErrors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="res-email" className="block text-xs font-medium text-cream-dim mb-1">
                  Email Address
                </label>
                <input
                  id="res-email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-char-soft border border-white/10 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-[11px] text-red-400">{fieldErrors.email[0]}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cheddar py-3 text-sm font-semibold tracking-wide text-char hover:bg-cheddar-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                  {status === "loading" ? "Confirming Table…" : "Confirm Reservation"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
