import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

const FeatureCard = ({ icon, title, description }) => {
    const theme = useTheme();
    return (
        <Card sx={{ width: '100%', height: '100%', textAlign: 'center' }} elevation={0}>
            <CardContent>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                <Typography color="text.secondary">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;