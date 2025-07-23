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
          Welcome to CareerMentorAI
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
          <Button
            variant="outlined"
            size="large"
            sx={{
              mt: 2,
              color: theme.palette.common.black,
              bgcolor: theme.palette.common.white,
              fontWeight: "bold",
              padding: "8px 24px",
              border: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
              "&:hover": {
                bgcolor: theme.palette.common.black,
                color: theme.palette.common.white,
                border: `1px solid ${theme.palette.common.white}`,
              },
            }}
          >
            Analyze My Resume
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              mt: 2,
              color: theme.palette.common.white,
              fontWeight: "bold",
              padding: "8px 24px",
              border: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
              "&:hover": {
                bgcolor: theme.palette.common.white,
                color: theme.palette.common.black,
                border: `1px solid ${theme.palette.common.white}`,
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
