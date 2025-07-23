import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const ToolCard = ({ icon, title, description, buttonText }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 4,
        padding: 1,

        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.palette.divider}`,
        // --- NEW: Added transition for a smooth hover effect ---
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.short,
        }),
        // --- NEW: On hover, the card will lift up slightly ---
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* --- NEW: Styled container for the icon --- */}
        <Box
          sx={{
            width: 48,
            height: 48,
            mb: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h3" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{
            // On hover, fill the background and use the contrast text color
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
            border: 1.3,
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};

export default ToolCard;
