import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

router.get("/bar-chart", async (req, res) => {
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
    res.status(500).send("Error fetching bar chart data");
  }
});

export default router;
