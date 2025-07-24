import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const AboutSection = () => {
    return (
        <Box id="about" sx={{ py: 10, bgcolor: 'background.default' }}>
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-12 col-md-6">
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                            alt="Students planning their careers"
                            sx={{ width: '100%', borderRadius: 3, boxShadow: 4 }}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                            Built for the Modern Student
                        </Typography>
                        <Typography paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            We understand the challenges students face. Disorganized resources, generic advice, and uncertainty about the future. CareerMentorAI was built to solve these problems.
                        </Typography>
                        <List>
                            {[
                                'Centralized AI tools for a streamlined workflow.',
                                'Data-driven insights, not generic templates.',
                                'A clear path from learning to landing a job.',
                            ].map((text, index) => (
                                <ListItem key={index} disableGutters>
                                    <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}><CheckCircle /></ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default AboutSection;