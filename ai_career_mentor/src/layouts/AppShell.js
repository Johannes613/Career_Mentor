import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Bot } from "lucide-react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const expandedDrawerWidth = 260;
const collapsedDrawerWidth = 88; 

const AppShell = ({ children, navItems, activePageId, onNavItemClick }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setIsCollapsed(!isDesktop);
  }, [isDesktop]);

  const handleDrawerToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const currentDrawerWidth = isCollapsed
    ? collapsedDrawerWidth
    : expandedDrawerWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: currentDrawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar
          sx={{ display: "flex", alignItems: "center", p: 2, gap: 1, pl: 3 }}
        >
          <Bot size={32} color={theme.palette.text.primary} />
          {!isCollapsed && (
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
            >
              CareerMentor
            </Typography>
          )}
        </Toolbar>
        <List sx={{ px: 2, py:1, width: "100%" }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={activePageId === item.id}
                onClick={() => onNavItemClick(item.id)}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? "center" : "initial", 
                  px: 2.5,
                  borderRadius: 2,
                  mb: 1,
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { backgroundColor: "primary.dark" },
                    ...(isCollapsed && {
                      borderRadius: "50%",
                      margin: "0 auto",
                      width: "40px",
                      height: "53px",
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                    }),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 3,
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText primary={item.text} sx={{ opacity: 1 }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <IconButton
              color="primary"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="primary" onClick={toggleTheme}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton color="primary">
              <NotificationsOutlinedIcon />
            </IconButton>
            <Avatar
              sx={{
                ml: 2,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              {user?.name.charAt(0)}
            </Avatar>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppShell;
