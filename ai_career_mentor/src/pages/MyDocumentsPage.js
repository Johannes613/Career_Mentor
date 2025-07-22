import React, { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, ButtonGroup, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DocumentCard from '../components/documents/DocumentCard';
import DocumentListItem from '../components/documents/DocumentListItem'; // Import the new list item component

// Import icons
import { Search, FileText, Milestone, Mail, List, Grid } from 'lucide-react';

// Mock data for the user's generated documents
const allDocuments = [
    { id: 1, type: 'Resume', title: 'Resume for Software Engineer', date: 'July 22, 2025', icon: <FileText /> },
    { id: 2, type: 'Cover Letter', title: 'Cover Letter for Google', date: 'July 21, 2025', icon: <Mail /> },
    { id: 3, type: 'Roadmap', title: 'Career Roadmap for Data Science', date: 'July 20, 2025', icon: <Milestone /> },
    { id: 4, type: 'Resume', title: 'Resume for Product Manager', date: 'July 19, 2025', icon: <FileText /> },
    { id: 5, type: 'Cover Letter', title: 'Cover Letter for Meta', date: 'July 18, 2025', icon: <Mail /> },
    { id: 6, type: 'Resume', title: 'Creative Director Resume v2', date: 'July 17, 2025', icon: <FileText /> },
];

const MyDocumentsPage = () => {
    const [filter, setFilter] = useState('All');
    // State to manage the current view: 'list' or 'grid'
    const [view, setView] = useState('list'); 
    
    const filteredDocuments = allDocuments.filter(doc => {
        if (filter === 'All') return true;
        return doc.type === filter;
    });

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
          setView(nextView);
        }
    };

    return (
        <Box>
            {/* --- HEADER --- */}
            <Typography variant="h4" component="h1" fontWeight="bold">
                My Generated Documents
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Access all your generated resumes, cover letters, and career roadmaps here.
            </Typography>

            {/* --- FILTER AND SEARCH CONTROLS --- */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <ButtonGroup variant="outlined" aria-label="document filter button group">
                    <Button onClick={() => setFilter('All')} variant={filter === 'All' ? 'contained' : 'outlined'}>All</Button>
                    <Button onClick={() => setFilter('Resume')} variant={filter === 'Resume' ? 'contained' : 'outlined'}>Resumes</Button>
                    <Button onClick={() => setFilter('Cover Letter')} variant={filter === 'Cover Letter' ? 'contained' : 'outlined'}>Cover Letters</Button>
                    <Button onClick={() => setFilter('Roadmap')} variant={filter === 'Roadmap' ? 'contained' : 'outlined'}>Roadmaps</Button>
                </ButtonGroup>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search documents..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Search size={18} /></InputAdornment>
                            ),
                        }}
                    />
                    <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} size="small">
                        <ToggleButton value="list" aria-label="list view"><List size={18} /></ToggleButton>
                        <ToggleButton value="grid" aria-label="grid view"><Grid size={18} /></ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {/* --- DOCUMENTS DISPLAY --- */}
            {/* Conditionally render either the list or grid view */}
            {view === 'list' ? (
                // Bootstrap vertical stack for the structured list view
                <div className="vstack gap-2">
                    {filteredDocuments.map(doc => (
                        <DocumentListItem key={doc.id} {...doc} />
                    ))}
                </div>
            ) : (
                // Bootstrap row for the grid/card view
                <div className="row g-4">
                    {filteredDocuments.map(doc => (
                        <div key={doc.id} className="col-12 col-md-6 col-lg-4 d-flex mb-2">
                            <DocumentCard {...doc} />
                        </div>
                    ))}
                </div>
            )}
        </Box>
    );
};

export default MyDocumentsPage;