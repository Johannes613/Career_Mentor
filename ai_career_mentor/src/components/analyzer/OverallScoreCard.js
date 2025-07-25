import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, useTheme } from '@mui/material';
import { lighten, darken } from '@mui/material/styles';

const OverallScoreCard = ({ score, feedback }) => {
    const theme = useTheme();
    const gradientStartColor = theme.palette.primary.main;
    const gradientEndColor = theme.palette.mode === 'light' 
        ? lighten(gradientStartColor, 0.3) 
        : darken(gradientStartColor, 0.3);

    return (
        <Card sx={{ 
            background: `linear-gradient(90deg, ${gradientStartColor} 0%, ${gradientEndColor} 100%)`,
            color: 'primary.contrastText',
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                     <Typography variant="h6" fontWeight="bold">Overall Score</Typography>
                     <Typography sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 1.5, py: 0.5, borderRadius: 1.5, fontSize: '0.8rem' }}>
                        {score > 85 ? "Excellent" : score > 60 ? "Needs Improvement" : "Critical Issues"}
                     </Typography>
                </Box>
                <Typography variant="h2" fontWeight="bold">
                    {score}<Box component="span" sx={{ fontSize: '1.5rem', opacity: 0.7 }}>/100</Box>
                </Typography>
                <LinearProgress 
                    variant="determinate" 
                    value={score} 
                    color="inherit"
                    sx={{ height: 6, borderRadius: 3, my: 1, bgcolor: 'rgba(255,255,255,0.3)' }} 
                />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {feedback}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OverallScoreCard;