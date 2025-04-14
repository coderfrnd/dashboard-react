/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ total, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens();

  return (
    <Box 
      width="100%" 
      mx="30px"
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'transparent',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.02)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box
            sx={{
              color: colors.primary[600],
              mb: 1
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            color="#000000"
            sx={{ mb: 1 }}
          >
            {total}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography 
          variant="h5" 
          color="#000000"
          sx={{ fontWeight: 500 }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          color="#000000"
          sx={{ fontWeight: 500 }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
