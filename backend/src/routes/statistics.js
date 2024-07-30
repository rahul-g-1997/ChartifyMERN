import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

router.post("/statistics", async (req, res) => {
  try {
    const { year, month } = req.body; // Year and month in yyyy-mm format

    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    // Convert yyyy-mm to Date objects
    const parseYearMonth = (year, month) => {
      const startDate = new Date(Date.UTC(year, month - 1, 1)); // month is 0-indexed
      const endDate = new Date(Date.UTC(year, month, 1)); // Start of the next month
      return { startDate, endDate };
    };

    const { startDate, endDate } = parseYearMonth(Number(year), Number(month));

    const monthQuery = {
      dateOfSale: {
        $gte: startDate,
        $lt: endDate,
      },
    };

    // Aggregate total sale amount
    const totalSaleAmount = await Transaction.aggregate([
      { $match: monthQuery },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);


    // Count sold items
    const soldItemsCount = await Transaction.countDocuments({
      ...monthQuery,
      sold: true,
    });

    // Count not sold items
    const notSoldItemsCount = await Transaction.countDocuments({
      ...monthQuery,
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems: soldItemsCount,
      totalNotSoldItems: notSoldItemsCount,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).send("Error fetching statistics");
  }
});

export default router;
