import { jsonSuccess, withErrorHandling } from "@/lib/api-response";
import { reviews } from "@/lib/reviews-data";
import { corsPreflight } from "@/lib/cors";

export const runtime = "nodejs";

/**
 * GET /api/reviews
 * Returns curated Google/Yelp reviews.
 * - 200 -> array of reviews
 * - 500 -> unexpected server error
 */
export const GET = withErrorHandling(async () => {
  return jsonSuccess(reviews);
});

export function OPTIONS() {
  return corsPreflight();
}
