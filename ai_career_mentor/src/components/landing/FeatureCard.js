import React from 'react';
import { Card, CardContent, Typography, Box, Link, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
    const theme = useTheme();

    return (
        <Card 
            elevation={0}
            sx={{ 
                width: '100%', 
                height: '100%',
                borderRadius: 2,
                textAlign: 'left', // Align text to the left for a cleaner look
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(['box-shadow', 'transform', 'border-color']),
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                    borderColor: 'primary.main',
                }
            }}
        >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box 
                    sx={{
                        width: 48,
                        height: 48,
                        mb: 2,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main'
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                <Typography color="text.secondary" variant="body2" sx={{ flexGrow: 1 }}>
                    {description}
                </Typography>
                <Link 
                    href="#" 
                    underline="none" 
                    sx={{ 
                        mt: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    Learn More <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                </Link>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;