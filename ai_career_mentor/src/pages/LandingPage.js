import React from 'react';

import TopBar from '../components/landing/TopBar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import VideoSection from '../components/landing/VideoSection';
import AboutSection from '../components/landing/AboutSection';
import FaqSection from '../components/landing/FaqSection';
import Footer from '../components/landing/Footer';

const LandingPage = ({ onNavigateToLogin }) => {
    return (
        <>
            <TopBar onNavigateToLogin={onNavigateToLogin} />
            <HeroSection onNavigateToLogin={onNavigateToLogin} />
            <FeaturesSection />
            <VideoSection />
            <AboutSection />
            <FaqSection />
            <Footer />
        </>
    );
};

export default LandingPage;