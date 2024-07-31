import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Bar_Chart() {
  return (
    <Box
      sx={{
        border: "1px solid",
        padding: "16px",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <Typography variant="h6">Bar Chart</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
      </Box>
    </Box>
  );
}
