import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1).max(255),
  position: z.number(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
