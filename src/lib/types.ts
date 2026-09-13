/**
 * Shared TypeScript interfaces for the API layer.
 * Keeping these in one place gives the frontend (or any external
 * consumer) a single source of truth for response shapes.
 */

export interface ApiSuccess<T = undefined> {
  success: true;
  message?: string;
  data?: T;
}

export interface ApiError {
  success: false;
  error: string;
  /** Extra machine-readable detail, e.g. Zod's flattened field errors. */
  details?: unknown;
}

export type ApiResponse<T = undefined> = ApiSuccess<T> | ApiError;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in whole US dollars, e.g. 12.5 for $12.50. */
  price: number;
  allergens: string[];
  image: string;
}

export type MenuCategoryName = "Burgers" | "Drinks" | "Sides" | "Daily Specials";

export interface MenuCategory {
  category: MenuCategoryName;
  items: MenuItem[];
}

export interface Review {
  id: string;
  source: "Google" | "Yelp";
  reviewer: string;
  /** 1–5 star rating. */
  rating: number;
  text: string;
  date: string;
}

export interface ReservationInput {
  name: string;
  email: string;
  phone: string;
  guests: number;
  /** ISO date string, e.g. "2026-09-20". */
  date: string;
  /** 24-hour time string, e.g. "19:30". */
  time: string;
  seatingPreference?: string;
  specialRequests?: string;
}

export interface Reservation extends ReservationInput {
  id: string;
  createdAt: string;
}
