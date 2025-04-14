import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const BarChart = ({
  data,
  indexBy = "category",
  keys = ["value"],
  isDashboard = false,
  xAxisLabel = "Category",
  yAxisLabel = "Value",
}) => {
  const theme = useTheme();
  const colors = tokens();

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      colors={{ scheme: "nivo" }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#000000",
            },
          },
          legend: {
            text: {
              fill: "#000000",
            },
          },
          ticks: {
            line: {
              stroke: "#000000",
              strokeWidth: 1,
            },
            text: {
              fill: "#000000",
            },
          },
        },
        legends: {
          text: {
            fill: "#000000",
          },
        },
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: xAxisLabel,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisLabel,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      label={(d) => `${d.value}`}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 12,
            color: "#000000",
            background: "#ffffff",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <strong>
            {id}: {value}
          </strong>
        </div>
      )}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default BarChart;
