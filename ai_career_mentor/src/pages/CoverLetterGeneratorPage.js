import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import JobInputSection from '../components/coverletter/JobInputSection';
import GeneratedLetterPreview from '../components/coverletter/GeneratedLetterPreview';
import GenerationHistory from '../components/coverletter/GenerationHistory';

// Firebase and auth
import { useAuth } from '../contexts/AuthContext';
import { db, collection, addDoc, query, where, serverTimestamp } from '../config/firebase';
import { onSnapshot, orderBy } from 'firebase/firestore';


const CoverLetterGeneratorPage = () => {
  const { user } = useAuth();
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Realtime Firestore listener
useEffect(() => {
  if (user && !user.isGuest) {
    const q = query(
      collection(db, 'coverLetters'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userHistory = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          role: data.role,
          company: data.company,
          date: data.createdAt?.toDate().toLocaleDateString() || 'N/A',
          letter: data.letter,
        };
      });

      setHistory(userHistory);
    });

    return () => unsubscribe();
  } else if (user?.isGuest) {
    // Mock history for guest users
    setHistory([
      {
        id: 'mock1',
        role: 'Frontend Developer',
        company: 'TechNova Inc.',
        date: '07/15/2025',
        letter: 'Dear Hiring Manager,\n\nI am excited to apply for the Frontend Developer role at TechNova Inc...',
      },
      {
        id: 'mock2',
        role: 'Data Analyst',
        company: 'Insightful Analytics',
        date: '07/10/2025',
        letter: 'To Whom It May Concern,\n\nI am writing to express my interest in the Data Analyst position at Insightful Analytics...',
      },
      {
        id: 'mock3',
        role: 'AI Research Intern',
        company: 'VisionAI Labs',
        date: '07/05/2025',
        letter: 'Dear Team at VisionAI Labs,\n\nAs a passionate student of artificial intelligence, I am eager to join your team as an AI Research Intern...',
      },
    ]);
  } else {
    setHistory([]);
  }
}, [user]);


  // Handle letter generation
  const handleGenerate = async (inputs) => {
    setIsLoading(true);
    setGeneratedLetter('');
    setError(null);

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
      Write a professional and compelling cover letter for the role of "${inputs.role}" at "${inputs.company}".
      My name is ${user?.displayName || inputs.name}.
      Highlight the following skills: ${inputs.skills}.
      Use a ${inputs.tone} tone.
      Job description:
      ---
      ${inputs.description}
      ---
      Include a clear introduction, a body connecting skills to requirements, and a strong closing. Avoid using placeholders like "[Your Address]".
    `;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      const letterText = result.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\*/g, '');

      if (!letterText) {
        throw new Error('No content received from the API.');
      }

      setGeneratedLetter(letterText);

      if (user && !user.isGuest) {
        await addDoc(collection(db, 'coverLetters'), {
          userId: user.uid,
          role: inputs.role,
          company: inputs.company,
          letter: letterText,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Something went wrong.');
      setGeneratedLetter('Sorry, an error occurred while generating the cover letter.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <Typography variant="h4" component="h1" fontWeight="bold">
            AI Cover Letter Generator
          </Typography>
          <Typography color="text.secondary">
            Create a compelling, tailored cover letter in seconds.
          </Typography>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12 col-lg-5 d-flex">
          <JobInputSection onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
        <div className="col-12 col-lg-7 d-flex">
          <GeneratedLetterPreview letter={generatedLetter} isLoading={isLoading} error={error} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
            Generation History
          </Typography>
          <GenerationHistory history={history} />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGeneratorPage;
