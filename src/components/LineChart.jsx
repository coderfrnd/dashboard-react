/* eslint-disable react/prop-types */
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ToggledContext } from "../App";
import { useContext } from "react";
const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { patientData } = useContext(ToggledContext);

  const getLineDataFromPatients = (patients) => {
    const monthlyAll = {};
    const monthlyActive = {};

    patients.forEach((p) => {
      const month = p.lastVisit?.slice(0, 7);
      if (!month) return;

      monthlyAll[month] = (monthlyAll[month] || 0) + 1;
      if (p.status) {
        monthlyActive[month] = (monthlyActive[month] || 0) + 1;
      }
    });

    const allData = Object.entries(monthlyAll)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([month, count]) => ({
        x: month,
        y: count,
      }));

    const activeData = Object.entries(monthlyActive)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([month, count]) => ({
        x: month,
        y: count,
      }));

    return [
      {
        id: "All Visits",
        color: tokens("dark").greenAccent[500],
        data: allData,
      },
      {
        id: "Active Visits",
        color: tokens("dark").blueAccent[400],
        data: activeData,
      },
    ];
  };

  return (
    <ResponsiveLine
      data={getLineDataFromPatients(patientData)}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.gray[100],
            },
          },
          legend: {
            text: {
              fill: colors.gray[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
