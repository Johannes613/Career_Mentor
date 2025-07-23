import React, { useState } from 'react';
import { Typography } from '@mui/material';
import RoadmapInputForm from '../components/roadmap/RoadmapInputForm';
import RoadmapDisplay from '../components/roadmap/RoadmapDisplay';
import InfoPanel from '../components/roadmap/InfoPanel';
import { generateMockRoadmap } from '../components/roadmap/mockData';

const RoadmapGeneratorPage = () => {
    const [roadmapData, setRoadmapData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateRoadmap = (inputs) => {
        setIsLoading(true);
        setRoadmapData(null); // Clear previous roadmap
        setTimeout(() => {
            const data = generateMockRoadmap(inputs.field);
            setRoadmapData(data);
            setIsLoading(false);
        }, 2000);
    };

    const handleCreateAnother = () => {
        setRoadmapData(null);
    };

    // Use a default title if no roadmap is generated yet
    const infoPanelData = roadmapData || { 
        title: 'Career Roadmap Generator', 
        description: 'Describe your career goals in the form below to generate a personalized learning path.',
        duration: 'N/A'
    };

    return (
        <div className="container-fluid">
            {/* --- MAIN TWO-COLUMN LAYOUT (Bootstrap Row) --- */}
            <div className="row g-4">
                {/* --- LEFT PANEL (Info & Inputs) --- */}
                <div className="col-12 col-md-4">
                    <div className="vstack gap-4">
                        <InfoPanel 
                            title={infoPanelData.title}
                            description={infoPanelData.description}
                            duration={infoPanelData.duration}
                            hasRoadmap={!!roadmapData} // Pass flag to conditionally show the "Create Another" button
                            onCreateAnother={handleCreateAnother}
                        />
                        {/* The input form is now always visible until a roadmap is generated */}
                        {!roadmapData && (
                            <RoadmapInputForm onGenerate={handleGenerateRoadmap} isLoading={isLoading} />
                        )}
                    </div>
                </div>

                {/* --- RIGHT PANEL (Roadmap Display) --- */}
                <div className="col-12 col-md-8 d-flex">
                    <RoadmapDisplay 
                        nodes={roadmapData?.nodes || []} 
                        edges={roadmapData?.edges || []}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoadmapGeneratorPage;