import React from 'react';
import { Typography, Box } from '@mui/material';
const MyDocumentsPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold">
        My Generated Documents
      </Typography>
      <Typography color="text.secondary">
        Access all your generated resumes, cover letters, and career roadmaps here.
      </Typography>
    </Box>
  );
};

export default MyDocumentsPage;