import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, Drawer, List, ListItem, ListItemText, Divider, ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom'; // Import Link for routing
import { Bot } from 'lucide-react';
import { useThemeContext } from '../../contexts/ThemeContext';

// FIX: The onNavigateToLogin prop is no longer needed
const TopBar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { title: 'Features', to: 'features' },
    { title: 'About', to: 'about' },
    { title: 'Demo', to: 'video' },
    { title: 'FAQ', to: 'faq' },
    
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: 'black',
          color: 'white',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Bot size={28} />
            <Typography variant="h6" fontWeight="bold">CareerMentor</Typography>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navLinks.map((link) => (
              <ScrollLink
                key={link.title}
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                style={{ cursor: 'pointer' }}
              >
                <Button
                  color="inherit"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.89)',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: 'white',
                    },
                  }}
                >
                  {link.title}
                </Button>
              </ScrollLink>
            ))}
          </Box>

          {/* Action Buttons (Desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit" title="Toggle theme">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {/* FIX: Use RouterLink for navigation */}
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Sign In
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: 'grey.200',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
              <ListItemText primary={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} />
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemButton>
            {/* FIX: Use RouterLink for navigation in the drawer */}
            <ListItemButton component={RouterLink} to="/login">
              <ListItemText primary="Sign In / Sign Up" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;