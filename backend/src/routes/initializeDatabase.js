import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.model.js"; // Make sure the path and extension are correct

const router = express.Router();

router.get("/initialize-database", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).send("Database initialized successfully");
  } catch (error) {
    res.status(500).send("Error initializing database");
  }
});

export default router;
