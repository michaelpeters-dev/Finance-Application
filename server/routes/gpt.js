import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/summary", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GROQ_API_URL}`,
      {
        model: "mixtral-8x7b-32768",
        messages: [
          { role: "system", content: "..." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${yourGroqAPIKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch AI insight" });
  }
});

export default router;
