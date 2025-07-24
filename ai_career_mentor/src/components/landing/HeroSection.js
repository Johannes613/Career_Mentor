import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom'; // Import Link for routing

// Make sure the path to your image is correct
import HeroImage from '../../assets/images/heroImg.jpg'; 

// FIX: The onNavigateToLogin prop is no longer needed
const HeroSection = () => {
    return (
        <Box
            id="hero"
            sx={{
                minHeight: '95vh',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                backgroundImage: `url(${HeroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark overlay for text contrast */}
            <Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1,
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight="bold" 
                    gutterBottom 
                    sx={{ 
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' } 
                    }}
                >
                    Your AI-Powered Career Mentor
                </Typography>
                <Typography 
                    variant="h6" 
                    color="rgba(255,255,255,0.9)" 
                    sx={{ my: 3, textShadow: '0 1px 3px rgba(0,0,0,0.4)', maxWidth: '700px', mx: 'auto' }}
                >
                    Stop guessing, start planning. Get data-driven resume feedback, personalized career roadmaps, and tailored cover letters, all in one place.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    {/* FIX: This button now uses RouterLink to navigate to the /dashboard route */}
                    <Button 
                        component={RouterLink}
                        to="/dashboard"
                        variant="contained" 
                        size="large" 
                        sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.200' } }}
                    >
                        Go To Dashboard
                    </Button>
                    <ScrollLink to="video" smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
                        <Button 
                            variant="outlined" 
                            size="large" 
                            color="inherit" 
                            sx={{ 
                                borderColor: 'rgba(255,255,255,0.8)', 
                                '&:hover': { 
                                    borderColor: 'white', 
                                    bgcolor: 'rgba(255,255,255,0.1)' 
                                } 
                            }}
                        >
                            Watch a Demo
                        </Button>
                    </ScrollLink>
                </Stack>
            </div>
        </Box>
    );
};

export default HeroSection;
