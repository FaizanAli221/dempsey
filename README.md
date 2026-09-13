# Dempsey's Burger Pub — Full-Stack Site

A modern, mobile-first Next.js (App Router) site for Dempsey's Burger Pub, with a
lightweight, CV-ready API layer built for zero-cost deployment on Vercel.

## Stack

- **Frontend:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, lucide-react
- **Backend:** Next.js Route Handlers (Vercel Serverless Functions), TypeScript, Zod
- **Storage:** in-memory mock store (see note below) — no database required

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000. The API is available under the same origin at `/api/*`.

To build/run for production locally:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/
    layout.tsx                — root layout, loads Google Fonts
    page.tsx                  — assembles all homepage sections
    globals.css                — design tokens (colors, fonts) via Tailwind v4 @theme
    api/
      newsletter/route.ts      — POST /api/newsletter
      menu/route.ts             — GET  /api/menu
      reviews/route.ts          — GET  /api/reviews
      reservations/route.ts      — POST/GET /api/reservations
  components/                     — Navbar, Hero, Press, MenuPreview, Specials,
                                     Gallery, Reviews (fetches /api/reviews live),
                                     Newsletter (posts to /api/newsletter), Footer
  lib/
    types.ts                      — shared TypeScript interfaces (API + domain models)
    validation.ts                  — Zod schemas for every request body/query
    api-response.ts                 — jsonSuccess/jsonError helpers + withErrorHandling middleware
    cors.ts                          — centralized CORS headers + OPTIONS helper
    store.ts                          — in-memory data store (newsletter emails, reservations)
    menu-data.ts                       — structured menu content
    reviews-data.ts                     — curated review content
    data.ts                              — misc frontend content (nav, gallery, hours)
```

## API Reference

All responses share one shape:

```ts
// success
{ success: true, message?: string, data?: T }
// error
{ success: false, error: string, details?: unknown }
```

CORS is enabled on every route (`Access-Control-Allow-Origin: *` by default —
see `src/lib/cors.ts` to restrict it to a specific origin in production).

### `POST /api/newsletter`

```json
// Request
{ "email": "jane@example.com" }

// 200 OK
{ "success": true, "message": "Thank you for subscribing!" }

// 400 Bad Request — invalid email / malformed JSON
{ "success": false, "error": "Validation failed.", "details": { "fieldErrors": { "email": ["Enter a valid email address."] } } }

// 409 Conflict — already subscribed
{ "success": false, "error": "This email is already subscribed." }
```

### `GET /api/menu`

Returns all four categories (`Burgers`, `Drinks`, `Sides`, `Daily Specials`), each
item with `name`, `description`, `price`, `allergens`, and `image`.

```
GET /api/menu
GET /api/menu?category=burgers
```

```json
// 400 Bad Request — unknown category
{ "success": false, "error": "Unknown category \"tacos\". Valid categories: burgers, drinks, sides, daily specials." }
```

### `GET /api/reviews`

Returns curated Google/Yelp reviews: `id`, `source`, `reviewer`, `rating`, `text`, `date`.

### `POST /api/reservations` (bonus)

```json
// Request
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "316-555-0100",
  "guests": 4,
  "date": "2027-01-15",
  "time": "19:30"
}

// 201 Created
{ "success": true, "message": "Reservation request received! We'll confirm shortly.", "data": { "id": "..." } }

// 400 Bad Request — past date/time, bad guest count, missing fields, etc.
```

`GET /api/reservations` is also included as a demo-only listing endpoint so the
in-memory store is inspectable locally — remove or protect it behind auth
before treating it as a real admin surface.

## A note on the in-memory store

`src/lib/store.ts` holds subscribed emails and reservations in a plain
in-memory `Set`/array. This keeps the project dependency-free and free to
host, but **Vercel serverless functions are stateless**: data does not
persist across cold starts or across concurrent instances. That's a
deliberate trade-off for a small/CV-ready demo. To make it durable, swap the
functions in `store.ts` for calls to:

- **Supabase** (`@supabase/supabase-js`), or
- **Prisma** + SQLite/Postgres (e.g. Vercel Postgres, Neon, Turso)

Because every route only talks to `newsletterStore` / `reservationStore`,
that swap is isolated to one file.

## Deploying to Vercel (zero extra cost)

1. Push this project to a GitHub (or GitLab/Bitbucket) repository.
2. Go to https://vercel.com/new and import the repository.
3. Vercel auto-detects Next.js — leave the build command (`next build`) and
   output settings as default. No environment variables are required for
   the current in-memory setup.
4. Click **Deploy**. Vercel builds the app and deploys both the static
   frontend and the `/api/*` route handlers as Serverless Functions on its
   free Hobby tier.
5. Your API is now live at `https://<your-project>.vercel.app/api/menu`,
   `/api/reviews`, `/api/newsletter`, `/api/reservations`.

**Alternative: Vercel CLI**

```bash
npm i -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

**If you later add Supabase/Prisma for persistence:** add the connection
string as an environment variable in the Vercel project settings
(Settings → Environment Variables) — no other infrastructure changes are
needed since Route Handlers already run as serverless functions.

## Design tokens

Defined in `src/app/globals.css`:
- `--color-char` #181818 (charcoal black)
- `--color-olive` #2e3e34 (olive green)
- `--color-cheddar` #f28c28 (cheddar orange)
- `--color-cream` #f5f2ea (crisp white/cream)
- Fonts: Playfair Display (serif, headings) + Inter (sans, body)
