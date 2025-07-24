import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Avatar, useTheme, useMediaQuery, Button, Tooltip, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Chatbot from '../components/common/Chatbot';

// Import necessary icons
import { Bot, User, LogOut, Home } from 'lucide-react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Import the new icon

const expandedDrawerWidth = 260;
const collapsedDrawerWidth = 88; 

const AppShell = ({ children, navItems, activePageId }) => {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeContext();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isLargeScreen = useMediaQuery('(min-width:1100px)');

    useEffect(() => {
        if (isLargeScreen) {
            setIsCollapsed(false);
        }
    }, [isLargeScreen]);

    const handleDrawerToggle = () => {
        if (isLargeScreen) {
            setIsCollapsed(!isCollapsed);
        } else {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const currentDrawerWidth = isCollapsed ? collapsedDrawerWidth : expandedDrawerWidth;

    const drawerContent = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Toolbar sx={{ display: "flex", alignItems: "center", p: 2, gap: 1, pl: 3 }}>
                <Bot size={32} color={theme.palette.text.primary} onClick={()=> navigate('/')} style={{cursor: 'pointer'}} />
                {(!isCollapsed || !isLargeScreen) && (
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        CareerMentor
                    </Typography>
                )}
            </Toolbar>
            <List sx={{ px: 2, py: 1, flexGrow: 1 }}>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={activePageId === item.id}
                            onClick={() => !isLargeScreen && setMobileOpen(false)}
                            sx={{
                                minHeight: 48,
                                justifyContent: (isCollapsed && isLargeScreen) ? "center" : "initial",
                                px: 2.5,
                                borderRadius: 2,
                                mb: 1,
                                "&.Mui-selected": {
                                    backgroundColor: "primary.main",
                                    color: "primary.contrastText",
                                    "&:hover": { backgroundColor: "primary.dark" },
                                    ...((isCollapsed && isLargeScreen) && {
                                        borderRadius: "50%",
                                        margin: "0 auto",
                                        width: "56px",
                                        height: "56px",
                                        padding: 0,
                                        display: "flex",
                                        justifyContent: "center",
                                    }),
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: (isCollapsed && isLargeScreen) ? 0 : 3, justifyContent: "center", color: "inherit" }}>
                                {item.icon}
                            </ListItemIcon>
                            {(!isCollapsed || !isLargeScreen) && (
                                <ListItemText primary={item.text} sx={{ opacity: 1 }} />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            
            <Box sx={{ px: 2, py: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/" sx={{ borderRadius: 2 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: (isCollapsed && isLargeScreen) ? 0 : 3, justifyContent: "center" }}>
                            <Home />
                        </ListItemIcon>
                        {(!isCollapsed || !isLargeScreen) && <ListItemText primary="Back to Home" />}
                    </ListItemButton>
                </ListItem>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            {isLargeScreen && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: currentDrawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: currentDrawerWidth,
                            boxSizing: "border-box",
                            borderRight: "none",
                            overflowX: "hidden",
                            transition: theme.transitions.create("width", {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {!isLargeScreen && (
                 <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: expandedDrawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: "background.default",
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        bgcolor: "background.paper",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="primary"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            {/* FIX: Use a right chevron to expand on large screens */}
                            {isLargeScreen ? (isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon />}
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="primary" onClick={toggleTheme}>
                            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <IconButton color="primary">
                            <NotificationsOutlinedIcon />
                        </IconButton>
                        
                        {user?.isGuest ? (
                            <Button component={Link} to="/login" variant="contained" sx={{ ml: 1.5 }}>
                                Sign In
                            </Button>
                        ) : (
                            <>
                                
                                <Tooltip title="Logout">
                                    <IconButton color="primary" onClick={handleLogout} sx={{ ml: 1 }}>
                                        <LogOut />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: 3 }}>{children}</Box>
                <Chatbot />
            </Box>
        </Box>
    );
};

export default AppShell;
