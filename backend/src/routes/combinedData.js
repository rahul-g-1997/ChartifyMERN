import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/combined-data", async (req, res) => {
  try {
    const { month } = req.query;

    const [statisticsResponse, barChartResponse, pieChartResponse] =
      await Promise.all([
        axios.get(`http://localhost:8080/api/statistics?month=${month}`),
        axios.get(`http://localhost:8080/api/bar-chart?month=${month}`),
        axios.get(`http://localhost:8080/api/pie-chart?month=${month}`),
      ]);

    res.status(200).json({
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    });
  } catch (error) {
    res.status(500).send("Error fetching combined data");
  }
});

export default router;
