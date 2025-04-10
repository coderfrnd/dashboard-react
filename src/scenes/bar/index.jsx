// src/scenes/bar/Bar.jsx
import { Box } from "@mui/material";
import { useContext } from "react";
import { Header, BarChart } from "../../components";
import { ToggledContext } from "../../App";

const Bar = () => {
  const { financialData } = useContext(ToggledContext);

  // Prepare the bar chart data
  const statusTotals = financialData.reduce((acc, item) => {
    const key = item.paymentStatus || "Unknown";
    acc[key] = (acc[key] || 0) + item.amount;
    return acc;
  }, {});

  const barData = Object.entries(statusTotals).map(([status, amount]) => ({
    paymentStatus: status,
    totalAmount: amount,
  }));

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Financial Payment Bar Chart" />
      <Box height="75vh">
        <BarChart
          data={barData}
          indexBy="paymentStatus"
          keys={["totalAmount"]}
          xAxisLabel="Payment Status"
          yAxisLabel="Total Amount"
        />
      </Box>
    </Box>
  );
};

export default Bar;
