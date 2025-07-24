import React from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    Container,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const faqData = [
    {
        q: 'Is CareerMentorAI free to use?',
        a: 'Yes, we offer a generous free tier that includes access to all our core AI tools. Advanced features and higher usage limits are available on our premium plan.',
    },
    {
        q: 'How does the AI analyze my resume?',
        a: 'Our AI uses advanced natural language processing to parse your resume, comparing it against thousands of successful resumes and job descriptions in your target field.',
    },
    {
        q: 'Is my data secure?',
        a: 'Absolutely. We prioritize your privacy and security. All documents are encrypted, and we never share your personal data with third parties.',
    },
    {
        q: 'What careers can I generate a roadmap for?',
        a: 'Our AI can generate roadmaps for a wide variety of careers in tech, business, creative fields, and more. Simply enter your desired role to get started.',
    },
    {
        q: 'Can I use CareerMentorAI for university applications?',
        a: 'Yes! CareerMentorAI helps tailor academic resumes, statements of purpose, and provides curated roadmaps for graduate school planning.',
    },
    {
        q: 'Do you offer integrations with LinkedIn or GitHub?',
        a: 'We are currently working on integrating with LinkedIn and GitHub so you can import your data and keep your profile up to date automatically.',
    },
];

const FaqSection = () => {
    const theme = useTheme();

    return (
        <Box id="faq" sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                >
                    Frequently Asked Questions
                </Typography>
                <Typography
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}
                >
                    Everything you need to know about CareerMentorAI, all in one place.
                </Typography>
                {faqData.map((faq, index) => (
                    <Accordion
                        key={index}
                        elevation={2}
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            '&:before': { display: 'none' },
                            boxShadow: theme.shadows[1],
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{faq.q}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{faq.a}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>
        </Box>
    );
};

export default FaqSection;
