import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

// List transactions with search and pagination
router.get("/transactions", async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search = "" } = req.query;
    const regex = new RegExp(search, "i");
    const startDate = new Date(`2021-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const filter = {
      dateOfSale: {
        $gte: startDate,
        $lt: endDate,
      },
      $or: [
        { "product.title": regex },
        { "product.description": regex },
        { "product.price": regex },
      ],
    };

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage))
      .exec();

    const total = await Transaction.countDocuments(filter);

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
