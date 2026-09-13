import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { CORS_HEADERS } from "./cors";
import type { ApiResponse } from "./types";

/** Build a consistent 2xx JSON response, with CORS headers attached. */
export function jsonSuccess<T>(
  data?: T,
  message?: string,
  status = 200
): NextResponse<ApiResponse<T>> {
  const body: ApiResponse<T> = { success: true, message, data };
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

/** Build a consistent 4xx/5xx JSON response, with CORS headers attached. */
export function jsonError(
  error: string,
  status = 400,
  details?: unknown
): NextResponse<ApiResponse> {
  const body: ApiResponse = { success: false, error, details };
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

type RouteHandler = (req: Request) => Promise<Response> | Response;

/**
 * Lightweight error-handling middleware for App Router route handlers.
 * Wrap any GET/POST handler with this so:
 *   - Zod validation failures -> 400 with field-level details
 *   - Malformed JSON bodies    -> 400
 *   - Anything unexpected      -> 500, logged server-side, never leaked
 *     to the client as a raw stack trace.
 *
 * Usage:
 *   export const POST = withErrorHandling(async (req) => { ... });
 */
export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (err) {
      if (err instanceof ZodError) {
        return jsonError("Validation failed.", 400, err.flatten());
      }
      if (err instanceof SyntaxError) {
        return jsonError("Request body must be valid JSON.", 400);
      }
      // Unexpected errors are logged for debugging (visible in Vercel's
      // function logs) but never exposed to the client in detail.
      console.error("[api] Unhandled error:", err);
      return jsonError("Internal server error.", 500);
    }
  };
}

/** Safely parse a request body as JSON, throwing a SyntaxError on failure. */
export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new SyntaxError("Request body must be valid JSON.");
  }
}
