import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';

// Step 1: Import your local image file.
// Make sure the path is correct relative to this component file.
import HeroImage from '../../assets/images/heroImg.jpg'; 

const HeroSection = ({ onNavigateToLogin }) => {
    return (
        <Box
            id="hero"
            sx={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white', // Set text color to white for readability
                position: 'relative', // Needed for the overlay
                
                // Step 2: Use the imported image with the correct syntax
                backgroundImage: `url(${HeroImage})`,
                backgroundSize: 'cover', // Ensures the image covers the entire area
                backgroundPosition: 'center', // Centers the image
            }}
        >
            {/* NEW: Add a dark overlay for text contrast */}
            <Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% black overlay
                    zIndex: 1,
                }}
            />

            {/* Your content, now with zIndex to appear above the overlay */}
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Your AI-Powered Career Co-Pilot
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.9)" sx={{ my: 3, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                    Stop guessing, start planning. Get data-driven resume feedback, personalized career roadmaps, and tailored cover letters—all in one place.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <Button variant="contained" size="large" onClick={onNavigateToLogin} sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.200' } }}>
                        Get Started for Free
                    </Button>
                    <ScrollLink to="video" smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
                        <Button variant="outlined" size="large" color="inherit" sx={{ borderColor: 'rgba(255,255,255,0.8)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            Watch a Demo
                        </Button>
                    </ScrollLink>
                </Stack>
            </div>
        </Box>
    );
};

export default HeroSection;
