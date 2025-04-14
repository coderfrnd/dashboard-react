import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";

const PieChart = ({ data = [], isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens();

  // Ensure data is valid and has the correct structure
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Box 
        height="100%" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Typography color="text.secondary">No data available</Typography>
      </Box>
    );
  }

  // Validate data structure
  const validData = data.filter(item => 
    item && 
    typeof item === 'object' && 
    'id' in item && 
    'value' in item && 
    typeof item.value === 'number' && 
    item.value > 0
  );

  if (validData.length === 0) {
    return (
      <Box 
        height="100%" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Typography color="text.secondary">Invalid data format</Typography>
      </Box>
    );
  }

  return (
    <ResponsivePie
      data={validData}
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
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
