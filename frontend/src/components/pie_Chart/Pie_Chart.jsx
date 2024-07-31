import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Pie_Chart() {
  return (
    <Box
      sx={{
        border: "1px solid",
        padding: "16px",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <Typography variant="h6">Pie Chart</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </Box>
    </Box>
  );
}
