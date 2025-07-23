import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Sparkles } from 'lucide-react';

const RoadmapInputForm = ({ onGenerate, isLoading }) => {
    const [inputs, setInputs] = useState({
        field: 'Full Stack React Developer',
        level: 'Beginner',
        skills: 'JavaScript, HTML, CSS',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(inputs);
    };

    return (
        <Card component="form" onSubmit={handleSubmit}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold">Describe Your Goal</Typography>
                <TextField 
                    label="Career Field or Technology" 
                    name="field" 
                    value={inputs.field} 
                    onChange={handleChange} 
                    required 
                    helperText="e.g., 'Frontend Developer', 'Data Science', 'iOS with Swift'"
                />
                <FormControl fullWidth>
                    <InputLabel id="level-select-label">Your Current Level</InputLabel>
                    <Select
                        labelId="level-select-label"
                        name="level"
                        value={inputs.level}
                        label="Your Current Level"
                        onChange={handleChange}
                    >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    label="Skills You Already Have (Optional)" 
                    name="skills" 
                    value={inputs.skills} 
                    onChange={handleChange} 
                    helperText="Comma-separated, e.g., 'Python, SQL'"
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Sparkles size={18} />}
                    disabled={isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Roadmap'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default RoadmapInputForm;