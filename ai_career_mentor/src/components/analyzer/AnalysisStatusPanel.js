import React from 'react';
import { Typography, Box, CircularProgress, Divider } from '@mui/material';
import { Hash, FileText, Building, Calendar } from 'lucide-react';

const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        {icon}
        <Box>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography fontWeight="medium">{value}</Typography>
        </Box>
    </Box>
);

const AnalysisStatusPanel = ({ fileName }) => {
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: 'action.selected' }}>
                <CircularProgress size={24} />
                <Box>
                    <Typography fontWeight="medium">Processing</Typography>
                    <Typography variant="caption" color="text.secondary">
                        AI verification in progress...
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AnalysisStatusPanel;