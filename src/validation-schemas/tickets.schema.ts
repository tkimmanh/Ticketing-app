import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(6969, "Description is too long"),
  status: z
    .string()
    .min(1, "Status is required")
    .max(100, "Status is too long"),
  priority: z
    .string()
    .min(1, "Priority is required")
    .max(100, "Priority is too long"),
});
