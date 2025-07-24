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

// The component now accepts an 'onClick' prop
const ToolCard = ({ icon, title, description, buttonText, onClick }) => {
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
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
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
          // The onClick prop is passed to the Button
          onClick={onClick}
          sx={{
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
            borderWidth: '1.3px',
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};

export default ToolCard;