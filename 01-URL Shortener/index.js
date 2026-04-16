import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectToMongoDB } from "./db.js";
import urlRoute from "./routes/url.js";
import { handleGetOriginalURL } from "./controllers/url.js";

const app = express();
const PORT = process.env.PORT;

connectToMongoDB(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connected");
});
app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", handleGetOriginalURL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
