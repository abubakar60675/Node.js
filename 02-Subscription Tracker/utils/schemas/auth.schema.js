import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6),
});

export const SignInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6),
});
