import React from 'react';
import HeroSection from '../components/workspace/HeroSection';
import ToolCard from '../components/workspace/ToolCard';
import HistoryItem from '../components/workspace/HistoryItem';
import { MessageSquare, FileText, Milestone, Mail } from 'lucide-react';

// Added an 'id' to each tool that matches the navigation ID in App.js
const tools = [
  { id: 'chatbot', icon: <MessageSquare />, title: 'AI Career Q&A Chat', description: 'Ask career questions', buttonText: 'Ask Now' },
  { id: 'resume-analyzer', icon: <FileText />, title: 'AI Resume Analyzer', description: 'Improve your resume', buttonText: 'Analyze Now' },
  { id: 'cover-letter-generator', icon: <Mail />, title: 'Cover Letter Generator', description: 'Write a cover letter', buttonText: 'Create Now' },
  { id: 'roadmap-generator', icon: <Milestone />, title: 'Career Roadmap Generator', description: 'Build your roadmap', buttonText: 'Generate Now' },
];

const history = [
    { id: 1, icon: <FileText />, toolName: 'AI Resume Analysis', timestamp: 'Jul 21 2025 14:30:15 GMT+0400', status: 'Completed' },
    { id: 2, icon: <Mail />, toolName: 'Cover Letter for "Software Engineer"', timestamp: 'Jul 20 2025 11:22:05 GMT+0400', status: 'Completed' },
];

// The component now accepts the 'onNavItemClick' function as a prop
const WorkspacePage = ({ onNavItemClick }) => {
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <div className="col-12"><HeroSection /></div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold">Available AI Tools</h2>
          <p className="text-muted">Start Building and Shape Your Career with this exclusive AI Tools</p>
        </div>
        <div className="col-12">
            <div className="row g-4">
                {tools.map((tool) => (
                    <div key={tool.id} className="col-12 col-md-6 col-lg-3 d-flex">
                        <ToolCard {...tool} onClick={() => onNavItemClick(tool.id)} />
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
            <h2 className="fw-bold">Previous History</h2>
            <p className="text-muted">What you previously worked on, you can find here</p>
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