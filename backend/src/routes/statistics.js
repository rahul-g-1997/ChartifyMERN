import express from "express";
import Transaction from "../models/Transaction.model.js";

const router = express.Router();

router.get("/statistics", async (req, res) => {
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

    const totalSaleAmount = await Transaction.aggregate([
      { $match: monthQuery },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const soldItemsCount = await Transaction.countDocuments({
      ...monthQuery,
      sold: true,
    });
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
    res.status(500).send("Error fetching statistics");
  }
});

export default router;
