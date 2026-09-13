import { jsonSuccess, jsonError, withErrorHandling } from "@/lib/api-response";
import { menuQuerySchema } from "@/lib/validation";
import { menu } from "@/lib/menu-data";
import { corsPreflight } from "@/lib/cors";

export const runtime = "nodejs";

/**
 * GET /api/menu
 * GET /api/menu?category=burgers
 *
 * - 200 -> full menu, or the single matching category as a one-item array
 * - 400 -> unknown category
 * - 500 -> unexpected server error
 */
export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const { category } = menuQuerySchema.parse({
    category: searchParams.get("category") ?? undefined,
  });

  if (!category) {
    return jsonSuccess(menu);
  }

  const match = menu.find((c) => c.category.toLowerCase() === category);

  if (!match) {
    const valid = menu.map((c) => c.category.toLowerCase()).join(", ");
    return jsonError(`Unknown category "${category}". Valid categories: ${valid}.`, 400);
  }

  return jsonSuccess([match]);
});

export function OPTIONS() {
  return corsPreflight();
}
