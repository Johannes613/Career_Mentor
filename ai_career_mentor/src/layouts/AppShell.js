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
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Chatbot from "../components/common/Chatbot";
import { Bot, User, LogOut, Home } from "lucide-react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const expandedDrawerWidth = 260;
const collapsedDrawerWidth = 88;

const AppShell = ({ children, navItems, activePageId }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setIsCollapsed(!isDesktop);
  }, [isDesktop]);

  const handleDrawerToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to landing page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
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
        {/* This Box helps push the Home button to the bottom */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Toolbar
            sx={{ display: "flex", alignItems: "center", p: 2, gap: 1, pl: 3 }}
          >
            <Bot size={32} color={theme.palette.text.primary} onClick={()=> navigate('/')} />
            {!isCollapsed && (
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", whiteSpace: "nowrap",cursor: "pointer" }}
                onClick={() => navigate("/")}
                
              >
                CareerMentor
              </Typography>
            )}
          </Toolbar>
          <List sx={{ px: 2, py: 1, flexGrow: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={activePageId === item.id}
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
                        width: "56px",
                        height: "56px",
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

          {/* --- NEW: Back to Home Link at the Bottom --- */}
          <Box sx={{ px: 2, py: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" sx={{ borderRadius: 2 }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 3,
                    justifyContent: "center",
                  }}
                >
                  <Home />
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary="Back to Home" />}
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
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
            {user?.isGuest ? (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{ ml: 1.5 }}
              >
                Sign In
              </Button>
            ) : (
              <Tooltip title="Logout">
                <IconButton
                  color="primary"
                  onClick={handleLogout}
                  sx={{ ml: 1 }}
                >
                  <LogOut />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>{children}</Box>
        <Chatbot />
      </Box>
    </Box>
  );
};

export default AppShell;
