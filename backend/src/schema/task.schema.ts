import z from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  subtasks: z
    .array(z.object({ title: z.string().trim().min(1).max(200) }))
    .max(50)
    .default([]),
});
