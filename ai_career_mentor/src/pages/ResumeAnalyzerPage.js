import React from 'react';
import { Typography } from '@mui/material';

const ResumeAnalyzerPage = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" fontWeight="bold">
        AI Resume Analyzer
      </Typography>
      <Typography color="text.secondary">
        Upload and analyze your resume here.
      </Typography>
    </div>
  );
};

export default ResumeAnalyzerPage;