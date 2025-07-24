import React from 'react';
import { Box, Typography, Link, IconButton, useTheme } from '@mui/material';
import { Bot, Github, Linkedin, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
    const theme = useTheme();

    const socialLinks = [
        { icon: <Github size={18} />, href: "https://github.com/Johannes613" },
        { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/yohannis-adamu-1837832b9" },
        { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/162Qps5sq2" },
        { icon: <Twitter size={18} />, href: "https://x.com/john40336738581" },
    ];

    return (
        <Box
        id='footer'
            component="footer"
            sx={{
                // Use the theme's primary color for the background
                backgroundColor: 'black',
                color: 'white',
                pt: 8,
                pb: 4,
            }}
        >
            <div className="container">
                {/* --- Main Footer Content (Bootstrap Grid) --- */}
                <div className="row g-4 text-center text-md-start">
                    {/* About Section */}
                    <div className="col-12 col-md-4 col-lg-5">
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            About CareerMentor
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.8, opacity: 0.8 }}>
                            CareerMentorAI is your personalized AI-powered career coach. We help you build optimized resumes, prep for interviews, and craft tailored roadmaps for your dream career.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            {socialLinks.map((link, index) => (
                                <IconButton
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    sx={{ 
                                        color: 'white', 
                                        backgroundColor: 'rgba(255,255,255,0.1)', 
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } 
                                    }}
                                >
                                    {link.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </div>

                    {/* Quick Links */}
                    <div className="col-6 col-md-2 col-lg-2">
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Product
                        </Typography>
                        <Box>
                            <ScrollLink to="features" smooth duration={500} offset={-70} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <Link color="inherit" display="block" sx={{ mb: 1, opacity: 0.8, '&:hover': { opacity: 1 } }}>Features</Link>
                            </ScrollLink>
                            <ScrollLink to="about" smooth duration={500} offset={-70} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <Link color="inherit" display="block" sx={{ mb: 1, opacity: 0.8, '&:hover': { opacity: 1 } }}>How it works</Link>
                            </ScrollLink>
                            <ScrollLink to="faq" smooth duration={500} offset={-70} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <Link color="inherit" display="block" sx={{ mb: 1, opacity: 0.8, '&:hover': { opacity: 1 } }}>FAQ</Link>
                            </ScrollLink>
                        </Box>
                    </div>

                    {/* Resources */}
                    <div className="col-6 col-md-2 col-lg-2">
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Resources
                        </Typography>
                        <Box>
                            <ScrollLink to="video" smooth duration={500} offset={-70} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <Link color="inherit" display="block" sx={{ mb: 1, opacity: 0.8, '&:hover': { opacity: 1 } }}>Demo Video</Link>
                            </ScrollLink>
                            <Link href="https://github.com/Johannes613" target="_blank" color="inherit" display="block" sx={{ mb: 1, opacity: 0.8, '&:hover': { opacity: 1 } }}>GitHub</Link>
                            <ScrollLink to="contact" smooth duration={500} offset={-70} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <Link color="inherit" display="block" sx={{ mb: 1, opacity: 0.8, '&:hover': { opacity: 1 } }}>Contact</Link>
                            </ScrollLink>
                        </Box>
                    </div>

                    {/* Contact Info */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Phone size={16} />
                            <Typography variant="body2" sx={{ ml: 1 }}>+971 543948653</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Mail size={16} />
                            <Typography variant="body2" sx={{ ml: 1 }}>yohannisadmasu05@gmail.com</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <MapPin size={16} />
                            <Typography variant="body2" sx={{ ml: 1 }}>Abu Dhabi, UAE</Typography>
                        </Box>
                    </div>
                </div>

                {/* Bottom Bar */}
                <Box textAlign="center" mt={8} pt={4} borderTop={1} borderColor="rgba(255,255,255,0.1)">
                    <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
                        <Bot size={20} />
                        <Typography variant="h6" fontWeight="bold">CareerMentorAI</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        &copy; {new Date().getFullYear()} CareerMentorAI. All rights reserved.
                    </Typography>
                </Box>
            </div>
        </Box>
    );
};

export default Footer;