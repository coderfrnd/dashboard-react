import { Box } from "@mui/material";
import { Header, PieChart } from "../../components";
import { useContext } from "react";
import { ToggledContext } from "../../App";

const Pie = () => {
   const { financialData } = useContext(ToggledContext);
  //  useContext
  // ToggledContext
  const statusCounts = financialData.reduce((acc, item) => {
    acc[item.paymentStatus] = (acc[item.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCounts).map(([status, count]) => {
   return {
    id: status,
    label: status,
    value: count,
  }
});
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Financial Pie Chart" />
      <Box height="75vh">
        <PieChart data={pieData} />
      </Box>
    </Box>
  );
};

export default Pie;
