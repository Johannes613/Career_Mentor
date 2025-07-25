import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const VideoSection = () => {
    const videoId = 'zkhabfxuGt4';
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;

    return (
        <Box id="video" sx={{ py: 10 }}>
            <div className="container-lg">
                <Typography variant="h4" component="h2" fontWeight="bold" align="center" gutterBottom>
                    See CareerMentor in Action
                </Typography>
                <Typography color="text.secondary" align="center" paragraph sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
                    Watch this short demo to see how our AI tools can transform your job application process from start to finish.
                </Typography>
                
                <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                    <Paper
                        elevation={4}
                        sx={{
                            position: 'relative',
                            paddingTop: '63.25%', 
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: 2,
                        }}
                    >
                        <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            src={embedUrl}
                            title="CareerMentorAI Demo Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Paper>
                </Box>
            </div>
        </Box>
    );
};

export default VideoSection;
