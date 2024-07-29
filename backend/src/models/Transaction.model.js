import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  dateOfSale: Date,
  product: {
    title: String,
    description: String,
    price: Number,
    category: String,
  },
  sold: Boolean,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
