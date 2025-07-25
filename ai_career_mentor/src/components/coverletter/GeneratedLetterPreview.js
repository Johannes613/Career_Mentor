import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip, CircularProgress, useTheme } from '@mui/material';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { alpha } from '@mui/material/styles';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 

const useTypingEffect = (fullText, speed = 20) => {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        setTypedText('');
        if (fullText) {
            const words = fullText.split(/(\s+)/);
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < words.length) {
                    setTypedText(prev => prev + words[i]);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [fullText, speed]);

    return typedText;
};

const GeneratedLetterPreview = ({ letter, isLoading, error }) => {
    const theme = useTheme();
    const typedLetter = useTypingEffect(letter);
    const letterContentRef = useRef(null); 

    const handleCopy = () => {
        navigator.clipboard.writeText(letter);
    };

   const handleDownload = () => {
    const original = letterContentRef.current;

    if (original) {
        // Clone the content node
        const clone = original.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.top = '-9999px'; // Move it off-screen
        clone.style.width = '800px'; // You can adjust width here
        clone.style.whiteSpace = 'pre-wrap'; // Ensure proper formatting

        document.body.appendChild(clone); // Append to DOM for rendering

        html2canvas(clone, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasRatio = canvas.width / canvas.height;
            const imgWidth = pdfWidth - 20;
            const imgHeight = imgWidth / canvasRatio;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save("cover-letter.pdf");

            document.body.removeChild(clone); // Clean up
        });
    }
};



    return (
        <Card sx={{ height: '100%',width:'100%',maxHeight:'120vh', paddingBottom:3, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">AI Generated Output</Typography>
                <Box>
                    <Tooltip title="Copy to Clipboard">
                        <span>
                            <IconButton onClick={handleCopy} disabled={isLoading || !letter}><Copy size={18} /></IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Download as PDF">
                         <span>
                            <IconButton onClick={handleDownload} disabled={isLoading || !letter}><Download size={18} /></IconButton>
                        </span>
                    </Tooltip>
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1, position: 'relative', overflowY: 'auto' }}>
                 {isLoading && (
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', bgcolor: alpha(theme.palette.background.paper, 0.7), zIndex: 1,
                    }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }} fontWeight="medium">AI is writing your cover letter...</Typography>
                    </Box>
                )}
                
                <Typography ref={letterContentRef} sx={{ whiteSpace: 'pre-wrap', p: 1 }} color={error ? 'error.main' : 'text.primary'}>
                    {typedLetter}
                    {isLoading && <Box component="span" sx={{ ml: '2px', borderRight: '2px solid', borderColor: 'primary.main', animation: 'blinkingCursor 0.75s step-end infinite' }} />}
                </Typography>
                
                {!isLoading && !letter && (
                    <Typography color="text.secondary">
                        Your generated cover letter will appear here.
                    </Typography>
                )}
                 <style>{`@keyframes blinkingCursor { from, to { border-color: transparent; } 50% { border-color: ${theme.palette.primary.main}; } }`}</style>
            </CardContent>
        </Card>
    );
};

export default GeneratedLetterPreview;