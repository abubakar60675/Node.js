import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getUpcomingRenewals,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  CancelSubscriptionSchema,
  SubscriptionSchema,
} from "../utils/schemas/subscription.schema.js";
import { schemaValidator } from "../utils/schemas/index.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authMiddleware, getAllSubscriptions);

subscriptionRouter.get("/:id", authMiddleware, getSubscriptionById);

subscriptionRouter.post(
  "/",
  authMiddleware,
  schemaValidator(SubscriptionSchema),
  createSubscription,
);

subscriptionRouter.put("/:id", authMiddleware, updateSubscription);

subscriptionRouter.delete("/:id", authMiddleware, deleteSubscription);

subscriptionRouter.get("/user/:id", authMiddleware, getUserSubscriptions);

subscriptionRouter.put(
  "/:id/cancel",
  authMiddleware,
  schemaValidator(CancelSubscriptionSchema),
  cancelSubscription,
);

subscriptionRouter.get(
  "/upcoming-renewals",
  authMiddleware,
  getUpcomingRenewals,
);

export default subscriptionRouter;
