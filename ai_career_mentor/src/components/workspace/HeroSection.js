import React from 'react';
import { Paper, Typography, Button, useTheme } from '@mui/material';
import { lighten } from '@mui/material/styles';

const HeroSection = () => {
  const theme = useTheme();
  const gradientEndColor = lighten(theme.palette.primary.main, 0.2);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        color: 'primary.contrastText',
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${gradientEndColor} 100%)`,
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
          bgcolor: 'background.paper',
          color: 'text.primary',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        Let's Get Started
      </Button>
    </Paper>
  );
};

export default HeroSection;