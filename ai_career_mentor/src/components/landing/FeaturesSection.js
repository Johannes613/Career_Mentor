import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { ScanLine, Milestone, Mail, MessageSquare } from 'lucide-react';

const features = [
    { icon: <ScanLine size={32} />, title: 'AI Resume Analysis', description: 'Get an instant score and actionable feedback to optimize your resume for any job.' },
    { icon: <Milestone size={32} />, title: 'Career Roadmaps', description: 'Generate a personalized, step-by-step learning path for your dream career.' },
    { icon: <Mail size={32} />, title: 'Cover Letter Generator', description: 'Create tailored cover letters that stand out by pasting a job description.' },
    { icon: <MessageSquare size={32} />, title: 'AI Career Chat', description: 'Ask any career-related question and get instant, expert-level advice 24/7.' },
];

const FeaturesSection = () => {
    return (
        <Box id="features" sx={{ py: 10, bgcolor: 'background.default' }}>
            <div className="container">
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    A Smarter Way to Build Your Career
                </Typography>
                <Typography align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                    CareerMentorAI provides a suite of intelligent tools designed to give you a competitive edge in the job market.
                </Typography>
                <div className="row g-4">
                    {features.map((feature, index) => (
                        <div className="col-12 col-sm-6 col-md-3" key={index}>
                            <Card sx={{ height: '100%', textAlign: 'center' }} elevation={0}>
                                <CardContent>
                                    <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                                    <Typography color="text.secondary" variant="body2">{feature.description}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default FeaturesSection;