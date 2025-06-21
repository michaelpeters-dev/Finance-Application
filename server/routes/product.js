import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET route to retrieve all product documents
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Query all products from the database
    res.status(200).json(products); // Send the result with 200 OK
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors
  }
});

export default router;
