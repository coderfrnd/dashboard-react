import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = ({ data, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens();

  return (
    <ResponsivePie
      data={data}
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLink={true}
      arcLinkSkipAngle={10}
      arcLinkThickness={1}
      arcLinkColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      colors={{ scheme: "category10" }}
      tooltip={({ datum }) => (
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
            {datum.id}: {datum.value}
          </strong>
        </div>
      )}
    />
  );
};

export default PieChart;
