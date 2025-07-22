import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const StudentStatCard = ({ title, value, Icon, color = "primary" }) => {
  const theme = useTheme();
  const mainColor = theme.palette[color]?.main || theme.palette.grey[500];

  const backgroundColor = alpha(mainColor, 0.1);

  return (
    <Card
      sx={{
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: backgroundColor,
              color: mainColor,
              width: 56,
              height: 56,
            }}
          >
            <Icon size={28} />
          </Avatar>
          <Box>
            <Typography color="text.secondary" variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentStatCard;
