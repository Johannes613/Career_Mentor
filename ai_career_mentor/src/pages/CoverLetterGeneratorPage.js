// import React, 'react';
import React from 'react';
import { Typography } from '@mui/material'; // Only Typography is needed from MUI for the headers
import JobInputSection from '../components/coverletter/JobInputSection';
import GeneratedLetterPreview from '../components/coverletter/GeneratedLetterPreview';
import GenerationHistory from '../components/coverletter/GenerationHistory';

// Mock data for the history table
const history = [
    { id: 'cl-01', role: 'Frontend Developer', company: 'Google', date: 'July 22, 2025' },
    { id: 'cl-02', role: 'Product Manager', company: 'Meta', date: 'July 20, 2025' },
    { id: 'cl-03', role: 'UX/UI Designer', company: 'Amazon', date: 'July 18, 2025' },
];

const CoverLetterGeneratorPage = () => {
    const [generatedLetter, setGeneratedLetter] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerate = (inputs) => {
        setIsLoading(true);
        setGeneratedLetter('');

        setTimeout(() => {
            const mockLetter = `Dear Hiring Manager,\n\nBased on the job description for the ${inputs.role} at ${inputs.company}, I am confident that my skills in ${inputs.skills} make me a strong candidate for this role. My experience aligns perfectly with your requirements, and I am excited about the opportunity to contribute to your team.\n\nThank you for your time and consideration.\n\nSincerely,\n${inputs.name}`;
            setGeneratedLetter(mockLetter);
            setIsLoading(false);
        }, 2500);
    };

    return (
        // Using Bootstrap's container-fluid for full-width layout
        <div className="container-fluid">
            {/* --- HEADER --- */}
            <div className="row mb-4">
                <div className="col-12">
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Cover Letter Generator
                    </Typography>
                    <Typography color="text.secondary">
                        Create a compelling, tailored cover letter in seconds.
                    </Typography>
                </div>
            </div>

            {/* --- MAIN TWO-COLUMN LAYOUT (Bootstrap Row) --- */}
            <div className="row g-5 mb-5">
                {/* Input Section Column */}
                <div className="col-12 col-lg-5 d-flex">
                    <JobInputSection onGenerate={handleGenerate} isLoading={isLoading} />
                </div>
                {/* Preview Section Column */}
                <div className="col-12 col-lg-7 d-flex">
                    <GeneratedLetterPreview letter={generatedLetter} isLoading={isLoading} />
                </div>
            </div>

            {/* --- HISTORY SECTION (Bootstrap Row) --- */}
            <div className="row">
                <div className="col-12">
                    <GenerationHistory history={history} />
                </div>
            </div>
        </div>
    );
};

export default CoverLetterGeneratorPage;