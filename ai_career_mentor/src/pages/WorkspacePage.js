import React, { useState, useEffect } from 'react';
import HeroSection from '../components/workspace/HeroSection';
import ToolCard from '../components/workspace/ToolCard';
import HistoryItem from '../components/workspace/HistoryItem';
import { MessageSquare, FileText, Milestone, Mail } from 'lucide-react';
import { Typography } from '@mui/material';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import {collection, query, where, onSnapshot } from "firebase/firestore";

const tools = [
  { id: 'chatbot', path: null, icon: <MessageSquare />, title: 'AI Career Q&A Chat', description: 'Ask career questions', buttonText: 'Ask Now' },
  { id: 'resume-analyzer', path: '/dashboard/resume-analyzer', icon: <FileText />, title: 'AI Resume Analyzer', description: 'Improve your resume', buttonText: 'Analyze Now' },
  { id: 'cover-letter-generator', path: '/dashboard/cover-letter-generator', icon: <Mail />, title: 'Cover Letter Generator', description: 'Write a cover letter', buttonText: 'Create Now' },
  { id: 'roadmap-generator', path: '/dashboard/roadmap-generator', icon: <Milestone />, title: 'Career Roadmap Generator', description: 'Build your roadmap', buttonText: 'Generate Now' },
];

const mockHistory = [
    { id: 1, icon: <FileText />, toolName: 'AI Resume Analysis', timestamp: 'Jul 21 2025 14:30:15 GMT+0400', status: 'Completed' },
    { id: 2, icon: <Mail />, toolName: 'Cover Letter for "Software Engineer"', timestamp: 'Jul 20 2025 11:22:05 GMT+0400', status: 'Completed' },
    { id: 3, icon: <Milestone />, toolName: 'Career Roadmap Generation', timestamp: 'Jul 19 2025 09:45:50 GMT+0400', status: 'In Progress' },
    { id: 5, icon: <Mail />, toolName: 'Cover Letter for "Data Analyst"', timestamp: 'Jul 17 2025 10:05:18 GMT+0400', status: 'Failed' },
];

const WorkspacePage = ({ onNavItemClick }) => {
    const { user } = useAuth();
    const [resumeHistory, setResumeHistory] = useState([]);
    const [coverLetterHistory, setCoverLetterHistory] = useState([]);
    const [combinedHistory, setCombinedHistory] = useState([]);

    useEffect(() => {
        if (user && !user.isGuest) {
            const resumeQuery = query(collection(db, "resumeAnalyses"), where("userId", "==", user.uid));
            const unsubscribeResumes = onSnapshot(resumeQuery, (snapshot) => {
                const resumes = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        type: 'resume',
                        icon: <FileText />,
                        toolName: `Analysis for ${data.fileName}`,
                        timestamp: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "N/A",
                        status: 'Completed',
                        createdAt: data.createdAt,
                    };
                });
                setResumeHistory(resumes);
            });

            const coverLetterQuery = query(collection(db, "coverLetters"), where("userId", "==", user.uid));
            const unsubscribeCoverLetters = onSnapshot(coverLetterQuery, (snapshot) => {
                const coverLetters = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        type: 'coverLetter',
                        icon: <Mail />,
                        toolName: `Cover Letter: ${data.role}`,
                        timestamp: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "N/A",
                        status: 'Completed',
                        createdAt: data.createdAt,
                    };
                });
                setCoverLetterHistory(coverLetters);
            });

            return () => {
                unsubscribeResumes();
                unsubscribeCoverLetters();
            };
        } else {
            setCombinedHistory(mockHistory);
        }
    }, [user]);

    useEffect(() => {
        if (user && !user.isGuest) {
            const combined = [...resumeHistory, ...coverLetterHistory];
            combined.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setCombinedHistory(combined);
        }
    }, [resumeHistory, coverLetterHistory, user]);


    const handleToolClick = (toolId) => {
        if (toolId === 'chatbot') {
            window.dispatchEvent(new CustomEvent('open-chat'));
        } else {
            onNavItemClick(toolId);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row mb-5">
                <div className="col-12">
                    <HeroSection onNavigate={onNavItemClick} />
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
                                <ToolCard {...tool} onClick={() => handleToolClick(tool.id)} />
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
                        {combinedHistory.length > 0 ? (
                            combinedHistory.map((item) => (
                                <HistoryItem key={item.id} {...item} />
                            ))
                        ) : (
                             <Typography color="text.secondary">Your generation history will appear here once you use the AI tools.</Typography>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspacePage;
