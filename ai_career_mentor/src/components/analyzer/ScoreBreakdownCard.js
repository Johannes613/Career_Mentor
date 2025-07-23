import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ScoreBreakdownCard = ({ title, score, description }) => {
    const getScoreColor = () => {
        if (score > 85) return 'success.main';
        if (score > 60) return 'warning.main';
        return 'error.main';
    };

    return (
        <Card sx={{ height: '100%' }} elevation={0}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{title}</Typography>
                    <Typography variant="h5" fontWeight="bold" color={getScoreColor()}>
                        {score}%
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ScoreBreakdownCard;