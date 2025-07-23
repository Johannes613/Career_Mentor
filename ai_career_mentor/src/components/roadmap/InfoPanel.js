import React from 'react';
import { Card, CardContent, Typography, Button, Box, Divider, Stack } from '@mui/material';
import { Plus, Clock } from 'lucide-react';

const InfoPanel = ({ title, description, duration, hasRoadmap, onCreateAnother }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Stack spacing={2} sx={{ flexGrow: 1, my: 2 }}>
                    <Box>
                        <Typography variant="subtitle2" fontWeight="bold">Description:</Typography>
                        <Typography color="text.secondary" variant="body2">
                            {description}
                        </Typography>
                    </Box>

                    {hasRoadmap && (
                         <Box>
                            <Typography variant="subtitle2" fontWeight="bold">Details:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                <Clock size={16} />
                                <Typography variant="body2">
                                    Est. Duration: {duration}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Stack>
                
                {hasRoadmap && (
                    <Button 
                        variant="contained" 
                        fullWidth 
                        startIcon={<Plus />}
                        onClick={onCreateAnother}
                        sx={{ mt: 'auto' }}
                    >
                        Create Another Roadmap
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default InfoPanel;