import React, { useState } from 'react';
import { Typography } from '@mui/material';
import RoadmapInputForm from '../components/roadmap/RoadmapInputForm';
import RoadmapDisplay from '../components/roadmap/RoadmapDisplay';
import InfoPanel from '../components/roadmap/InfoPanel';
const RoadmapGeneratorPage = () => {
    const [roadmapData, setRoadmapData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateRoadmap = async (inputs) => {
        setIsLoading(true);
        setRoadmapData(null);
        setError(null);

        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const prompt = `
            Generate a career roadmap for a user who wants to become a "${inputs.field}".
            The user's current level is "${inputs.level}" and they already know "${inputs.skills}".
            
            Please provide the response in a structured JSON format. The JSON object should have the following keys: "title", "description", "duration", and "nodes".
            - "title": A string for the roadmap title.
            - "description": A short string describing the roadmap up to 14 words.
            - "duration": A string estimating the time to complete (e.g., "9-15 Months").
            - "nodes": An array of exactly 8 node objects. Each node object must have "id", "label", and "description". The IDs must be 'fs-1' through 'fs-8'.
            
            Example of a single node object:
            { "id": "fs-1", "label": "Topic Name", "description": "A brief explanation of the topic." }
            
            Do not include any text or formatting outside of the main JSON object.
        `;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) throw new Error(`API error: ${response.statusText}`);

            const result = await response.json();
            const textResponse = result.candidates[0]?.content?.parts[0]?.text;

            if (!textResponse) throw new Error("No content received from the API.");

            const cleanedJsonResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedData = JSON.parse(cleanedJsonResponse);
            
            const nodePositions = [
                { x: 300, y: 0 }, { x: 300, y: 210 }, { x: 300, y: 420 },
                { x: 50, y: 600 }, { x: 550, y: 640 }, { x: 550, y: 840 },
                { x: 50, y: 780 }, { x: 300, y: 950 }
            ];
            
            const finalNodes = parsedData.nodes.map((node, index) => ({
                id: node.id,
                type: 'roadmapNode',
                data: { label: node.label, description: node.description },
                position: nodePositions[index]
            }));

            const finalEdges = [
                { id: 'fse-1-2', source: 'fs-1', target: 'fs-2', animated: true },
                { id: 'fse-2-3', source: 'fs-2', target: 'fs-3', animated: true },
                { id: 'fse-3-4', source: 'fs-3', target: 'fs-4', animated: true },
                { id: 'fse-3-5', source: 'fs-3', target: 'fs-5', animated: true },
                { id: 'fse-5-6', source: 'fs-5', target: 'fs-6', animated: true },
                { id: 'fse-4-7', source: 'fs-4', target: 'fs-7', animated: true },
                { id: 'fse-6-8', source: 'fs-6', target: 'fs-8', animated: true },
                { id: 'fse-7-8', source: 'fs-7', target: 'fs-8', animated: true },
            ];

            setRoadmapData({
                title: parsedData.title,
                description: parsedData.description,
                duration: parsedData.duration,
                nodes: finalNodes,
                edges: finalEdges
            });

        } catch (err) {
            setError(err.message);
            console.error("API call failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAnother = () => {
        setRoadmapData(null);
    };

    const infoPanelData = roadmapData || { 
        title: 'Career Roadmap Generator', 
        description: 'Describe your career goals in the form below to generate a personalized learning path.',
        duration: 'N/A'
    };

    return (
        <div className="container-fluid">
            <div className="row g-4">
                <div className="col-12 col-lg-6 col-xl-4">
                    <div className="vstack gap-4">
                        <InfoPanel 
                            title={infoPanelData.title}
                            description={infoPanelData.description}
                            duration={infoPanelData.duration}
                            hasRoadmap={!!roadmapData}
                            onCreateAnother={handleCreateAnother}
                        />
                        {!roadmapData && (
                            <RoadmapInputForm onGenerate={handleGenerateRoadmap} isLoading={isLoading} />
                        )}
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-8 d-flex">
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