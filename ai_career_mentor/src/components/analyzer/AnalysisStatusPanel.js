import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Divider } from '@mui/material';
import { Hash, FileText, Building, Calendar, CheckCircle } from 'lucide-react';

const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        {icon}
        <Box>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography fontWeight="medium">{value}</Typography>
        </Box>
    </Box>
);

const AnalysisStep = ({ label, isComplete }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, opacity: isComplete ? 1 : 0.5, transition: 'opacity 0.5s' }}>
        {isComplete ? <CheckCircle size={20} color="green" /> : <CircularProgress size={20} />}
        <Typography fontWeight={isComplete ? 'medium' : 'normal'} color={isComplete ? 'text.primary' : 'text.secondary'}>
            {label}
        </Typography>
    </Box>
);

const AnalysisStatusPanel = ({ fileName, currentStep }) => {
    const [completedStages, setCompletedStages] = useState([]);

    const analysisStages = [
        'Parsing Document Structure',
        'Analyzing Contact Information',
        'Evaluating Experience Section',
        'Checking Skills Keywords',
        'Finalizing Score & Feedback'
    ];

    useEffect(() => {
        // Simulate the completion of stages based on the parent's currentStep
        if (currentStep === 1) { // Uploaded
            setCompletedStages([analysisStages[0]]);
        }
        if (currentStep === 2) { // Analyzing
            setTimeout(() => setCompletedStages(prev => [...prev, analysisStages[1]]), 500);
            setTimeout(() => setCompletedStages(prev => [...prev, analysisStages[2]]), 1000);
            setTimeout(() => setCompletedStages(prev => [...prev, analysisStages[3]]), 1500);
        }
    }, [currentStep]);

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Document Information
            </Typography>
            <InfoRow icon={<Hash size={20} />} label="Document ID" value="TD-2025-784639" />
            <InfoRow icon={<FileText size={20} />} label="Document Type" value="Resume/CV" />
            <InfoRow icon={<Building size={20} />} label="Source" value={fileName} />
            <InfoRow icon={<Calendar size={20} />} label="Upload Date" value={new Date().toLocaleDateString()} />
            
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Analysis Breakdown
            </Typography>
            {analysisStages.map(stage => (
                <AnalysisStep key={stage} label={stage} isComplete={completedStages.includes(stage)} />
            ))}
        </Box>
    );
};

export default AnalysisStatusPanel;