import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip, CircularProgress, useTheme } from '@mui/material';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { alpha } from '@mui/material/styles';

const GeneratedLetterPreview = ({ letter, isLoading }) => {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">AI Generated Output</Typography>
                <Box>
                    <Tooltip title="Copy to Clipboard">
                        <IconButton><Copy size={18} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Download as PDF">
                        <IconButton><Download size={18} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Regenerate">
                        <IconButton><RefreshCw size={18} /></IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1, position: 'relative', overflowY: 'auto' }}>
                {isLoading && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(theme.palette.background.paper, 0.7),
                        zIndex: 1,
                    }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }} fontWeight="medium">AI is writing your cover letter...</Typography>
                    </Box>
                )}
                
                {letter ? (
                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>{letter}</Typography>
                ) : (
                    <Typography color="text.secondary">
                        Your generated cover letter will appear here once you provide the job details and click "Generate".
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default GeneratedLetterPreview;