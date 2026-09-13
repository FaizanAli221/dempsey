"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Send,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import { site, hours } from "@/lib/data";
import Link from "next/link";

export default function ContactPage() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("General Inquiry");
  const [formMessage, setFormMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate inquiry submission
    setSubmitted(true);
  };

  const mapQuery = encodeURIComponent(site.address);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-char text-cream">
        {/* Page Hero */}
        <section className="relative bg-olive py-16 lg:py-24 border-b border-white/10 overflow-hidden">
          <div className="mx-auto max-w-4xl container-px relative z-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cheddar">
              Wichita, KS
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mt-2 leading-tight">
              Contact &amp; Hours
            </h1>
            <p className="mt-4 text-cream-dim text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Find directions, check our food and bar hours, or send our management team a note about events, catering, or feedback.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl container-px">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
              {/* Left Column: Hours, Location & Details */}
              <div className="space-y-8">
                {/* Location & Quick Actions */}
                <div className="rounded-3xl bg-char-soft border border-white/10 p-6 sm:p-8 shadow-xl">
                  <h2 className="font-serif text-2xl font-bold text-cream flex items-center gap-2 mb-4">
                    <MapPin size={22} className="text-cheddar" /> Location
                  </h2>
                  <p className="text-sm text-cream-dim leading-relaxed">
                    {site.address}
                  </p>
                  <p className="text-xs text-cream-dim/70 mt-1">
                    Situated in the historic College Hill neighborhood along Douglas Avenue.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-cheddar px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-colors inline-flex items-center gap-1.5"
                    >
                      <MapPin size={14} /> Get Directions
                    </a>
                    <a
                      href={`tel:${site.phone.replace(/[^\d]/g, "")}`}
                      className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone size={14} className="text-cheddar" /> {site.phone}
                    </a>
                  </div>
                </div>

                {/* Hours Schedule */}
                <div className="rounded-3xl bg-char-soft border border-white/10 p-6 sm:p-8 shadow-xl">
                  <h2 className="font-serif text-2xl font-bold text-cream flex items-center gap-2 mb-6">
                    <Clock size={22} className="text-cheddar" /> Operating Schedule
                  </h2>

                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-cheddar">
                      Kitchen Food Service
                    </span>
                    <ul className="mt-2 space-y-2 text-xs sm:text-sm text-cream-dim">
                      {hours.food.map((h) => (
                        <li key={h.day} className="flex justify-between border-b border-white/5 pb-1.5">
                          <span>{h.day}</span>
                          <span className="font-medium text-cream">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-cheddar">
                      Taproom &amp; Bar Service
                    </span>
                    <ul className="mt-2 space-y-2 text-xs sm:text-sm text-cream-dim">
                      {hours.bar.map((h) => (
                        <li key={h.day} className="flex justify-between border-b border-white/5 pb-1.5">
                          <span>{h.day}</span>
                          <span className="font-medium text-cream">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-cream-dim/60 uppercase tracking-wider">
                      Holidays
                    </span>
                    <p className="mt-1 text-xs text-cream-dim/70">
                      {hours.holidays.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Parking & Transit */}
                <div className="rounded-3xl bg-olive-light/20 border border-white/10 p-6 sm:p-8 shadow-xl">
                  <h3 className="font-serif text-lg font-bold text-cream flex items-center gap-2 mb-2">
                    <Car size={18} className="text-cheddar" /> Parking &amp; Accessibility
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-dim leading-relaxed">
                    Complimentary parking is available directly in our adjacent pub lot as well as abundant street parking along Douglas Avenue. Our restaurant, bar, and outdoor patio are fully ADA wheelchair accessible.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Map & Inquiry Form */}
              <div className="space-y-8">
                {/* Embedded Map */}
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 relative">
                  <iframe
                    title="Dempsey's location map"
                    className="h-full w-full grayscale-[20%] contrast-[1.05]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  />
                </div>

                {/* Send Us A Message Form */}
                <div className="rounded-3xl bg-char-soft border border-white/10 p-6 sm:p-10 shadow-xl">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-cream-dim mb-6">
                    Have feedback, questions regarding catering, or looking to host a private party? We&apos;d love to hear from you.
                  </p>

                  {submitted ? (
                    <div className="py-8 text-center">
                      <CheckCircle2 size={40} className="mx-auto text-cheddar mb-3" />
                      <h3 className="font-serif text-xl font-bold text-cream">Message Received!</h3>
                      <p className="text-xs text-cream-dim mt-2 max-w-sm mx-auto">
                        Thank you for reaching out, {formName}. Our team will review your message and get back to you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormMessage("");
                        }}
                        className="mt-6 rounded-full bg-white/10 px-6 py-2 text-xs font-semibold text-cream hover:bg-white/20 transition-colors"
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-medium text-cream-dim mb-1">
                            Your Name (required)
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            placeholder="Sam Miller"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-medium text-cream-dim mb-1">
                            Email Address (required)
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="sam@example.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-medium text-cream-dim mb-1">
                          Subject / Inquiry Type
                        </label>
                        <select
                          id="contact-subject"
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream focus:border-cheddar focus:outline-none transition-colors"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Private Events & Catering">Private Events &amp; Catering</option>
                          <option value="Taproom & Craft Beer Question">Taproom &amp; Craft Beer Question</option>
                          <option value="Feedback on Recent Visit">Feedback on Recent Visit</option>
                          <option value="Employment / Job Application">Employment / Job Application</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-medium text-cream-dim mb-1">
                          Message (required)
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={4}
                          placeholder="How can we help you today?…"
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          className="w-full rounded-2xl bg-char border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-cheddar focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cheddar py-3.5 text-xs font-bold uppercase tracking-wider text-char hover:bg-cheddar-dark transition-all shadow-lg"
                      >
                        <Send size={15} /> Send Message
                      </button>
                    </form>
                  )}
                </div>

                {/* Quick Reservation Banner */}
                <div className="rounded-3xl bg-char border border-white/10 p-6 sm:p-8 flex items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <CalendarCheck size={28} className="text-cheddar shrink-0" />
                    <div>
                      <h4 className="font-serif text-base font-bold text-cream">Need a Table Tonight?</h4>
                      <p className="text-xs text-cream-dim/70">Reserve online instantly with live confirmation.</p>
                    </div>
                  </div>
                  <Link
                    href="/reservations"
                    className="shrink-0 rounded-full bg-olive-light px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-cheddar hover:text-char transition-colors shadow"
                  >
                    Reserve
                  </Link>
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
