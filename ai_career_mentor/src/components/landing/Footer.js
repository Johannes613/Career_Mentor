import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Bot } from 'lucide-react';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 4, borderTop: 1, borderColor: 'divider' }}>
            <div className="container text-center">
                <Bot size={28} color="primary" />
                <Typography variant="h6" fontWeight="bold" sx={{ my: 1 }}>
                    CareerMentorAI
                </Typography>
                <Box sx={{ my: 2 }}>
                    <Link href="#" color="text.secondary" sx={{ mx: 1.5 }}>Features</Link>
                    <Link href="#" color="text.secondary" sx={{ mx: 1.5 }}>About</Link>
                    <Link href="#" color="text.secondary" sx={{ mx: 1.5 }}>Contact</Link>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} CareerMentorAI. All rights reserved.
                </Typography>
            </div>
        </Box>
    );
};

export default Footer;