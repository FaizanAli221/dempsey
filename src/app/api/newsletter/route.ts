import { readJson, jsonSuccess, jsonError, withErrorHandling } from "@/lib/api-response";
import { newsletterSchema } from "@/lib/validation";
import { newsletterStore } from "@/lib/store";
import { corsPreflight } from "@/lib/cors";

// Run on the Node.js runtime (default for Vercel Serverless Functions),
// as opposed to the Edge runtime — fine for this workload and keeps
// the in-memory store simple.
export const runtime = "nodejs";

/**
 * POST /api/newsletter
 * Body: { email: string }
 *
 * - 200 -> subscribed successfully
 * - 400 -> validation failed (bad/missing email, malformed JSON)
 * - 409 -> email already subscribed
 * - 500 -> unexpected server error
 */
export const POST = withErrorHandling(async (req: Request) => {
  const body = await readJson(req);
  const { email } = newsletterSchema.parse(body);

  if (newsletterStore.has(email)) {
    return jsonError("This email is already subscribed.", 409);
  }

  // Simulate the latency of a real database write.
  await new Promise((resolve) => setTimeout(resolve, 150));

  newsletterStore.add(email);

  return jsonSuccess(undefined, "Thank you for subscribing!", 200);
});

export function OPTIONS() {
  return corsPreflight();
}
