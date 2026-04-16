import express from "express";
import { connectToMongoDB } from "./db.js";
import urlRoute from "./routes/url.js";
import { handleGetOriginalURL } from "./controllers/url.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
  console.log("MongoDB connected");
});
app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", handleGetOriginalURL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
