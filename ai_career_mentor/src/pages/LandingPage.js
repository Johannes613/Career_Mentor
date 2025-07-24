import React from "react";

import TopBar from "../components/landing/TopBar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import VideoSection from "../components/landing/VideoSection";
import AboutSection from "../components/landing/AboutSection";
import FaqSection from "../components/landing/FaqSection";
import Footer from "../components/landing/Footer";
import Chatbot from "../components/common/Chatbot"; 

const LandingPage = ({ onNavigateToLogin }) => {
  return (
    <>
      <TopBar onNavigateToLogin={onNavigateToLogin} />
      <main>
        <HeroSection onNavigateToLogin={onNavigateToLogin} />
        <AboutSection />
        <FeaturesSection />
        <VideoSection />
        <FaqSection />
      </main>
      <Footer />
      {/* Add the Chatbot component here so it floats over the landing page */}
      <Chatbot />
    </>
  );
};

export default LandingPage;
