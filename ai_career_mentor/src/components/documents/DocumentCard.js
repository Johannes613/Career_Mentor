import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Button, Menu, MenuItem, useTheme } from '@mui/material';
import { MoreVertical, Eye, Download } from 'lucide-react';

const DocumentCard = ({ icon, type, title, date }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card 
            sx={{ 
                height: '105%', 
                width: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                border: `1px solid ${theme.palette.divider}`,
                // --- NEW: Added transition for a smooth hover effect ---
                transition: theme.transitions.create(['box-shadow', 'transform'], {
                    duration: theme.transitions.duration.short,
                }),
                // --- NEW: On hover, the card will lift up slightly ---
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                }
            }} 
            elevation={0}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box 
                        sx={{ 
                            width: 48, 
                            height: 48, 
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText'
                        }}
                    >
                        {icon}
                    </Box>
                    <IconButton onClick={handleClick}>
                        <MoreVertical size={20} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Share</MenuItem>
                        <MenuItem onClick={handleClose}>Rename</MenuItem>
                        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
                    </Menu>
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Generated on ${date}`}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                <Button fullWidth variant="contained" startIcon={<Eye size={16} />}>View</Button>
                {/* Refined: Using secondary color for the outlined button for better theme consistency */}
                <Button fullWidth variant="outlined" color="secondary" startIcon={<Download size={16} />}>Download</Button>
            </Box>
        </Card>
    );
};

export default DocumentCard;