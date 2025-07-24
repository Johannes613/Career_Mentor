import React, { useState } from "react";
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* The main routing logic is now handled by the AppRouter component */}
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

// This new component decides whether to show the landing page, login, or the main app
const AppRouter = () => {
    const { user } = useAuth();
    // This state determines if we show the landing page or the login/app flow
    const [showLanding, setShowLanding] = useState(true);

    // If a user is logged in, show the main authenticated app
    if (user) {
        return <AuthenticatedApp />;
    }

    // If no user, decide between landing and login
    return showLanding ? (
        <LandingPage onNavigateToLogin={() => setShowLanding(false)} />
    ) : (
        <LoginPage />
    );
};


// This is your original "Main" component, now renamed for clarity
const AuthenticatedApp = () => {
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

export default App;