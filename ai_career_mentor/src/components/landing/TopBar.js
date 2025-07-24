import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext"; // Import the useAuth hook

const TopBar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { title: "Features", to: "features" },
    { title: "About", to: "about" },
    { title: "Demo", to: "video" },
    { title: "FAQ", to: "faq" },
    { title: "Contact", to: "footer" },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: "black",
          color: "white",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Bot size={28} />
            <Typography variant="h6" fontWeight="bold">
              CareerMentorAI
            </Typography>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link) => (
              <ScrollLink
                key={link.title}
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                style={{ cursor: "pointer" }}
              >
                <Button
                  color="inherit"
                  sx={{
                    color: "rgba(255, 255, 255, 0.88)",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "white",
                    },
                  }}
                >
                  {link.title}
                </Button>
              </ScrollLink>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              title="Toggle theme"
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="outlined"
              color="inherit"
            >
              Dashboard
            </Button>

            {user && !user.isGuest ? (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "black",
                  marginLeft: 0.5,
                  "&:hover": {
                    bgcolor: "grey.200",
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    marginLeft: 0.5,
                    "&:hover": {
                      bgcolor: "grey.200",
                    },
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, bgcolor: "background.default", height: "100%" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <Typography variant="h6" fontWeight="bold">
                CareerMentorAI
              </Typography>
            </ListItem>
            <Divider />
            {navLinks.map((link) => (
              <ScrollLink
                key={link.title}
                to={link.to}
                smooth
                duration={500}
                offset={-70}
              >
                <ListItemButton>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ScrollLink>
            ))}
            <Divider />
            <ListItemButton onClick={toggleTheme}>
              <ListItemText
                primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
              />
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemButton>
            {user && !user.isGuest ? (
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            ) : (
              <ListItemButton component={RouterLink} to="/login">
                <ListItemText primary="Sign In / Sign Up" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;
