import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import WorkspacePage from "./pages/WorkspacePage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import RoadmapGeneratorPage from "./pages/RoadmapGeneratorPage";
import CoverLetterGeneratorPage from "./pages/CoverLetterGeneratorPage";

import AppShell from "./layouts/AppShell";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Milestone,
  Mail,
  FolderKanban,
} from "lucide-react";
import MyDocumentsPage from "./pages/MyDocumentsPage";

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
        return <WorkspacePage />;
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


// <div className="col-12 mb-3">
//                     <Typography variant="h5" component="h2" fontWeight="bold">Key Features</Typography>
//                 </div>
//                 {features.map(feature => (
//                      <div className="col-12 col-lg-6 col-xl-4 mb-3 d-flex" key={feature.title}>
//                         <FeatureCard {...feature} />
//                     </div>
//                 ))}
