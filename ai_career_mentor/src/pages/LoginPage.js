import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment, Link, useTheme } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

// Icons
import { Bot } from 'lucide-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const { login } = useAuth();
    const theme = useTheme();
    
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleForm = (event) => {
        event.preventDefault();
        setIsSignUp(prev => !prev);
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        login('student');
    };

    return (
        // Bootstrap's main row container. g-0 removes gutters.
        <div className="row g-0">
            {/* Left Decorative Panel */}
            <div 
                // RESPONSIVE FIX: This panel is now col-12 on mobile, and col-sm-4/col-md-5 on larger screens
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

            {/* Right Form Panel */}
            <div className="col-12 col-md-6 col-lg-7">
                <Box
                    sx={{
                        // RESPONSIVE FIX: Height adjusts for stacking vs side-by-side layout
                        minHeight: { xs: 'auto', sm: '100vh' },
                        py: { xs: 8, sm: 0 }, // Add vertical padding on mobile
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

                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            {isSignUp && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus={!isSignUp}
                            />
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
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {isSignUp && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                />
                            )}
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ 
                                    mt: 3, 
                                    mb: 2,
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'light' ? 'grey.800' : 'grey.200'
                                    }
                                }}
                            >
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>
                            
                            <div className="d-flex justify-content-end">
                                <Link href="#" variant="body2" onClick={handleToggleForm}>
                                    {isSignUp
                                        ? "Already have an account? Sign in"
                                        : "Don't have an account? Sign Up"}
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