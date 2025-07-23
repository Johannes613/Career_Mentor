import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Lightbulb } from 'lucide-react';

const ImprovementTips = ({ tips }) => {
    const theme = useTheme();
    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Tips for Improvement</Typography>
                <List>
                    {tips.map((tip, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                                <Lightbulb size={18} />
                            </ListItemIcon>
                            <ListItemText primary={tip} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ImprovementTips;