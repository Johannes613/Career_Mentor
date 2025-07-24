import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
// Import professional icons from lucide-react
import { Target, Zap, GraduationCap } from 'lucide-react';

const AboutSection = () => {
    const theme = useTheme();

    const features = [
        { icon: <Zap size={20} />, text: 'Centralized AI tools for a streamlined workflow.' },
        { icon: <Target size={20} />, text: 'Data-driven insights, not generic templates.' },
        { icon: <GraduationCap size={20} />, text: 'A clear path from learning to landing a job.' },
    ];

    return (
        <Box id="about" sx={{ py: 10, bgcolor: 'background.default',minHeight: '65vh' }}>
            <div className="container">
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                    marginBottom={4}
                >
                    About CareerMentor
                </Typography>
                
                <div className="row align-items-center g-4">
                    {/* Left Panel: Image */}
                    <div className="col-12 col-md-6">
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                            alt="Students planning their careers"
                            // FIX: Reduced border radius for a sharper, more modern look
                            sx={{ width: '100%', borderRadius: 2, boxShadow: 4 }}
                        />
                    </div>
                    {/* Right Panel: Professional Text Content */}
                    <div className="col-12 col-md-6">
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="primary.main"
                            sx={{ mb: 1 }}
                        >
                            OUR MISSION
                        </Typography>
                        <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                            Built for the Modern Student
                        </Typography>
                        <Typography paragraph color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                            We understand the challenges students face. Disorganized resources, generic advice, and uncertainty about the future. CareerMentorAI was built to solve these problems.
                        </Typography>
                        
                        {/* Redesigned feature list for a more professional look */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {features.map((feature, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="body1" color="text.secondary">
                                        {feature.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default AboutSection;