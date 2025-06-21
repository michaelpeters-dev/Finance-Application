import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

// Initialize mongoose-currency for handling currency types
const Schema = mongoose.Schema;
loadType(mongoose); // Adds Currency type to mongoose

// Schema for a single transaction entry
const TransactionSchema = new Schema(
  {
    buyer: {
      type: String,
      required: true, // Buyer's name is required
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // Convert cents to dollars
    },
    // List of purchased product references
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { getters: true }, // Applies 'get' functions when converting to JSON
  }
);

// Create and export the model
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
