import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET route to retrieve the 50 most recent transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50) // Limit the result to 50 transactions
      .sort({ createdOn: -1 }); // Sort by most recent (descending)

    res.status(200).json(transactions); // Send the transactions with 200 OK
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors
  }
});

export default router;
