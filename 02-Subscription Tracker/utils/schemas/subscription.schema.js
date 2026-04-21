import { z } from "zod";

export const SubscriptionSchema = z.object({
  name: z.string().min(2, {
    message: "Subscription Name must be at least 2 characters long",
  }),
  price: z
    .number()
    .min(0, { message: "Subscription Price must be greater than 0" }),
  currency: z.string().min(3, {
    message: "Subscription Currency must be at least 3 characters long",
  }),
  frequency: z.string().min(2, {
    message: "Subscription Frequency must be at least 2 characters long",
  }),
  category: z.string().min(2, {
    message: "Subscription Category must be at least 2 characters long",
  }),
  paymentMethod: z
    .string()
    .min(2, { message: "Payment Method must be at least 2 characters long" }),
  startDate: z
    .string()
    .min(2, { message: "Start Date must be at least 2 characters long" }),
});

export const UpdateSubscriptionSchema = z.object({
  name: z.string().min(2, {
    message: "Subscription Name must be at least 2 characters long",
  }),
  price: z
    .number()
    .min(0, { message: "Subscription Price must be greater than 0" }),
  currency: z.string().min(3, {
    message: "Subscription Currency must be at least 3 characters long",
  }),
  frequency: z.string().min(2, {
    message: "Subscription Frequency must be at least 2 characters long",
  }),
  category: z.string().min(2, {
    message: "Subscription Category must be at least 2 characters long",
  }),
  paymentMethod: z
    .string()
    .min(2, { message: "Payment Method must be at least 2 characters long" }),
  startDate: z
    .string()
    .min(2, { message: "Start Date must be at least 2 characters long" }),
  renewalDate: z
    .string()
    .min(2, { message: "Renewal Date must be at least 2 characters long" }),
  status: z
    .string()
    .min(2, { message: "Status must be at least 2 characters long" }),
  user: z
    .string()
    .min(2, { message: "User must be at least 2 characters long" }),
});

export const DeleteSubscriptionSchema = z.object({
  id: z
    .string()
    .min(2, { message: "Subscription ID must be at least 2 characters long" }),
});

export const GetSubscriptionSchema = z.object({
  id: z
    .string()
    .min(2, { message: "Subscription ID must be at least 2 characters long" }),
});

export const GetSubscriptionsSchema = z.object({
  user: z
    .string()
    .min(2, { message: "User must be at least 2 characters long" }),
});

export const GetUpcomingRenewalsSchema = z.object({
  user: z
    .string()
    .min(2, { message: "User must be at least 2 characters long" }),
});

export const CancelSubscriptionSchema = z.object({
  id: z
    .string()
    .min(2, { message: "Subscription ID must be at least 2 characters long" }),
});
