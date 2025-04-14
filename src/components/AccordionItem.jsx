/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
const AccordionItem = ({ question, details }) => {
  const theme = useTheme();
  const colors = tokens();
  return (
    <Accordion defaultExpanded sx={{ bgcolor: `${colors.primary[400]}` }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography color="#000000" variant="h5">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography color="#000000">{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
