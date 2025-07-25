import React from "react";
import HeroSection from "../components/workspace/HeroSection";
import ToolCard from "../components/workspace/ToolCard";
import HistoryItem from "../components/workspace/HistoryItem";
import { MessageSquare, FileText, Milestone, Mail } from "lucide-react";

const tools = [
  {
    id: "chatbot",
    path: null,
    icon: <MessageSquare />,
    title: "AI Career Q&A Chat",
    description: "Ask career questions",
    buttonText: "Ask Now",
  },
  {
    id: "resume-analyzer",
    path: "/dashboard/resume-analyzer",
    icon: <FileText />,
    title: "AI Resume Analyzer",
    description: "Improve your resume",
    buttonText: "Analyze Now",
  },
  {
    id: "cover-letter-generator",
    path: "/dashboard/cover-letter-generator",
    icon: <Mail />,
    title: "Cover Letter Generator",
    description: "Write a cover letter",
    buttonText: "Create Now",
  },
  {
    id: "roadmap-generator",
    path: "/dashboard/roadmap-generator",
    icon: <Milestone />,
    title: "Career Roadmap Generator",
    description: "Build your roadmap",
    buttonText: "Generate Now",
  },
];

const history = [
  {
    id: 1,
    icon: <FileText />,
    toolName: "AI Resume Analysis",
    timestamp: "Jul 21 2025 14:30:15 GMT+0400",
    status: "Completed",
  },

  {
    id: 2,
    icon: <Mail />,
    toolName: 'Cover Letter for "Software Engineer"',
    timestamp: "Jul 20 2025 11:22:05 GMT+0400",
    status: "Completed",
  },

  {
    id: 3,
    icon: <Milestone />,
    toolName: "Career Roadmap Generation",
    timestamp: "Jul 19 2025 09:45:50 GMT+0400",
    status: "In Progress",
  },

  {
    id: 5,
    icon: <Mail />,
    toolName: 'Cover Letter for "Data Analyst"',
    timestamp: "Jul 17 2025 10:05:18 GMT+0400",
    status: "Failed",
  },
];

// This component no longer needs any props
const WorkspacePage = () => {
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <div className="col-12">
          <HeroSection />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold">Available AI Tools</h2>
          <p className="text-muted">
            Start Building and Shape Your Career with this exclusive AI Tools
          </p>
        </div>
        <div className="col-12">
          <div className="row g-4">
            {tools.map((tool) => (
              <div key={tool.id} className="col-12 col-md-6 col-xl-3 d-flex">
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h2 className="fw-bold">Previous History</h2>
          <p className="text-muted">
            What you previously worked on, you can find here
          </p>
        </div>
        <div className="col-12">
          <div className="vstack gap-3">
            {history.map((item) => (
              <HistoryItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
