/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle, lightBackground = false }) => {
  const theme = useTheme();
  const themeColors = tokens();
  
  // All text will be black regardless of background
  const titleColor = "#000000";
  const subtitleColor = "#000000";
  
  return (
    <Box 
      mb="30px"
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'transparent',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.02)',
        }
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        color={titleColor}
        mb="5px"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h5" 
        color={subtitleColor}
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          fontWeight: 500
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
