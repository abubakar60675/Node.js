import { serve } from "@upstash/workflow/express";
import qstash from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") {
    return;
  }
  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal Date has passed for subscription ${subscriptionId}. Stopping Workflow.`,
    );
    return;
  }
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await context.schedule(
        `send reminder ${daysBefore} days before renewal`,
        reminderDate.toDate(),
        { subscriptionId },
      );
    }
  }

  const user = subscription.user;

  if (!user) {
    throw new Error("User not found");
  }

  const emailPayload = {
    to: user.email,
    subject: "Subscription Reminder",
    text: `Your subscription ${subscription.name} is due for renewal on ${subscription.renewalDate}`,
  };

  await qstash.publish("email", emailPayload);
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId)
      .populate("user")
      .select("name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  console.log(`Triggering reminder ${label}`);
  await qstash.publish("email", {
    to: "[EMAIL_ADDRESS]",
    subject: "Subscription Reminder",
    text: `Your subscription ${label} is due for renewal on ${date}`,
  });
};
