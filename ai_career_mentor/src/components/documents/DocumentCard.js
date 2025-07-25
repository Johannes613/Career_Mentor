import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Button, useTheme } from '@mui/material';
import { Download, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';

const DocumentCard = ({ id, icon, type, title, date, content, onDelete }) => {
    const theme = useTheme();

    const handleDownload = () => {
        const doc = new jsPDF();
        let textContent = '';

        if (type === 'Resume' && typeof content === 'object') {
            textContent += `Overall Score: ${content.overallScore}/100\n\n`;
            textContent += `Feedback: ${content.overallFeedback}\n\n`;
            textContent += `--- Breakdown ---\n`;
            content.breakdown.forEach(item => {
                textContent += `${item.title} (${item.score}%): ${item.description}\n`;
            });
            textContent += `\n--- Tips ---\n`;
            content.tips.forEach(tip => {
                textContent += `- ${tip}\n`;
            });
        } else {
            textContent = content;
        }
        
        doc.text(textContent, 10, 10);
        doc.save(`${title.replace(/ /g, '_')}.pdf`);
    };

    return (
        <Card 
            sx={{ 
                height: '100%', 
                width: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(['box-shadow', 'transform']),
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                }
            }} 
            elevation={0}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                        {icon}
                    </Box>
                    <IconButton onClick={() => onDelete(id, type)} size="small">
                        <Trash2 size={20} />
                    </IconButton>
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Generated on ${date}`}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" startIcon={<Download size={16} />} onClick={handleDownload}>
                    Download
                </Button>
            </Box>
        </Card>
    );
};

export default DocumentCard;