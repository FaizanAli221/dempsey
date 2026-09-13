import { z } from "zod";

/** POST /api/newsletter */
export const newsletterSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .trim()
    .toLowerCase()
    .email("Enter a valid email address."),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** GET /api/menu?category= */
export const menuQuerySchema = z.object({
  category: z
    .string()
    .trim()
    .toLowerCase()
    .optional(),
});

/** POST /api/reservations */
export const reservationSchema = z
  .object({
    name: z
      .string({ message: "Name is required." })
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name is too long."),
    email: z
      .string({ message: "Email is required." })
      .trim()
      .toLowerCase()
      .email("Enter a valid email address."),
    phone: z
      .string({ message: "Phone number is required." })
      .trim()
      .min(7, "Enter a valid phone number.")
      .max(20, "Phone number is too long.")
      .regex(/^[\d\s()+.\-]+$/, "Phone number contains invalid characters."),
    guests: z.coerce
      .number({ message: "Guest count is required." })
      .int("Guest count must be a whole number.")
      .min(1, "At least 1 guest is required.")
      .max(20, "For parties over 20, please call the pub directly."),
    date: z
      .string({ message: "Date is required." })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
    time: z
      .string({ message: "Time is required." })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM (24-hour) format."),
    seatingPreference: z.string().trim().max(50).optional(),
    specialRequests: z.string().trim().max(500).optional(),
  })
  .refine(
    (data) => {
      const dt = new Date(`${data.date}T${data.time}:00`);
      return !Number.isNaN(dt.getTime()) && dt.getTime() > Date.now();
    },
    {
      message: "Reservation date and time must be in the future.",
      path: ["date"],
    }
  );

export type ReservationInput = z.infer<typeof reservationSchema>;
