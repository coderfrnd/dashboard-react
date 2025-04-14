/* eslint-disable react/prop-types */
import React from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ToggledContext } from "../App";
import { useContext } from "react";

const LineChart = ({ data, xAxisLabel, yAxisLabel, colors }) => {
  const theme = useTheme();
  const colorsFromTheme = tokens();

  // Transform data to Nivo format if it's not already
  const chartData = [
    {
      id: "visits",
      data: data.map(d => ({
        x: d.x,
        y: d.y
      }))
    }
  ];

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: { line: { stroke: "#000000" } },
          legend: { text: { fill: "#000000" } },
          ticks: {
            line: { stroke: "#000000", strokeWidth: 1 },
            text: { fill: "#000000" },
          },
        },
        legends: { text: { fill: "#000000" } },
        tooltip: {
          container: {
            background: "#ffffff",
            color: "#000000",
            fontSize: "14px",
            borderRadius: "4px",
            padding: "8px 12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          },
        },
      }}
      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
      xScale={{
        type: 'point'
      }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto'
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: xAxisLabel,
        legendOffset: 40,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisLabel,
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      enablePoints={true}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
};

export default LineChart;
