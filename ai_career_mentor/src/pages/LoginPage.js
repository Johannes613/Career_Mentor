import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment, Link, useTheme, Divider, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
    const { signUp, login, loginWithGoogle } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleToggleForm = (event) => {
        event.preventDefault();
        setError('');
        setIsSignUp(prev => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');

        try {
            if (isSignUp) {
                await signUp(name, email, password);
            } else {
                await login(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };
    
    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="row g-0">
            <div 
                className="col-12 col-md-6 col-lg-5 d-flex"
                style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3rem 2rem', 
                    minHeight: '400px'
                }}
            >
                <Bot size={80} />
                <Typography component="h1" variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
                    Hi, Welcome to Career Mentor
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8, textAlign: 'center' }}>
                    More effectively with our AI-powered career tools.
                </Typography>
            </div>

            <div className="col-12 col-md-6 col-lg-7">
                <Box
                    sx={{
                        minHeight: { xs: 'auto', sm: '100vh' },
                        py: { xs: 8, sm: 0 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 4,
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: '400px' }}>
                        <Typography component="h1" variant="h5" fontWeight="bold">
                            {isSignUp ? 'Create an account' : 'Welcome Back!'}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                            {isSignUp ? 'Get started with your free account.' : 'Sign in to continue.'}
                        </Typography>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            {isSignUp && (
                                <TextField margin="normal" required fullWidth id="name" label="Full Name" name="name" autoComplete="name" autoFocus />
                            )}
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus={!isSignUp} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }}>
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>

                            <Divider sx={{ my: 2 }}>OR</Divider>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                onClick={handleGoogleSignIn}
                            >
                                Sign in with Google
                            </Button>
                            
                            <div className="d-flex justify-content-end mt-3">
                                <Link href="#" variant="body2" onClick={handleToggleForm}>
                                    {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                                </Link>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default LoginPage;
