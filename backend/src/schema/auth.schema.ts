import z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(4),
  email: z.email(),
  password: z.string().min(8).max(128),
});

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
