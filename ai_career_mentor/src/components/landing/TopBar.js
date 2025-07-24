import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Bot } from 'lucide-react';

const TopBar = ({ onNavigateToLogin }) => {
    const navLinks = [
        { title: 'Features', to: 'features' },
        { title: 'About', to: 'about' },
        { title: 'FAQ', to: 'faq' },
        { title: 'Contact', to: 'contact' },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Bot size={28} color="primary" />
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                        CareerMentorAI
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    {navLinks.map((link) => (
                        <ScrollLink key={link.title} to={link.to} smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
                            <Button color="inherit" sx={{ color: 'text.secondary' }}>{link.title}</Button>
                        </ScrollLink>
                    ))}
                </Box>
                <Box>
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={onNavigateToLogin}>Sign In</Button>
                    <Button variant="contained" onClick={onNavigateToLogin}>Sign Up</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;