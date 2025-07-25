import React, { useState, useEffect } from "react";
import { Typography, Dialog, DialogContent, Button } from "@mui/material";
import { RefreshCw } from "lucide-react";

// Import all necessary components
import ResumeUpload from "../components/analyzer/ResumeUpload";
import HowItWorksStepper from "../components/analyzer/HowItWorksStepper";
import FeatureCard from "../components/analyzer/FeatureCard";
import AnalysisStatusPanel from "../components/analyzer/AnalysisStatusPanel";
import OverallScoreCard from "../components/analyzer/OverallScoreCard";
import ScoreBreakdownCard from "../components/analyzer/ScoreBreakdownCard";
import ResumePreview from "../components/analyzer/ResumePreview";
import ImprovementTips from "../components/analyzer/ImprovementTips";
import AnalysisHistoryTable from "../components/analyzer/AnalysisHistoryTable";
import { extractTextFromPDF } from "../utils/pdfUtils";

// Import Firebase services and auth hook
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// Import icons for features
import { ScanLine, Target, Key } from "lucide-react";

const features = [
  {
    icon: <ScanLine />,
    title: "Keyword Optimization",
    description:
      "Ensure your resume passes through automated filters by matching keywords from job descriptions.",
  },
  {
    icon: <Target />,
    title: "Skill Gap Analysis",
    description:
      "Identify critical skills you are missing for your target roles and get recommendations.",
  },
  {
    icon: <Key />,
    title: "Action Verb Strength",
    description:
      "Enhance your bullet points with powerful action verbs that highlight your achievements.",
  },
];

const steps = [
  {
    number: 1,
    title: "Upload Your Resume",
    description: "Drag and drop your resume in PDF format.",
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Our AI parses your resume against industry standards.",
  },
  {
    number: 3,
    title: "Get Your Score",
    description: "Receive a comprehensive report and actionable feedback.",
  },
];

