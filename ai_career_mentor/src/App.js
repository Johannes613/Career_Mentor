import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Import all pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import WorkspacePage from "./pages/WorkspacePage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import RoadmapGeneratorPage from "./pages/RoadmapGeneratorPage";
import CoverLetterGeneratorPage from "./pages/CoverLetterGeneratorPage";
import MyDocumentsPage from "./pages/MyDocumentsPage";

import AppShell from "./layouts/AppShell";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Milestone,
  Mail,
  FolderKanban,
} from "lucide-react";

// This is the main application view with the sidebar and content
const MainApp = () => {
    const [activePage, setActivePage] = useState("dashboard");

    const navItems = [
        { id: "dashboard", text: "Dashboard", icon: <LayoutDashboard /> },
        { id: "workspace", text: "Workspace", icon: <Briefcase /> },
        { id: "resume-analyzer", text: "Resume Analyzer", icon: <FileText /> },
        { id: "cover-letter-generator", text: "Cover Letter", icon: <Mail /> },
        { id: "roadmap-generator", text: "Career Roadmap", icon: <Milestone /> },
        { id: "my-documents", text: "My Documents", icon: <FolderKanban /> },
    ];

    const renderPage = () => {
        switch (activePage) {
            case "workspace":
                return <WorkspacePage onNavItemClick={setActivePage} />;
            case "resume-analyzer":
                return <ResumeAnalyzerPage />;
            case "roadmap-generator":
                return <RoadmapGeneratorPage />;
            case "cover-letter-generator":
                return <CoverLetterGeneratorPage />;
            case "my-documents":
                return <MyDocumentsPage />;
            case "dashboard":
            default:
                return <StudentDashboardPage />;
        }
    };

    return (
        <AppShell
            navItems={navItems}
            activePageId={activePage}
            onNavItemClick={setActivePage}
        >
            {renderPage()}
        </AppShell>
    );
};


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* The landing page is now the root route */}
            <Route path="/" element={<LandingPage />} />
            {/* The dashboard is now directly accessible at /dashboard */}
            <Route path="/dashboard" element={<MainApp />} />
            {/* You can keep the login page for future use or remove it */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;