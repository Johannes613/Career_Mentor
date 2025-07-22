import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const data = [{ name: "Profile", value: 82 }];

const ProfileCompletion = () => (
  <Card sx={{ height: "100%", width: "100%" }}>
    <CardContent
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
        Profile Completion
      </Typography>

      <Box sx={{ flexGrow: 1, position: "relative", minHeight: "180px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="90%"
            barSize={20}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
              fill="#000000"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            82%
          </Typography>
          <Typography color="text.secondary">Completed</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
export default ProfileCompletion;
