import React from 'react';
import { Paper, Typography, Box, IconButton, Button, Menu, MenuItem, useTheme } from '@mui/material';
import { MoreVertical, Eye, Download } from 'lucide-react';

const DocumentListItem = ({ icon, type, title, date }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                flexWrap: 'wrap',
                gap: 2,
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                    sx={{ 
                        width: 40, 
                        height: 40, 
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
                <Box>
                    <Typography fontWeight="medium">{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Generated on ${date}`}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                <Button variant="outlined" size="small" startIcon={<Eye size={16} />}>View</Button>
                <Button variant="outlined" size="small" startIcon={<Download size={16} />}>Download</Button>
                <IconButton onClick={handleClick}>
                    <MoreVertical size={20} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Share</MenuItem>
                    <MenuItem onClick={handleClose}>Rename</MenuItem>
                    <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
                </Menu>
            </Box>
        </Paper>
    );
};

export default DocumentListItem;