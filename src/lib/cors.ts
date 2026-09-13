/**
 * Centralized CORS configuration. Every API route uses these headers so
 * behavior is consistent and only needs to change in one place.
 *
 * "*" is fine for a public read/write API like this demo. If you need to
 * restrict this to your own frontend's origin in production, replace it
 * with `process.env.ALLOWED_ORIGIN` and set that env var in Vercel.
 */
export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

/** Standard response for CORS preflight (OPTIONS) requests. */
export function corsPreflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
