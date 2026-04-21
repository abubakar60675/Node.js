import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

subscriptionRouter.post("/", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.json({ success: true, message: "Subscription", data: null });
});

export default subscriptionRouter;
