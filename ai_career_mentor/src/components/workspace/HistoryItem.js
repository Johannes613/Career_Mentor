import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const HistoryItem = ({ icon, toolName, timestamp }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
      <Typography fontWeight="medium">{toolName}</Typography>
    </Box>
    <Typography variant="body2" color="text.secondary">
      {timestamp}
    </Typography>
  </Paper>
);

export default HistoryItem;