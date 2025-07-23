import React, { useState, useRef, useEffect } from 'react';
import { Paper, Typography, Box, useTheme, CircularProgress, IconButton } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

const ResumePreview = ({ file, isModalVersion = false }) => {
    const theme = useTheme();
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.0);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // This effect measures the container's width to set the PDF page size
    useEffect(() => {
    if (isModalVersion) {
        setScale(0.8); // Or any smaller value like 0.6, 0.8, etc.
    } else {
        setScale(1.0);
    }
}, [isModalVersion]);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                // We set the container width state here
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        const timer = setTimeout(updateWidth, 50); // Give a brief moment for the container to render
        window.addEventListener('resize', updateWidth);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateWidth);
        };
    }, [file]);

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
        setNumPages(nextNumPages);
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

    const loadingSpinner = (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Paper
            sx={{
                height: '100%', p: 2, display: 'flex', flexDirection: 'column',
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(['box-shadow', 'transform']),
                ...(!isModalVersion && {
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                   
                  }

                })
            }}
            elevation={0}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                    {isModalVersion ? "Analyzing Document" : "Resume Preview"}
                </Typography>
                <Box>
                    <IconButton onClick={handleZoomOut} disabled={!file}><ZoomOutIcon /></IconButton>
                    <IconButton onClick={handleZoomIn} disabled={!file}><ZoomInIcon /></IconButton>
                </Box>
            </Box>

            <Box
                ref={containerRef}
                sx={{
                    flexGrow: 1, 
                    overflow: 'auto',
                    borderRadius: 2,
                    bgcolor: 'grey.200',
                    p: 1,
                }}
            >
                {file && containerWidth > 0 ? (
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={loadingSpinner}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                // FIX: Use width to fit the container perfectly, then apply manual scale
                                width={containerWidth * scale}
                            />
                        ))}
                    </Document>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography color="text.secondary">Upload a resume to see the preview</Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default ResumePreview;