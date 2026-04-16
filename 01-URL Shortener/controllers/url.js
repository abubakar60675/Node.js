import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

export const handleGenerateNewShortURL = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.url)
      return res.status(400).json({ error: "URL is required" });
    const shortId = nanoid(8);

    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ msg: "short url created", id: shortId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetOriginalURL = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
    );
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res.json({
      totalClicks: entry.visitHistory.length,
      analytics: entry.visitHistory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
