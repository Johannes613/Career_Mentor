import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Sparkles } from 'lucide-react';

const JobInputSection = ({ onGenerate, isLoading }) => {
    const [inputs, setInputs] = useState({
        name: '',
        role: '',
        company: '',
        skills: '',
        description: '',
        tone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };
    
    const handleToneChange = (event, newTone) => {
        if (newTone !== null) {
            setInputs(prev => ({ ...prev, tone: newTone }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(inputs);
    };

    return (
        <Card sx={{ height: '100%',width:'100%' }}>
            <CardContent component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold">Your Information</Typography>
                <TextField label="Your Name" name="name" value={inputs.name} onChange={handleChange} required />
                <TextField label="Target Role" name="role" value={inputs.role} onChange={handleChange} required />
                <TextField label="Company Name" name="company" value={inputs.company} onChange={handleChange} required />
                <TextField label="Key Skills to Highlight (comma-separated)" name="skills" value={inputs.skills} onChange={handleChange} required />
                
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Job Description</Typography>
                <TextField
                    label="Paste the job description here..."
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    multiline
                    rows={8}
                    required
                />

                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Select a Tone</Typography>
                 <ToggleButtonGroup
                    value={inputs.tone}
                    exclusive
                    onChange={handleToneChange}
                    aria-label="text alignment"
                    fullWidth
                >
                    <ToggleButton value="Professional" aria-label="professional">Professional</ToggleButton>
                    <ToggleButton value="Enthusiastic" aria-label="enthusiastic">Enthusiastic</ToggleButton>
                    <ToggleButton value="Formal" aria-label="formal">Formal</ToggleButton>
                </ToggleButtonGroup>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Sparkles />}
                    disabled={isLoading}
                    sx={{ mt: 'auto' }} 
                >
                    {isLoading ? 'Generating...' : 'Generate Cover Letter'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default JobInputSection;