/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme, Tooltip, Paper, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Badge, Chip } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <DashboardOutlined />,
    },
    {
      title: "Patient Data",
      path: "/patient",
      icon: <PeopleAltOutlined />,
    },
    {
      title: "Patient History",
      path: "/patienthistory",
      icon: <ContactsOutlined />,
    },
    {
      title: "Add new Staff",
      path: "/form",
      icon: <PersonOutlined />,
    },
    {
      title: "Staff Attendence",
      path: "/calendar",
      icon: <CalendarTodayOutlined />,
    },
    {
      title: "Staff Details",
      path: "/staffhistory",
      icon: <HelpOutlineOutlined />,
    },
    {
      title: "Financial Details",
      path: "/finance",
      icon: <WavesOutlined />,
    },
    {
      title: "Bar Chart",
      path: "/bar",
      icon: <BarChartOutlined />,
    },
    {
      title: "Pie Chart",
      path: "/pie",
      icon: <DonutLargeOutlined />,
    },
    {
      title: "Geography Chart",
      path: "/geography",
      icon: <MapOutlined />,
    },
  ];

  const MenuItem = ({ item }) => {
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

      <List sx={{ px: 1, pt: 1 }}>
        <MenuItem item={menuItems[0]} />
      </List>

      {!collapsed && (
        <Typography
          variant="subtitle2"
          sx={{ 
            px: 3,
            py: 1.5,
            color: "#868dfb",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            opacity: 0.6,
          }}
        >
          Patient Data
          <Box
            component="span"
            sx={{
              ml: 1,
              px: 1,
              py: 0.25,
              borderRadius: "4px",
              backgroundColor: colors.greenAccent[500] + "20",
              color: colors.greenAccent[500],
              fontSize: "0.65rem",
              fontWeight: 700,
            }}
          >
            2
          </Box>
        </Typography>
      )}
      
      <List sx={{ px: 1 }}>
        <MenuItem item={menuItems[1]} />
        <MenuItem item={menuItems[2]} />
      </List>

      {!collapsed && (
        <Typography
          variant="subtitle2"
          sx={{ 
            px: 3,
            py: 1.5,
            color: "#868dfb",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            opacity: 0.6,
          }}
        >
          Staff Data
          <Box
            component="span"
            sx={{
              ml: 1,
              px: 1,
              py: 0.25,
              borderRadius: "4px",
              backgroundColor: colors.greenAccent[500] + "20",
              color: colors.greenAccent[500],
              fontSize: "0.65rem",
              fontWeight: 700,
            }}
          >
            3
          </Box>
        </Typography>
      )}
      
      <List sx={{ px: 1 }}>
        <MenuItem item={menuItems[3]} />
        <MenuItem item={menuItems[4]} />
        <MenuItem item={menuItems[5]} />
      </List>

      {!collapsed && (
        <Typography
          variant="subtitle2"
          sx={{ 
            px: 3,
            py: 1.5,
            color: "#868dfb",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            opacity: 0.6,
          }}
        >
          Financial Charts
          <Box
            component="span"
            sx={{
              ml: 1,
              px: 1,
              py: 0.25,
              borderRadius: "4px",
              backgroundColor: colors.greenAccent[500] + "20",
              color: colors.greenAccent[500],
              fontSize: "0.65rem",
              fontWeight: 700,
            }}
          >
            4
          </Box>
        </Typography>
      )}
      
      <List sx={{ px: 1 }}>
        <MenuItem item={menuItems[6]} />
        <MenuItem item={menuItems[7]} />
        <MenuItem item={menuItems[8]} />
        <MenuItem item={menuItems[9]} />
      </List>
    </Drawer>
  );
};

export default SideBar;
