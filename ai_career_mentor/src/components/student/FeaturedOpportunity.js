import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  alpha,
  useTheme,
} from "@mui/material";
import { ShieldCheck, Compass, MessageSquare } from "lucide-react";

const FeaturedOpportunity = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        overflow: "hidden",
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Typography
          component="h2"
          fontWeight="bold"
          variant={{ xs: "h5", sm: "h4" }}
        >
          Welcome to CareerMentor
        </Typography>
        <Typography
          sx={{ my: 1, opacity: 0.9 }}
          variant={{ xs: "body2", sm: "body1" }}
        >
          AI-Powered Career Guidance & Credential Tracking
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 4 },
            my: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShieldCheck size={20} />
            <Typography variant="body2" fontWeight="medium">
              Secure Credentials
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Compass size={20} />
            <Typography variant="body2" fontWeight="medium">
              Personalized Roadmap
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MessageSquare size={20} />
            <Typography variant="body2" fontWeight="medium">
              AI Career Assistant
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          {/* --- Primary Button (High Contrast) --- */}
          <Button
            variant="contained" // Changed to contained for a solid look
            size="large"
            sx={{
              // FIX: Use theme's contrast color for background
              bgcolor: 'primary.contrastText',
              // FIX: Use theme's main color for text
              color: 'primary.main',
              fontWeight: "bold",
              padding: "8px 24px",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.contrastText, 0.9),
              },
            }}
          >
            Analyze My Resume
          </Button>
          
          {/* --- Secondary Button (Outlined) --- */}
          <Button
            variant="outlined"
            size="large"
            // "inherit" makes the button use the parent's contrastText color
            color="inherit" 
            sx={{
              fontWeight: "bold",
              padding: "8px 24px",
              // FIX: Use alpha on the theme's contrast color for the border
              borderColor: alpha(theme.palette.primary.contrastText, 0.5),
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.contrastText, 0.1),
                borderColor: 'primary.contrastText',
              },
            }}
          >
            Ask Career Coach
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeaturedOpportunity;
