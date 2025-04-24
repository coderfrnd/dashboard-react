/* eslint-disable react/prop-types */
import { Box, IconButton, Typography, useTheme, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../theme";
import {
  MenuOutlined,
  DashboardOutlined,
  LocalHospitalOutlined,
  AttachMoneyOutlined,
  GroupOutlined,
  PersonOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import logo from "../../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const menuItems = {
    boards: [
      {
        title: "Default Board",
        path: "/",
        icon: <DashboardOutlined />,
      },
      {
        title: "Patient Board",
        path: "/patient",
        icon: <LocalHospitalOutlined />,
      },
      {
        title: "Add Patient",
        path: "/add-patient",
        icon: <LocalHospitalOutlined />,
      },
      {
        title: "Financial Board",
        path: "/finance",
        icon: <AttachMoneyOutlined />,
      },
      {
        title: "Staff Board",
        path: "/staff",
        icon: <GroupOutlined />,
      },
      {
        title: "Add new Staff",
        path: "/form",
        icon: <PersonOutlined />,
      },
      {
        title: "Staff Attendance",
        path: "/staff-attendance",
        icon: <PeopleAltOutlined />,
      }
    ]
  };

  const MenuItem = ({ item }) => {
    if (!item) return null;
    
    const isActive = item.path === location.pathname;
    
    return (
      <ListItem 
        disablePadding 
        sx={{ 
          mb: 0.5,
          mx: 1,
        }}
      >
        <ListItemButton
          component={Link}
          to={item.path}
          sx={{
            borderRadius: "12px",
            py: 1,
            px: 2,
            backgroundColor: isActive 
              ? colors.greenAccent[500] + "20"
              : "transparent",
            color: isActive ? colors.greenAccent[500] : "#868dfb",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              color: colors.greenAccent[500],
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: "inherit",
              mr: 1,
            }}
          >
            {item.icon}
          </ListItemIcon>
          {!collapsed && (
            <ListItemText 
              primary={item.title} 
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                }
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 280,
          backgroundColor: "#1F2A40",
          transition: "width 0.2s ease-in-out",
          border: 0,
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          pb: 3,
        }}
      >
        {!collapsed && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <img
              style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "8px",
              }}
              src={logo}
              alt="Argon"
            />
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.greenAccent[500]}
            >
              Argon
            </Typography>
          </Box>
        )}
        <IconButton 
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            color: "#868dfb",
            p: 1,
          }}
        >
          <MenuOutlined />
        </IconButton>
      </Box>

      {/* Board Items */}
      <List sx={{ px: 1 }}>
        {menuItems.boards.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
