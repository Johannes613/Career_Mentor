import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

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

const AuthenticatedApp = () => {
    const location = useLocation();
    const activePageId = location.pathname.split('/').pop() || 'dashboard';
    

    const navItems = [
        { id: "dashboard", text: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
        { id: "workspace", text: "Workspace", icon: <Briefcase />, path: "/dashboard/workspace" },
        { id: "resume-analyzer", text: "Resume Analyzer", icon: <FileText />, path: "/dashboard/resume-analyzer" },
        { id: "cover-letter-generator", text: "Cover Letter", icon: <Mail />, path: "/dashboard/cover-letter-generator" },
        { id: "roadmap-generator", text: "Career Roadmap", icon: <Milestone />, path: "/dashboard/roadmap-generator" },
        { id: "my-documents", text: "My Documents", icon: <FolderKanban />, path: "/dashboard/my-documents" },
    ];

    return (
        <AppShell navItems={navItems} activePageId={activePageId}>
            <Routes>
                <Route index element={<StudentDashboardPage />} />
                <Route path="workspace" element={<WorkspacePage />} />
                <Route path="resume-analyzer" element={<ResumeAnalyzerPage />} />
                <Route path="roadmap-generator" element={<RoadmapGeneratorPage />} />
                <Route path="cover-letter-generator" element={<CoverLetterGeneratorPage />} />
                <Route path="my-documents" element={<MyDocumentsPage />} />
            </Routes>
        </AppShell>
    );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* FIX: The dashboard is now the main route and is no longer protected */}
            <Route 
                path="/dashboard/*" 
                element={<AuthenticatedApp />} 
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;