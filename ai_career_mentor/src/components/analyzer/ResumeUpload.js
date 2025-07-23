import React, { useState } from 'react';
import { Paper, Typography, Button, Box, useTheme, CircularProgress } from '@mui/material';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { alpha } from '@mui/material/styles';

const ResumeUpload = ({ onAnalysisStart, isLoading }) => {
    const theme = useTheme();
    const [file, setFile] = useState(null);

    const handleFileSelect = (selectedFile) => {
        if (selectedFile) {
            setFile(selectedFile);
            if (onAnalysisStart) {
                onAnalysisStart(selectedFile); // Pass the selected file to the parent
            }
        }
    };
    
    // ... (rest of the component is the same)
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };


    return (
        <Paper
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            elevation={0}
            sx={{
                border: `2px dashed ${theme.palette.divider}`,
                borderRadius: 4, p: 4, textAlign: 'center',
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                transition: 'background-color 0.3s',
                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) }
            }}
        >
            {isLoading ? (
                <CircularProgress />
            ) : (
                <UploadCloud size={48} color={theme.palette.primary.main} />
            )}
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {isLoading ? "Analyzing..." : file ? "File Ready to Analyze" : "Drag & Drop Your Resume Here"}
            </Typography>
            <Typography color="text.secondary">
                or click to browse
            </Typography>
            <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
                disabled={isLoading}
            >
                Browse File
                <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </Button>
            
            {file && !isLoading && (
                <Box mt={3}>
                    <Paper elevation={0} sx={{ p: 2, display: 'inline-flex', alignItems: 'center', gap: 2, backgroundColor: 'background.default' }}>
                        <FileText color={theme.palette.text.secondary} />
                        <Typography variant="body2">{file.name}</Typography>
                        <CheckCircle color={theme.palette.success.main} />
                    </Paper>
                </Box>
            )}
        </Paper>
    );
};

export default ResumeUpload;