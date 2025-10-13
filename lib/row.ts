import { z } from "zod";

// Define the schema using zod
export const RowSchema = z.object({
    name: z.string(),
    url: z.string(),
    deadline: z.string(),
    commitment: z.string(),
    notes: z.string(),
});

// Derive the TypeScript type from the schema
export type Row = z.infer<typeof RowSchema>;