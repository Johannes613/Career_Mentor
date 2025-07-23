import React from "react";
import { Paper, Typography, Button, useTheme } from "@mui/material";
import { alpha, lighten } from "@mui/material/styles";

const HeroSection = () => {
  const theme = useTheme();
  const gradientStartColor = theme.palette.grey[900];
  const gradientEndColor = lighten(gradientStartColor, 0.3);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        color: theme.palette.common.white,
        background: `linear-gradient(90deg, ${gradientStartColor} 35%, ${gradientEndColor} 100%)`,
        transition: "background 0.3s ease-in-out",
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
        AI Career Coach Agent
      </Typography>
      <Typography sx={{ my: 1, maxWidth: "750px", opacity: 0.9 }}>
        Smarter career decisions start here and get tailored advice, real-time
        market insights, and a roadmap built just for you with the power of AI.
      </Typography>
      <Button
        variant="outlined"
        size="large"
        sx={{
          mt: 2,
          color: theme.palette.common.white,
          fontWeight: "bold",
          padding: "7px 24px",
          border: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
          "&:hover": {
            bgcolor: theme.palette.common.white,
            color: theme.palette.common.black,
            border: `1px solid ${theme.palette.common.white}`,
          },
        }}
      >
        Let’s Get Started
      </Button>
    </Paper>
  );
};

export default HeroSection;
