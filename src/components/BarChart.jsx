/* eslint-disable react/prop-types */
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ToggledContext } from "../App";

const BarChart = ({ isDashboard = false }) => {
  const { financialData } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Group and sum by paymentStatus
  const statusTotals = financialData.reduce((acc, item) => {
    const key = item.paymentStatus || "Unknown";
    acc[key] = (acc[key] || 0) + item.amount;
    return acc;
  }, {});

  // Format for Nivo Bar Chart
  const barData = Object.entries(statusTotals).map(([status, amount]) => ({
    paymentStatus: status,
    totalAmount: amount,
  }));

  return (
    <ResponsiveBar
      data={barData}
      keys={["totalAmount"]}
      indexBy="paymentStatus"
      theme={{
        axis: {
          domain: { line: { stroke: colors.gray[100] } },
          legend: { text: { fill: colors.gray[100] } },
          ticks: {
            line: { stroke: colors.gray[100], strokeWidth: 1 },
            text: { fill: colors.gray[100] },
          },
        },
        legends: { text: { fill: colors.gray[100] } },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Payment Status",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Total Amount",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          translateX: 120,
          itemWidth: 100,
          itemHeight: 20,
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: { itemOpacity: 1 },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in status: ${e.indexValue}`
      }
    />
  );
};

export default BarChart;
