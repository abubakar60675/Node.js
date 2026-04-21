import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.route.js";
import { connectToDatabase } from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again after 15 minutes.",
      data: null,
    });
  },
});

const BASE_URL = "/api/v1";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/subscriptions`, subscriptionRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello World!", data: null });
});

app.all(/(.*)/, (req, res, next) => {
  // const error = new Error(`Route ${req.originalUrl} not found`);
  // error.statusCode = 404;
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});

export default app;
