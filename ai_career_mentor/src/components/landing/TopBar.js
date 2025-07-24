import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Bot } from 'lucide-react';

// Import the theme context and icons for the theme toggle
import { useThemeContext } from '../../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const TopBar = ({ onNavigateToLogin }) => {
    // Get theme context to control light/dark mode
    const { mode, toggleTheme } = useThemeContext();
    const theme = useTheme();

    const navLinks = [
        { title: 'Features', to: 'features' },
        { title: 'About', to: 'about' },
        { title: 'FAQ', to: 'faq' },
        { title: 'Contact', to: 'contact' },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={2} // Add a subtle shadow for depth
            sx={{
                // Use a professional dark color for the background
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#121212',
                color: 'white', // Set default text color to white
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                    <Bot size={28} />
                    <Typography variant="h6" fontWeight="bold">
                        CareerMentorAI
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    {navLinks.map((link) => (
                        <ScrollLink key={link.title} to={link.to} smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
                            <Button 
                                color="inherit" 
                                sx={{ 
                                    color: 'rgba(255,255,255,0.7)',
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.08)',
                                        color: 'white'
                                    }
                                }}
                            >
                                {link.title}
                            </Button>
                        </ScrollLink>
                    ))}
                </Box>

                {/* Action Buttons & Theme Toggle */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={toggleTheme} color="inherit" title="Toggle theme">
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Button 
                        variant="outlined" 
                        color="inherit" 
                        sx={{ 
                            mr: 1,
                            borderColor: 'rgba(255,255,255,0.5)',
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                        }} 
                        onClick={onNavigateToLogin}
                    >
                        Sign In
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={onNavigateToLogin}
                        sx={{
                            // Use a high-contrast color for the main call-to-action
                            bgcolor: 'white',
                            color: 'black',
                            '&:hover': {
                                bgcolor: 'grey.200'
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
