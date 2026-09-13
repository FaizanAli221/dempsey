import type { Reservation } from "./types";

/**
 * In-memory mock store.
 *
 * IMPORTANT — read before relying on this in production:
 * Vercel serverless functions are stateless and ephemeral. Module-level
 * variables like the ones below persist only for the lifetime of a warm
 * function instance, and are NOT shared across concurrent instances or
 * regions. That means:
 *   - Two simultaneous requests may hit different instances and not see
 *     each other's data.
 *   - A cold start (or redeploy) wipes this data entirely.
 *
 * This is intentional for a small/CV-ready demo: it keeps the stack to
 * zero external dependencies and zero cost. To make this durable, swap
 * these functions for calls to:
 *   - Supabase (`@supabase/supabase-js`), or
 *   - Prisma + SQLite/Postgres (e.g. Vercel Postgres, Neon, Turso)
 * The function signatures below are deliberately storage-agnostic so
 * that swap only touches this one file.
 */

const subscribedEmails = new Set<string>();
const reservations: Reservation[] = [];

export const newsletterStore = {
  has(email: string): boolean {
    return subscribedEmails.has(email);
  },
  add(email: string): void {
    subscribedEmails.add(email);
  },
};

export const reservationStore = {
  add(reservation: Reservation): Reservation {
    reservations.push(reservation);
    return reservation;
  },
  all(): Reservation[] {
    return reservations;
  },
};
