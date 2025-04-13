/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

const Item = ({ title, path, icon, colors }) => {
  const location = useLocation();
  const isActive = path === location.pathname;
  const theme = useTheme();

  return (
    <MenuItem
      component={<Link to={path} />}
      to={path}
      icon={icon}
      rootStyles={{
        color: isActive ? colors.greenAccent[500] : theme.palette.text.primary,
        backgroundColor: isActive 
          ? (theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)")
          : "transparent",
        borderRadius: 1,
        margin: "4px 8px",
        padding: "8px 16px",
        transition: theme.transitions.create(['color', 'background-color', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          transform: "translateX(4px)",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: isActive ? colors.greenAccent[500] : "transparent",
          color: isActive ? theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff" : theme.palette.text.primary,
          borderRadius: 1,
          padding: "4px",
          transition: theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.short,
          }),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: isActive ? 600 : 400,
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </Typography>
        {isActive && (
          <Box
            sx={{
              width: 4,
              height: 16,
              backgroundColor: colors.greenAccent[500],
              borderRadius: 1,
              marginLeft: "auto",
            }}
          />
        )}
      </Box>
    </MenuItem>
  );
};

export default Item;
