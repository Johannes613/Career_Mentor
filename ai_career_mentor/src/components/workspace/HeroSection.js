import React from 'react';
import { Paper, Typography, Button, useTheme } from '@mui/material';
import { lighten } from '@mui/material/styles';

const HeroSection = () => {
  const theme = useTheme();

  // Blackish gradient using grey[900] as base
  const gradientStartColor = theme.palette.grey[900]; // Very dark gray (blackish)
  const gradientEndColor = lighten(gradientStartColor, 0.3); // Slightly lighter tone for gradient effect

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        color: theme.palette.common.white, // White text on dark background
        background: `linear-gradient(90deg, ${gradientStartColor} 35%, ${gradientEndColor} 100%)`,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
        AI Career Coach Agent
      </Typography>
      <Typography sx={{ my: 1, maxWidth: '750px', opacity: 0.9 }}>
        Smarter career decisions start here — get tailored advice, real-time market insights, and a roadmap built just for you with the power of AI.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[200],
            color: theme.palette.mode === 'light' ? '#fff' : '#000',
          },
        }}
      >
        Let’s Get Started
      </Button>
    </Paper>
  );
};

export default HeroSection;
