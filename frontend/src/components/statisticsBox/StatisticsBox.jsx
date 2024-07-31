// components/StatisticsBox.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import configService from "../../services/config"; // Adjust the path as needed
import { toast } from "react-toastify";

const StatisticsBox = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // State for selected month
  const [selectedYear, setSelectedYear] = useState(2022); // State for selected year
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  }); // State for statistics

  // Function to fetch statistics
  const fetchStatistics = async (month, year) => {
    try {
      const data = await configService.getStatistics(month, year);
      setStatistics({
        totalSales: data.totalSaleAmount,
        totalSoldItems: data.totalSoldItems,
        totalUnsoldItems: data.totalNotSoldItems,
      });
    } catch (err) {
      toast.error(err.message); // Display the error message using Toastify
    }
  };

  // Fetch statistics initially and when selectedMonth or selectedYear changes
  useEffect(() => {
    fetchStatistics(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  return (
    <Box
      sx={{
        border: "1px solid",
        padding: "16px",
        borderRadius: "8px",
        margin: "20px 0",
        position: "relative", // Ensure positioning is relative for children
      }}
    >
      <Typography variant="h6">Transactions Statistics</Typography>

      <Box
        sx={{
          top: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <FormControl variant="outlined" size="small" sx={{ width: "150px" }}>
          <InputLabel id="month-select-label">Month</InputLabel>
          <Select
            labelId="month-select-label"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" sx={{ width: "100px" }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "80px", // Adjust based on the position of the selection controls
        }}
      >
        <Typography color={"black"}>
          Total Amount of Sales: ${statistics.totalSales}
        </Typography>
        <Typography color={"black"}>
          Total Sold Items: {statistics.totalSoldItems}
        </Typography>
        <Typography color={"black"}>
          Total Unsold Items: {statistics.totalUnsoldItems}
        </Typography>
      </Box>
    </Box>
  );
};

StatisticsBox.propTypes = {
  totalSales: PropTypes.number.isRequired,
  totalSoldItems: PropTypes.number.isRequired,
  totalUnsoldItems: PropTypes.number.isRequired,
};

export default StatisticsBox;
