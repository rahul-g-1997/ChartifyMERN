import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/combined-data", async (req, res) => {
  try {
    const { year, month } = req.body; // Extract year and month from the JSON body
    const baseURL = process.env.API_BASE_URL;

    // Ensure both year and month are provided
    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const requestBody = { year, month };

    // Fetch data from the various endpoints
    const [statisticsResponse, barChartResponse, pieChartResponse] =
      await Promise.all([
        axios.post(`${baseURL}/statistics`, requestBody),
        axios.post(`${baseURL}/bar-chart`, requestBody),
        axios.post(`${baseURL}/pie-chart`, requestBody),
      ]);

    // Send the combined response
    res.status(200).json({
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).send("Error fetching combined data");
  }
});

export default router;
