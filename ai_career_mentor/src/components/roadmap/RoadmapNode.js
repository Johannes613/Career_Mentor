import React from 'react';
import { Handle, Position } from 'reactflow';
import { Paper, Typography, Link, useTheme } from '@mui/material';

const RoadmapNode = ({ data }) => {
    const theme = useTheme();
    return (
        <>
            {/* Handles are the connection points for the edges */}
            <Handle type="target" position={Position.Top} />
            <Paper 
                elevation={2}
                sx={{ 
                    padding: 2, 
                    width: 220,
                    backgroundColor: theme.palette.mode === 'light' ? '#FFFBEB' : '#424242', // Light yellow or dark grey
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="subtitle2" fontWeight="bold">{data.label}</Typography>
                <Typography variant="caption" color="text.secondary">{data.description}</Typography>
                <Link href="#" underline="always" sx={{ display: 'block', mt: 1, fontSize: '0.8rem' }}>
                    Learn More
                </Link>
            </Paper>
            <Handle type="source" position={Position.Bottom} />
        </>
    );
};

export default RoadmapNode;