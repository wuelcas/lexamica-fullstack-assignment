import type { ZodError } from "zod";

export default function formatZodErrors(error: ZodError) {
  return error.errors.map((error) => ({
    field: error.path.join("."),
    message: error.message,
  }));
}
