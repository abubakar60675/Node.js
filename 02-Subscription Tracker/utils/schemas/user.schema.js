import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const UpdatePasswordSchema = z.object({
  oldPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.email({ message: "Invalid email address" }),
});
