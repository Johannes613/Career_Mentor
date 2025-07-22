import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const ToolCard = ({ icon, title, description, buttonText }) => (
  <Card 
    variant="outlined" 
    sx={{ 
        width: '100%', 
        borderRadius: 3, 
        display: 'flex', 
        flexDirection: 'column',
        padding: 1,
        minHeight: 210,
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
      <Typography variant="h6" component="h3" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <Box sx={{ p: 2, pt: 0 }}>
      <Button variant="contained" fullWidth>
        {buttonText}
      </Button>
    </Box>
  </Card>
);

export default ToolCard;