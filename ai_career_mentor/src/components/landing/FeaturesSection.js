import React from 'react';
import { Box, Typography } from '@mui/material';
import { ScanLine, Milestone, Mail, MessageSquare } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
    { icon: <ScanLine size={24} />, title: 'AI Resume Analysis', description: 'Get an instant score and actionable feedback to optimize your resume for any job.' },
    { icon: <Milestone size={24} />, title: 'Career Roadmaps', description: 'Generate a personalized, step-by-step learning path for your dream career.' },
    { icon: <Mail size={24} />, title: 'Cover Letter Generator', description: 'Create tailored cover letters that stand out by pasting a job description.' },
    { icon: <MessageSquare size={24} />, title: 'AI Career Chat', description: 'Ask any career-related question and get instant, expert-level advice 24/7.' },
];

const FeaturesSection = () => {
    return (
        <Box id="features" sx={{ py: 10, bgcolor: 'background.default' }}>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            A Smarter Way to Build Your Career
                        </Typography>
                        <Typography color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            CareerMentorAI provides a suite of intelligent tools designed to give you a competitive edge in the job market.
                        </Typography>
                    </div>
                </div>
                
                <div className="row g-4">
                    {features.map((feature, index) => (
                        <div className="col-12 col-sm-6 col-lg-3 d-flex" key={index}>
                            <FeatureCard {...feature} />
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default FeaturesSection;