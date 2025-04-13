/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme, Tooltip, Paper, Divider } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
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
import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Sidebar
      backgroundColor={theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff"}
      rootStyles={{
        border: 0,
        height: "100%",
        boxShadow: theme.shadows[4],
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { 
            ":hover": { 
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              transition: theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.short,
              }),
            },
            "&.active": {
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            }
          },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                sx={{ 
                  transition: theme.transitions.create(['transform'], {
                    duration: theme.transitions.duration.short,
                  }),
                  "&:hover": {
                    transform: "scale(1.02)",
                  }
                }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 0.5,
                    borderRadius: 1.25,
                    backgroundColor: 'transparent',
                  }}
                >
                  <img
                    style={{ 
                      width: "35px", 
                      height: "35px", 
                      borderRadius: "10px",
                    }}
                    src={logo}
                    alt="Argon"
                  />
                </Paper>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}
                  sx={{
                    textShadow: theme.shadows[1],
                  }}
                >
                  Argon
                </Typography>
              </Box>
            )}
            <Tooltip title={collapsed ? "Expand Menu" : "Collapse Menu"}>
              <IconButton 
                onClick={() => setCollapsed(!collapsed)}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    color: colors.greenAccent[500],
                    transform: "rotate(180deg)",
                    transition: theme.transitions.create(['color', 'transform'], {
                      duration: theme.transitions.duration.short,
                    }),
                  }
                }}
              >
                <MenuOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mb: 3,
            p: 2.5,
            borderRadius: 1.5,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
            mx: 1.25,
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ 
              width: 100, 
              height: 100,
              border: `4px solid ${colors.greenAccent[500]}`,
              boxShadow: theme.shadows[4],
            }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              color={theme.palette.text.primary}
              sx={{
                textShadow: theme.shadows[1],
              }}
            >
              Software Engineer Admin
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
              sx={{
                mt: 0.5,
                opacity: 0.8,
              }}
            >
              Administrator
            </Typography>
          </Box>
        </Paper>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: colors.greenAccent[500],
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                transition: theme.transitions.create(['color', 'background-color'], {
                  duration: theme.transitions.duration.short,
                }),
              },
              "&.active": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: colors.greenAccent[500],
              }
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Divider sx={{ my: 1, mx: 2 }} />
        <Typography
          variant="h6"
          color={theme.palette.text.secondary}
          sx={{ 
            m: "15px 0 5px 20px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          {!collapsed ? "Patient Data" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: colors.greenAccent[500],
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                transition: theme.transitions.create(['color', 'background-color'], {
                  duration: theme.transitions.duration.short,
                }),
              },
              "&.active": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: colors.greenAccent[500],
              }
            },
          }}
        >
          <Item
            title="Patient Data"
            path="/patient"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Patient History"
            path="/patienthistory"
            colors={colors}
            icon={<ContactsOutlined />}
          />
        </Menu>
        <Divider sx={{ my: 1, mx: 2 }} />
        <Typography
          variant="h6"
          color={theme.palette.text.secondary}
          sx={{ 
            m: "15px 0 5px 20px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          {!collapsed ? "Staff Data" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: colors.greenAccent[500],
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                transition: theme.transitions.create(['color', 'background-color'], {
                  duration: theme.transitions.duration.short,
                }),
              },
              "&.active": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: colors.greenAccent[500],
              }
            },
          }}
        >
          <Item
            title="Add new Staff "
            path="/form"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Staff Attendence"
            path="/calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
          <Item
            title="Staff Details"
            path="/staffhistory"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        <Divider sx={{ my: 1, mx: 2 }} />
        <Typography
          variant="h6"
          color={theme.palette.text.secondary}
          sx={{ 
            m: "15px 0 5px 20px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          {!collapsed ? " Financial Charts" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: colors.greenAccent[500],
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                transition: theme.transitions.create(['color', 'background-color'], {
                  duration: theme.transitions.duration.short,
                }),
              },
              "&.active": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: colors.greenAccent[500],
              }
            },
          }}
        >
           <Item
            title="Financial Details"
            path="/finance"
            colors={colors}
            icon={<WavesOutlined />}
          />
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            icon={<MapOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