const ResumeAnalyzerPage = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
  if (user && !user.isGuest) {
    const q = query(
      collection(db, "resumeAnalyses"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userHistory = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          userHistory.push({
            id: doc.id,
            fileName: data.fileName,
            score: data.analysis.overallScore,
            status: "Completed",
            date: new Date(
              data.createdAt.seconds * 1000
            ).toLocaleDateString(),
          });
        }
      });
      userHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(userHistory);
    });

    return () => unsubscribe();
  } else if (user?.isGuest) {
    // Mock history for guest users
    setHistory([
      {
        id: "mock1",
        fileName: "Frontend_Resume.pdf",
        score: 87,
        status: "Completed",
        date: "07/23/2025",
      },
      {
        id: "mock2",
        fileName: "Data_Analyst_CV.docx",
        score: 92,
        status: "Completed",
        date: "07/20/2025",
      },
      {
        id: "mock3",
        fileName: "ML_Internship_Resume.pdf",
        score: 78,
        status: "Completed",
        date: "07/18/2025",
      },
    ]);
  } else {
    setHistory([]);
  }
}, [user]);


  const handleAnalysisStart = async (file) => {
    setUploadedFile(file);
    setAnalysisResult(null);
    setError(null);
    setCurrentStep(1);

    // Simulate the stepper moving to step 2 while the API call is in flight
    setTimeout(() => {
      // Ensure we don't move past step 2 before API call finishes
      if (currentStep < 2) setCurrentStep(2);
    }, 1500);

    try {
      const resumeText = await extractTextFromPDF(file);

      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const prompt = `
                Act as an expert career coach and resume analyzer. Analyze the following resume text and provide a detailed review.
                
                Resume Text:
                ---
                ${resumeText}
                ---

                Please provide the response in a structured JSON format. The JSON object must have the following keys: "overallScore", "overallFeedback", "breakdown", and "tips".
                - "overallScore": A number between 0 and 100 representing the resume's quality.
                - "overallFeedback": A 1-2 sentence summary of the resume's strengths and weaknesses.
                - "breakdown": An array of exactly 4 objects for the sections: 'Contact Info', 'Experience', 'Education', and 'Skills'. Each object must have "title", "score" (a number 0-100), and "description" (a 1-sentence feedback).
                - "tips": An array of 3-4 short, actionable string tips for improvement.

                Do not include any text or formatting outside of the main JSON object.
            `;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);

      const result = await response.json();
      const textResponse = result.candidates[0]?.content?.parts[0]?.text;
      if (!textResponse) throw new Error("No content received from the API.");

      const cleanedJsonResponse = textResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const parsedData = JSON.parse(cleanedJsonResponse);

      if (user && !user.isGuest) {
        await addDoc(collection(db, "resumeAnalyses"), {
          userId: user.uid,
          fileName: file.name,
          analysis: parsedData,
          createdAt: serverTimestamp(),
        });
      }

      // Set the final results and step
      setAnalysisResult(parsedData);
      setCurrentStep(3);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
      console.error("Analysis failed:", err);
      setCurrentStep(0);
    }
  };

  const handleReanalyze = () => {
    setCurrentStep(0);
    setAnalysisResult(null);
    setUploadedFile(null);
    setError(null);
  };

  const isAnalyzing = currentStep === 1 || currentStep === 2;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <Typography variant="h4" component="h1" fontWeight="bold">
              AI Resume Analyzer
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Get an instant, data-driven analysis to land your dream job.
            </Typography>
          </div>
          {analysisResult && (
            <Button
              variant="outlined"
              startIcon={<RefreshCw size={16} />}
              onClick={handleReanalyze}
            >
              Analyze New Resume
            </Button>
          )}
        </div>
      </div>

      {!analysisResult && (
        <>
          <div className="row mb-5">
            <div className="col-12 col-lg-10 mx-auto">
              <ResumeUpload
                onAnalysisStart={handleAnalysisStart}
                isLoading={isAnalyzing}
              />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 mb-3">
              <div className="col-12 mt-3">
                <HowItWorksStepper steps={steps} activeStep={0} />
              </div>
            </div>
          </div>

          {currentStep === 0 && (
            <div className="row mb-5">
              <div className="col-12 mb-3">
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Key Features
                </Typography>
              </div>
              {features.map((feature) => (
                <div
                  className="col-12 col-md-4 d-flex mb-3"
                  key={feature.title}
                >
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {analysisResult && (
        <div className="row g-3">
          <div className="col-12 mt-4 mb-4">
            <HowItWorksStepper steps={steps} activeStep={4} />
          </div>
          <div className="col-12 col-lg-7">
            <div className="vstack gap-3">
              <OverallScoreCard
                score={analysisResult.overallScore}
                feedback={analysisResult.overallFeedback}
              />
              <div className="row g-3">
                {analysisResult.breakdown.map((item, index) => (
                  <div className="col-12 col-md-6" key={index}>
                    <ScoreBreakdownCard {...item} />
                  </div>
                ))}
              </div>
              <ImprovementTips tips={analysisResult.tips} />
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <ResumePreview file={uploadedFile} />
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-12 mb-3">
          <Typography variant="h5" component="h2" fontWeight="bold">
            Recent Analyses
          </Typography>
        </div>
        <div className="col-12">
          <AnalysisHistoryTable history={history} />
        </div>
      </div>

      <Dialog open={isAnalyzing} fullWidth maxWidth="lg">
        <DialogContent
          sx={{ p: 0, bgcolor: "background.default", height: "90vh" }}
        >
          <div className="row g-0 h-100">
            <div className="col-12 col-md-8 p-3 h-100">
              <ResumePreview file={uploadedFile} isModalVersion={true} />
            </div>
            <div
              className="col-12 col-md-4 p-3"
              style={{ backgroundColor: "var(--bs-body-bg)" }}
            >
              <AnalysisStatusPanel
                fileName={uploadedFile?.name || ""}
                currentStep={currentStep}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeAnalyzerPage;
