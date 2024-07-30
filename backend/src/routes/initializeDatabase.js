import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.model.js"; // Ensure the correct path and file extension

const router = express.Router();

router.get("/initialize-database", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany({});

    // Map data to match the schema
    const transactions = data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      sold: item.sold,
      dateOfSale: new Date(item.dateOfSale),
    }));

    await Transaction.insertMany(transactions);
    res.status(200).send("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error); // Log the error for debugging
    res.status(500).send("Error initializing database");
  }
});

export default router;
