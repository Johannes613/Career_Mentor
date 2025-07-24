import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
        <Main />
      </AuthProvider>
    </ThemeProvider>
  );
}

const Main = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  if (!user) {
    return <LoginPage />;
  }

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
        // The navigation function is passed to WorkspacePage here
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