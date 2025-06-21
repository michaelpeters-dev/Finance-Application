import express from "express";
import multer from "multer";
import fs from "fs";
// import KPI from "../models/KPI.js";
// import Product from "../models/Product.js";
// import Transaction from "../models/Transaction.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route for uploading data (currently disabled in production)
router.post("/", upload.single("dataFile"), async (req, res) => {
  return res.status(403).json({ message: "Upload disabled in production." });

  // Upload a file containing KPI's, Products, and Transactions into the MongoDB collections
  /*
  try {
    const filePath = req.file.path; // Get uploaded file path
    const rawData = fs.readFileSync(filePath, "utf8"); // Read file contents
    const parsed = JSON.parse(rawData); // Parse JSON data

    const { kpis = [], products = [], transactions = [] } = parsed;

    // Insert data into respective collections
    await KPI.insertMany(kpis);
    await Product.insertMany(products);
    await Transaction.insertMany(transactions);

    fs.unlinkSync(filePath); // Delete the uploaded file
    res.status(200).json({ message: "Data successfully uploaded and saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
  */
});

export default router;
