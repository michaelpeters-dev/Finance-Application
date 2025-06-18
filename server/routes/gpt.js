import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/summary", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Missing prompt" });
  }

  const apiUrl = process.env.GROQ_API_URL;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiUrl || !apiKey) {
    return res
      .status(500)
      .json({ message: "Missing GROQ_API_URL or GROQ_API_KEY" });
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ message: "No content returned" });
    }

    res.status(200).json({ result: content });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ message });
  }
});

export default router;
