import { z } from "zod";

const envSchema = z.object({
  VITE_SUMMARY_BOOKING_URL: z.string(),
  VITE_MASTER_UNIT_URL: z.string(),
  VITE_MASTER_MEETING_ROOMS_URL: z.string(),
  VITE_MASTER_JENIS_KONSUMSI_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
