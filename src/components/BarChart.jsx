
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
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
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
        tooltip: {
          container: {
            background: "#fff",
            color: "#333",
            fontSize: "14px",
            borderRadius: "4px",
            padding: "8px 12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          },
        },
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
        legend: isDashboard ? undefined : xAxisLabel,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : yAxisLabel,
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
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            background: "#fff",
            padding: "6px 9px",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            color: "#333",
          }}
        >
          <strong>{id}</strong>: {value} <br />
          in <strong>{indexValue}</strong>
        </div>
      )}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in ${e.indexValue}`
      }
    />
  );
};

export default BarChart;
