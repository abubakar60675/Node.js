import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", (req, res) => {
  res.json({ success: true, message: "Workflow", data: null });
});

export default workflowRouter;
