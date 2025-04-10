import { Box } from "@mui/material";
import { Header, StreamChart } from "../../components";
import Invoices from "../invoices";
import { useContext } from "react";
import { ToggledContext } from "../../App";

const Stream = () => {
  // useContext
  // ToggledContext
  const {financialData} = useContext(ToggledContext)
  return (
    <Box m="20px">
      <Box height="75vh">
       <Invoices financialData={financialData} header={"Financial Details"} />
      </Box>
    </Box>
  );
};

export default Stream;
