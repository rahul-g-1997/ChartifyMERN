import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

// List pie chart data based on month
router.post("/pie-chart", async (req, res) => {
  try {
    const { year, month } = req.body; // Extract year and month from the request body

    // Validate the input
    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    // Calculate start and end dates for the specified month and year
    const startDate = new Date(Date.UTC(year, month - 1, 1)); // month is 0-indexed
    const endDate = new Date(Date.UTC(year, month, 1)); // Start of the next month

    const monthQuery = {
      dateOfSale: {
        $gte: startDate,
        $lt: endDate,
      },
    };

    // Fetch data for the pie chart
    const pieChartData = await Transaction.aggregate([
      { $match: monthQuery },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).send("Error fetching pie chart data");
  }
});

export default router;
