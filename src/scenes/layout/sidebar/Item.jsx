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
          ? (theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)")
          : "transparent",
        borderRadius: "12px",
        margin: "10px 15px",
        padding: "18px 24px",
        width: "calc(100% - 30px)",
        minHeight: "60px",
        display: "flex",
        alignItems: "center",
        transition: theme.transitions.create(['color', 'background-color', 'transform', 'box-shadow'], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
          transform: "translateX(4px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: isActive ? colors.greenAccent[500] : "transparent",
          color: isActive ? theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff" : theme.palette.text.primary,
          borderRadius: "8px",
          padding: "12px",
          marginRight: "16px",
          minWidth: "40px",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: theme.transitions.create(['background-color', 'color', 'transform'], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": {
            transform: "scale(1.1)",
          }
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
          minHeight: "40px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: isActive ? 600 : 400,
            letterSpacing: "0.02em",
            fontSize: "1rem",
            transition: theme.transitions.create(['font-weight'], {
              duration: theme.transitions.duration.short,
            }),
          }}
        >
          {title}
        </Typography>
        {isActive && (
          <Box
            sx={{
              width: 4,
              height: 24,
              backgroundColor: colors.greenAccent[500],
              borderRadius: 2,
              marginLeft: "auto",
              transition: theme.transitions.create(['height'], {
                duration: theme.transitions.duration.short,
              }),
              "&:hover": {
                height: 32,
              }
            }}
          />
        )}
      </Box>
    </MenuItem>
  );
};

export default Item;
