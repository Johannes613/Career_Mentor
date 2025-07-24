import React, { useState } from 'react';
import { Typography } from '@mui/material';
import JobInputSection from '../components/coverletter/JobInputSection';
import GeneratedLetterPreview from '../components/coverletter/GeneratedLetterPreview';
import GenerationHistory from '../components/coverletter/GenerationHistory';

const history = [
    { id: 'cl-01', role: 'Frontend Developer', company: 'Google', date: 'July 22, 2025' },
    { id: 'cl-02', role: 'Product Manager', company: 'Meta', date: 'July 20, 2025' },
    { id: 'cl-03', role: 'UX/UI Designer', company: 'Amazon', date: 'July 18, 2025' },
];

const CoverLetterGeneratorPage = () => {
    

    // This function now calls the Gemini API
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async (inputs) => {
        setIsLoading(true);
        setGeneratedLetter('');
        setError(null);

        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const prompt = `
            Write a professional and compelling cover letter for the role of "${inputs.role}" at "${inputs.company}".
            My name is ${inputs.name}.
            I want to highlight the following key skills: ${inputs.skills}.
            The tone of the cover letter should be ${inputs.tone}.
            
            Here is the job description for context:
            ---
            ${inputs.description}
            ---
            
            Please structure the letter professionally, including an introduction, a body that connects my skills to the job requirements, and a strong closing. Do not include placeholders like "[Your Address]".
        `;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                let letterText = result.candidates[0].content.parts[0].text;
                // FIX: Remove all asterisks from the generated text
                letterText = letterText.replace(/\*/g, '');
                setGeneratedLetter(letterText);
            } else {
                throw new Error("No content received from the API.");
            }
        } catch (err) {
            setError(err.message);
            setGeneratedLetter("Sorry, an error occurred while generating the cover letter. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12">
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        AI Cover Letter Generator
                    </Typography>
                    <Typography color="text.secondary">
                        Create a compelling, tailored cover letter in seconds.
                    </Typography>
                </div>
            </div>
            <div className="row g-4 mb-5">
                <div className="col-12 col-lg-5 d-flex">
                    <JobInputSection onGenerate={handleGenerate} isLoading={isLoading} />
                </div>
                <div className="col-12 col-lg-7 d-flex">
                    <GeneratedLetterPreview letter={generatedLetter} isLoading={isLoading} error={error} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                     <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                        Generation History
                    </Typography>
                    <GenerationHistory history={history} />
                </div>
            </div>
        </div>
    );
};

export default CoverLetterGeneratorPage;