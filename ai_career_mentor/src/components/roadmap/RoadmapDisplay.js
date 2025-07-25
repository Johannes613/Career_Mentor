import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css'; 
import RoadmapNode from './RoadmapNode';
import { Paper, useTheme, Box, CircularProgress, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

const nodeTypes = { roadmapNode: RoadmapNode };

const RoadmapDisplay = ({ nodes, edges, isLoading }) => {
    const theme = useTheme();

    const defaultEdgeOptions = {
        style: {
            strokeWidth: 2,
            stroke: theme.palette.text.secondary, 
        },
        markerEnd: { 
            type: 'arrowclosed',
            color: theme.palette.text.secondary,
        },
    };

    return (
        <Paper sx={{ height: '80vh', width: '100%', border: `1px solid ${theme.palette.divider}`, position: 'relative' }} elevation={0}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions} 
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>

            {(isLoading || nodes.length === 0) && (
                 <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', zIndex: 4,
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(2px)',
                }}>
                    {isLoading ? (
                        <>
                            <CircularProgress />
                            <Typography sx={{ mt: 2 }} fontWeight="medium">Generating Your Roadmap...</Typography>
                        </>
                    ) : (
                        <Typography color="text.secondary">Your roadmap will appear here.</Typography>
                    )}
                </Box>
            )}
        </Paper>
    );
};

export default RoadmapDisplay;