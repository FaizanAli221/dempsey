import { randomUUID } from "crypto";
import { readJson, jsonSuccess, withErrorHandling } from "@/lib/api-response";
import { reservationSchema } from "@/lib/validation";
import { reservationStore } from "@/lib/store";
import { corsPreflight } from "@/lib/cors";
import type { Reservation } from "@/lib/types";

export const runtime = "nodejs";

/**
 * POST /api/reservations
 * Body: { name, email, phone, guests, date, time }
 *
 * - 201 -> reservation request recorded
 * - 400 -> validation failed (missing/invalid fields, past date/time)
 * - 500 -> unexpected server error
 */
export const POST = withErrorHandling(async (req: Request) => {
  const body = await readJson(req);
  const data = reservationSchema.parse(body);

  const reservation: Reservation = {
    id: randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };

  reservationStore.add(reservation);

  return jsonSuccess(
    { id: reservation.id },
    "Reservation request received! We'll confirm shortly.",
    201
  );
});

/**
 * GET /api/reservations
 * Demo-only endpoint so the in-memory store is inspectable during local
 * development / a CV walkthrough. Remove or protect behind auth before
 * treating this as a real admin surface.
 */
export const GET = withErrorHandling(async () => {
  return jsonSuccess(reservationStore.all());
});

export function OPTIONS() {
  return corsPreflight();
}
