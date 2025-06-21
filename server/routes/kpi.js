import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

// GET route to fetch all KPI documents
router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find(); // Fetch all KPI records from the database
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle DB errors
  }
});

export default router;
