import React from 'react';
import { Typography, Box, Avatar, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const HowItWorksStepper = ({ steps, activeStep }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        position: 'relative',
        gap: { xs: 2, md: 0 },
      }}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = activeStep > stepNumber;
        const isActive = activeStep === stepNumber;

        return (
          <React.Fragment key={step.number}>
            <Box sx={{ flex: 1, minWidth: 200, textAlign: 'center', px: 2 }}>
              <Avatar
                sx={{
                  bgcolor: isCompleted
                    ? theme.palette.success.main
                    : isActive
                    ? theme.palette.primary.main
                    : theme.palette.grey[300],
                  color: isCompleted || isActive ? '#fff' : theme.palette.grey[700],
                  width: 48,
                  height: 48,
                  mx: 'auto',
                  mb: 1,
                  transition: 'all 0.4s ease',
                }}
              >
                {isCompleted ? <CheckIcon /> : <Typography fontWeight="bold">{step.number}</Typography>}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </Box>

            {index < steps.length - 1 && (
              <Box
                sx={{
                  position: 'relative',
                  flex: 1,
                  height: 2,
                  mx: 1,
                  backgroundColor: theme.palette.grey[300],
                  borderRadius: 1,
                  transition: 'background-color 0.3s ease',
                  mt: '-28px', 
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    borderRadius: 1,
                    width:
                      activeStep > stepNumber
                        ? '100%'
                        : activeStep === stepNumber
                        ? '50%'
                        : '0%',
                    backgroundColor: theme.palette.success.main,
                    transition: 'width 1s ease',
                  }}
                />
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default HowItWorksStepper;
