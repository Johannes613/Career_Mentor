import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const VideoSection = () => {
    return (
        <Box id="video" sx={{ py: 10 }}>
            <div className="container-lg">
                <Typography variant="h4" component="h2" fontWeight="bold" align="center" gutterBottom>
                    See CareerMentorAI in Action
                </Typography>
                <Typography color="text.secondary" align="center" paragraph sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
                    Watch this short demo to see how our AI tools can transform your job application process from start to finish.
                </Typography>
                <Paper
                    elevation={4}
                    sx={{
                        position: 'relative',
                        paddingTop: '56.25%', 
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: 3,
                    }}
                >
                    <video
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        controls
                        src="https://youtu.be/p4r6454XSEA?si=UYseWi1ihaAt6bn0" 
                        poster="https://placehold.co/1920x1080/232526/FFFFFF?text=Video+Preview"
                    >
                        Your browser does not support the video tag.
                    </video>
                </Paper>
            </div>
        </Box>
    );
};

export default VideoSection;