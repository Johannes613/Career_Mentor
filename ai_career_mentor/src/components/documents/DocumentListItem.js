import React from 'react';
import { Paper, Typography, Box, IconButton, Button, useTheme } from '@mui/material';
import { Download, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';

const DocumentListItem = ({ id, icon, type, title, date, content, onDelete }) => {
    const theme = useTheme();

   const handleDownload = () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text(title, margin, 20);

    doc.setFontSize(12);
    let y = 30;

    if (type === 'Resume' && typeof content === 'object') {
        const overall = `Overall Score: ${content.overallScore}/100`;
        const feedback = `Feedback: ${content.overallFeedback}`;
        const breakdownHeader = "--- Breakdown ---";
        const tipsHeader = "--- Tips ---";

        const sections = [
            overall,
            "",
            feedback,
            "",
            breakdownHeader,
            ...content.breakdown.map(
                item => `${item.title} (${item.score}%): ${item.description}`
            ),
            "",
            tipsHeader,
            ...content.tips.map(tip => `- ${tip}`)
        ];

        sections.forEach(text => {
            const lines = doc.splitTextToSize(text, maxLineWidth);
            lines.forEach(line => {
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(line, margin, y);
                y += 7;
            });
        });
    } else {
        const lines = doc.splitTextToSize(content, maxLineWidth);
        lines.forEach(line => {
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, margin, y);
            y += 7;
        });
    }

    doc.save(`${title.replace(/ /g, '_')}.pdf`);
};
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    {icon}
                </Box>
                <Box>
                    <Typography fontWeight="medium">{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Generated on ${date}`}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                <Button variant="outlined" size="small" startIcon={<Download size={16} />} onClick={handleDownload}>Download</Button>
                <IconButton onClick={() => onDelete(id, type)} size="small">
                    <Trash2 size={20} />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default DocumentListItem;
