import React from 'react';
import { Paper, Typography, Box, Button, Chip, useTheme } from '@mui/material';
import { ArrowRight } from 'lucide-react';

// HistoryItem now accepts a 'status' prop to determine the chip color
const HistoryItem = ({ icon, toolName, timestamp, status }) => {
    const theme = useTheme();

    const getStatusColor = () => {
        switch (status) {
            case 'Completed':
                return 'success';
            case 'In Progress':
                return 'warning';
            case 'Failed':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap', // Allow wrapping on small screens
                gap: 2
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
                <Box>
                    <Typography fontWeight="medium">{toolName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {timestamp}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
                <Chip label={status} color={getStatusColor()} size="small" />
                <Button 
                    variant="outlined" 
                    color="secondary"
                    endIcon={<ArrowRight size={16} />}
                >
                    View Document
                </Button>
            </Box>
        </Paper>
    );
};

export default HistoryItem;