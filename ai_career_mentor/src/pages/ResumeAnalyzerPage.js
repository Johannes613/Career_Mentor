import React, { useState } from 'react';
import { Typography } from '@mui/material';
import ResumeUpload from '../components/analyzer/ResumeUpload';
import FeatureCard from '../components/analyzer/FeatureCard';
// NEW: Import the new stepper component
import HowItWorksStepper from '../components/analyzer/HowItWorksStepper'; 
import AnalysisHistoryTable from '../components/analyzer/AnalysisHistoryTable';

// Import icons for features
import { ScanLine, Target, Key } from 'lucide-react';

// Mock data for the components
const features = [
    { icon: <ScanLine />, title: 'Keyword Optimization', description: 'Ensure your resume passes through automated filters by matching keywords from job descriptions.' },
    { icon: <Target />, title: 'Skill Gap Analysis', description: 'Identify critical skills you are missing for your target roles and get recommendations.' },
    { icon: <Key />, title: 'Action Verb Strength', description: 'Enhance your bullet points with powerful action verbs that highlight your achievements.' },
];

const steps = [
    { number: 1, title: 'Upload Your Resume', description: 'Drag and drop your resume in PDF or DOCX format.' },
    { number: 2, title: 'AI Analysis', description: 'Our AI parses your resume against industry standards.' },
    { number: 3, title: 'Get Your Score', description: 'Receive a comprehensive report and actionable feedback.' },
];

const history = [
    { id: 1, fileName: 'Software_Engineer_Resume_v4.pdf', score: 88, status: 'Completed', date: 'July 22, 2025' },
    { id: 2, fileName: 'Product_Manager_CV_final.docx', score: 76, status: 'Completed', date: 'July 19, 2025' },
    { id: 3, fileName: 'Data_Analyst_Resume.pdf', score: 92, status: 'Completed', date: 'July 15, 2025' },
];


const ResumeAnalyzerPage = () => {
    // State to track the current step of the analysis process
    const [currentStep, setCurrentStep] = useState(1);
    
    // This function will be passed to the upload component to trigger the simulation
    const handleAnalysisStart = () => {
        // Reset to step 1 when a new analysis starts
        setCurrentStep(1);

        // Simulate the analysis process
        setTimeout(() => setCurrentStep(2), 1500); // Move to step 2 after 1.5s
        setTimeout(() => setCurrentStep(3), 3000); // Move to step 3 after 3s
    };

    return (
        <div className="container-fluid">
            {/* --- HEADER SECTION --- */}
            <div className="row mb-4">
                <div className="col-12 text-center">
                    {/* Heading font size reduced from h3 to h4 */}
                    <Typography variant="h4" component="h1" fontWeight="bold">Resume Analyzer</Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                        Get an instant, data-driven analysis of your resume to land your dream job.
                    </Typography>
                </div>
            </div>

            {/* --- UPLOAD SECTION --- */}
            <div className="row mb-5">
                <div className="col-12">
                    {/* Pass the simulation trigger function to the upload component */}
                    <ResumeUpload onAnalysisStart={handleAnalysisStart} />
                </div>
            </div>

            {/* --- HOW IT WORKS SECTION --- */}
            <div className="row mb-5 pt-3">
                <div className="col-12 mb-3">
                    {/* Heading font size reduced from h4 to h5 */}
                    <Typography variant="h5" component="h2" fontWeight="bold">How It Works</Typography>
                </div>
                <div className="col-12">
                   {/* The old mapped steps are replaced by the new single stepper component */}
                   <HowItWorksStepper steps={steps} activeStep={currentStep} />
                </div>
            </div>

            {/* --- KEY FEATURES SECTION --- */}
            <div className="row mb-5 pt-2">
                 <div className="col-12 mb-3">
                    <Typography variant="h5" component="h2" fontWeight="bold">Key Features</Typography>
                </div>
                {features.map(feature => (
                     <div className="col-12 col-lg-6 col-xl-4 mb-3 d-flex" key={feature.title}>
                        <FeatureCard {...feature} />
                    </div>
                ))}
            </div>
            
            {/* --- HISTORY SECTION --- */}
            <div className="row">
                 <div className="col-12 mb-3">
                    <Typography variant="h5" component="h2" fontWeight="bold">Recent Analyses</Typography>
                </div>
                <div className="col-12">
                    <AnalysisHistoryTable history={history} />
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalyzerPage;