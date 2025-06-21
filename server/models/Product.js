import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

// Initialize mongoose-currency type
const Schema = mongoose.Schema;
loadType(mongoose); // Adds Currency type support to mongoose

// Schema for Product model
const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // Convert from cents to dollars
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    // Array of transaction references linked to this product
    transations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { getters: true }, // Enables value formatting when converted to JSON
  }
);

// Create Product model from schema
const Product = mongoose.model("Product", ProductSchema);

export default Product;
