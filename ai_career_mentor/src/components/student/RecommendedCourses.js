import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip } from '@mui/material';
import { Bot, Code, Camera, Brush, BarChart2, Mic } from 'lucide-react';
const courseIconMap = {
    Code, Camera, Brush, BarChart2, Mic, Bot
};

const RecommendedCourses = ({ courses = [] }) => (
  <Card
    elevation={0}
    sx={{ 
      border: `1px solid #e0e0e0`, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%', 
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Top Recommended Courses
      </Typography>
      {courses.map(({ name, views, icon }, index) => {
          const IconComponent = courseIconMap[icon] || Bot;
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', color: 'background.paper', width: 36, height: 36 }}>
                  <IconComponent size={18} />
                </Avatar>
                <Typography variant="body1" fontWeight={500}>
                  {name}
                </Typography>
              </Box>
              <Chip label={views} variant="outlined" size="small" />
            </Box>
          )
      })}
    </CardContent>
  </Card>
);

export default RecommendedCourses;