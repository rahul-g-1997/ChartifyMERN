import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

// List bar chart data based on month
router.post("/bar-chart", async (req, res) => {
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

    // Define price ranges
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    // Fetch data for the bar chart
    const barChartData = await Promise.all(
      priceRanges.map(async ({ range, min, max }) => {
        const count = await Transaction.countDocuments({
          ...monthQuery,
          price: { $gte: min, $lt: max },
        });
        return { range, count };
      })
    );

    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Error fetching bar chart data");
  }
});

export default router;
