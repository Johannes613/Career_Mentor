import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Bot } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center', borderRadius: 4 }}>
                <Bot style={{ height: 64, width: 64, color: 'primary.main', margin: '0 auto 16px' }} />
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    CareerMentor
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Login to Your Dashboard
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => login('student')} sx={{color: 'white'}}>
                        Login as Student
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => login('admin')}>
                        Login as Admin
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage