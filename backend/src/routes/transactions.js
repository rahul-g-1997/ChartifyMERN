import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// List transactions with search and pagination
router.post("/transactions", async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.body;
    const regex = new RegExp(search, "i");

    // Build the filter object based on search criteria
    const filter = {
      $or: [
        { title: regex },
        { description: regex },
        // Match the price as a number only if search is a valid number
        isNaN(search) ? null : { price: Number(search) },
      ].filter(Boolean), // Removes null entries
    };

    // Find transactions with pagination and search filter
    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage))
      .exec();

    // Get the total count of documents matching the filter
    const total = await Transaction.countDocuments(filter);

    // Respond with transactions and pagination info
    res.status(200).json({
      transactions,
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

export default router;
