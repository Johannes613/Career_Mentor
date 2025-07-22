import React from 'react';
import HeroSection from '../components/workspace/HeroSection';
import ToolCard from '../components/workspace/ToolCard';
import HistoryItem from '../components/workspace/HistoryItem';

import { MessageSquare, FileText, Milestone, Mail } from 'lucide-react';

const tools = [
  { icon: <MessageSquare />, title: 'AI Career Q&A Chat', description: 'Ask career questions', buttonText: 'Ask Now' },
  { icon: <FileText />, title: 'AI Resume Analyzer', description: 'Improve your resume', buttonText: 'Analyze Now' },
  { icon: <Milestone />, title: 'Career Roadmap Generator', description: 'Build your roadmap', buttonText: 'Generate Now' },
  { icon: <Mail />, title: 'Cover Letter Generator', description: 'Write a cover letter', buttonText: 'Create Now' },
];

const history = [
    { icon: <FileText />, toolName: 'AI Resume Analyzer', timestamp: 'Sun Jun 01 2025 12:07:32 GMT-0400 (Eastern Daylight Time)' },
    { icon: <Milestone />, toolName: 'Career Roadmap Generator', timestamp: 'Sun Jun 01 2025 11:54:49 GMT-0400 (Eastern Daylight Time)' },
];

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
          <p className="text-muted">Start Building and Shape Your Career with this exclusive AI Tools</p>
        </div>
        <div className="col-12">
            <div className="row g-4">
                {tools.map((tool, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-3 d-flex">
                        <ToolCard {...tool} />
                    </div>
                ))}
            </div>
        </div>
      </div>

       <div className="row">
        <div className="col-12">
            <h2 className="fw-bold">Previous History</h2>
            <p className="text-muted">What Your previously work on, You can find here</p>
        </div>
        <div className="col-12">
            <div className="vstack gap-3">
                {history.map((item, index) => (
                    <HistoryItem key={index} {...item} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;