import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

router.get("/pie-chart", async (req, res) => {
  try {
    const { month } = req.query;
    const monthQuery = month
      ? {
          dateOfSale: {
            $gte: new Date(
              new Date().setMonth(new Date(month + " 1, 2000").getMonth(), 1)
            ),
            $lt: new Date(
              new Date().setMonth(
                new Date(month + " 1, 2000").getMonth() + 1,
                1
              )
            ),
          },
        }
      : {};

    const pieChartData = await Transaction.aggregate([
      { $match: monthQuery },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).send("Error fetching pie chart data");
  }
});

export default router;
