import express from "express";
import multer from "multer";
import fs from "fs";
// import KPI from "../models/KPI.js";
// import Product from "../models/Product.js";
// import Transaction from "../models/Transaction.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("dataFile"), async (req, res) => {
  return res.status(403).json({ message: "Upload disabled in production." });

  /*
  try {
    const filePath = req.file.path;
    const rawData = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(rawData);

    const { kpis = [], products = [], transactions = [] } = parsed;

    await KPI.insertMany(kpis);
    await Product.insertMany(products);
    await Transaction.insertMany(transactions);

    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Data successfully uploaded and saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
  */
});

export default router;
