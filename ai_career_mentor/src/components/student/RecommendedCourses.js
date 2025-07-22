import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip } from '@mui/material';
import { Code, Brush, BarChart2, Camera, Mic } from 'lucide-react';

const courses = [
  { name: 'Basic Front-end Development', views: '834 Views', Icon: Code },
  { name: 'Videography Basic Design Course', views: '1.2K Views', Icon: Camera },
  { name: 'Basic Fundamentals of Photography', views: '3.7K Views', Icon: Brush },
  { name: 'Advance Dribble Base Visual Design', views: '2.5K Views', Icon: BarChart2 },
  { name: 'Your First Singing Lesson', views: '948 Views', Icon: Mic },
];

const RecommendedCourses = () => (
  <Card
    elevation={0}
    sx={{ 
      border: '1px solid #e0e0e0', 
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
      {courses.map(({ name, views, Icon }) => (
        <Box
          key={name}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', color: 'background.paper', width: 36, height: 36 }}>
              <Icon size={18} />
            </Avatar>
            <Typography variant="body1" fontWeight={500}>
              {name}
            </Typography>
          </Box>
          <Chip label={views} variant="outlined" size="small" />
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default RecommendedCourses;
