import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const faqData = [
    { q: 'Is CareerMentorAI free to use?', a: 'Yes, we offer a generous free tier that includes access to all our core AI tools. Advanced features and higher usage limits are available on our premium plan.' },
    { q: 'How does the AI analyze my resume?', a: 'Our AI uses advanced natural language processing to parse your resume, comparing it against thousands of successful resumes and job descriptions in your target field. It checks for keywords, action verbs, formatting, and more.' },
    { q: 'Is my data secure?', a: 'Absolutely. We prioritize your privacy and security. All documents are encrypted, and we never share your personal data with third parties.' },
    { q: 'What careers can I generate a roadmap for?', a: 'Our AI can generate roadmaps for a wide variety of careers in tech, business, creative fields, and more. Simply enter your desired role to get started.' },
];

const FaqSection = () => {
    return (
        <Box id="faq" sx={{ py: 10 }}>
            <div className="container-md">
                <Typography variant="h4" component="h2" fontWeight="bold" align="center" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                {faqData.map((faq, index) => (
                    <Accordion key={index} elevation={0} sx={{ border: 1, borderColor: 'divider', '&:first-of-type': { borderTopLeftRadius: 8, borderTopRightRadius: 8 }, '&:last-of-type': { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }, mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="medium">{faq.q}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{faq.a}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Box>
    );
};

export default FaqSection;