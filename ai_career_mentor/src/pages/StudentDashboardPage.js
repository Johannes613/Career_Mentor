import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import {  collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";

import StudentStatCard from "../components/student/StudentStatCard";
import SkillsChart from "../components/student/SkillsChart";
import RecommendedCourses from "../components/student/RecommendedCourses";
import ProfileCompletion from "../components/student/ProfileCompletion";
import TopCompanies from "../components/student/TopCompanies";
import FeaturedOpportunity from "../components/student/FeaturedOpportunity";
import SkillProgress from "../components/student/SkillProgress";
import { CheckCircle, Bot, Target, Code, Camera, Brush, BarChart2, Mic } from "lucide-react";

const iconMap = {
    Bot: Bot,
    Target: Target,
    CheckCircle: CheckCircle,
    Code: Code,
    Camera: Camera,
    Brush: Brush,
    BarChart2: BarChart2,
    Mic: Mic
};

// FIX: Use string identifiers for icons in mockData
const mockData = {
    stats: [
        { title: "AI Sessions", value: "34h", icon: "Bot", color: "secondary" },
        { title: "Avg. Resume Score", value: "82%", icon: "Target", color: "secondary" },
        { title: "Skills Verified", value: "14", icon: "CheckCircle", color: "primary" },
    ],
    profileCompletion: 82,
    skillsChart: {
        data: [
            { name: 'UI Design', value: 35 }, { name: 'UX Design', value: 20 },
            { name: 'Music', value: 14 }, { name: 'Animation', value: 12 },
            { name: 'React', value: 10 }, { name: 'SEO', value: 9 },
        ],
    },
    recommendedCourses: [
        { name: 'Advanced React Patterns', views: '2.1K Views', icon: "Code" },
        { name: 'Data Structures & Algorithms', views: '3.8K Views', icon: "Camera" },
        { name: 'System Design for Interviews', views: '1.5K Views', icon: "Brush" },
        { name: 'Cloud Computing Essentials', views: '980 Views', icon: "BarChart2" },
        { name: 'Advanced CSS and Sass', views: '1.2K Views', icon: "Mic" },
    ],
    skillProgress: [
        { name: 'React', progress: 90 }, { name: 'Node.js', progress: 75 },
        { name: 'SQL', progress: 60 }, { name: 'System Design', progress: 45 },
        { name: 'DevOps', progress: 30 },
    ],
    topCompanies: [
      { name: 'Google', field: 'Software Engineering', logo: 'G' },
      { name: 'Meta', field: 'Product Management', logo: 'M' },
      { name: 'Amazon', field: 'Cloud Computing', logo: 'A' },
      { name: 'Netflix', field: 'Streaming Services', logo: 'N' },
    ]
};

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndGenerateDashboard = async () => {
        if (!user) return;

        if (user.isGuest) {
            setDashboardData(mockData);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const cacheKey = `dashboardData_${user.uid}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            const { timestamp, data } = JSON.parse(cachedData);
            const isCacheValid = (new Date().getTime() - timestamp) < 24 * 60 * 60 * 1000; // 24 hours

            if (isCacheValid) {
                setDashboardData(data);
                setLoading(false);
                return;
            }
        }

        try {
            const q = query(
                collection(db, "resumeAnalyses"),
                where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setDashboardData(mockData);
                setLoading(false);
                return;
            }

            const sortedDocs = querySnapshot.docs.sort((a, b) => {
                const dateA = a.data().createdAt?.seconds || 0;
                const dateB = b.data().createdAt?.seconds || 0;
                return dateB - dateA;
            });

            const latestAnalysis = sortedDocs[0].data();
            const resumeText = latestAnalysis.resumeText;

            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const prompt = `
                Based on the following resume text, generate a JSON object for a student's career dashboard.
                Resume Text: "${resumeText}"

                The JSON object must have these exact keys: "stats", "profileCompletion", "skillsChart", "recommendedCourses", "skillProgress", "topCompanies".
                - "stats": An array of 3 objects, each with "title", "value" (string).
                - "profileCompletion": A number between 0-100.
                - "skillsChart": An object with a "data" key, which is an array of 6 objects, each with "name" (skill) and "value" (percentage).
                - "recommendedCourses": An array of 5 objects, each with "name" (course title), "views" (string like "1.2K Views"), and an "icon" field with one of the following string values: "Code", "Camera", "Brush", "BarChart2", "Mic".
                - "skillProgress": An array of 5 objects, each with "name" (skill) and "progress" (number 0-100).
                - "topCompanies": An array of 4 objects, each with "name" (company) and "field" (industry).

                Infer all values based on the resume content. Do not include any text outside the JSON object.
            `;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) throw new Error(`API error: ${response.statusText}`);

            const result = await response.json();
            const textResponse = result.candidates[0]?.content?.parts[0]?.text;
            if (!textResponse) throw new Error("No content received from the API.");

            const cleanedJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedData = JSON.parse(cleanedJson);
                        parsedData.stats[0].icon = "Bot";
            parsedData.stats[1].icon = "Target";
            parsedData.stats[2].icon = "CheckCircle";
            parsedData.stats[0].color = "secondary";
            parsedData.stats[1].color = "secondary";
            parsedData.stats[2].color = "primary";

            parsedData.topCompanies.forEach(company => company.logo = company.name.charAt(0));

            setDashboardData(parsedData);

            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: new Date().getTime(),
                data: parsedData
            }));

        } catch (err) {
            console.error("Failed to generate dashboard:", err);
            setError("Could not generate dynamic dashboard. Displaying default data.");
            setDashboardData(mockData);
        } finally {
            setLoading(false);
        }
    };

    fetchAndGenerateDashboard();
  }, [user]);

  if (loading || !dashboardData) {
      return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
          </Box>
      );
  }

  return (
    <>
      <h5 className="fw-bold mb-1">Welcome back, {user?.displayName || 'User'}</h5>
      <p className="text-muted mb-4">
        {user.isGuest ? "The data below is for demonstration. Log in to get your personalized dashboard." : "Please upload your resume to get your latest data in the dashboard"}
      </p>
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

      <div className="row g-4">
        {dashboardData.stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Bot;
            return (
                <div className="col-12 col-md-4" key={index}>
                    <StudentStatCard {...stat} Icon={IconComponent} />
                </div>
            )
        })}

        <div className="col-12 col-lg-8 d-flex mt-4">
          <FeaturedOpportunity />
        </div>
        <div className="col-12 col-lg-4 d-flex mt-4">
          <ProfileCompletion value={dashboardData.profileCompletion} />
        </div>
        <div className="col-12 col-lg-7 d-flex">
          <SkillsChart data={dashboardData.skillsChart.data} />
        </div>
        <div className="col-12 col-lg-5 d-flex">
          <RecommendedCourses courses={dashboardData.recommendedCourses} />
        </div>
        <div className="col-12 col-lg-7 d-flex">
          <SkillProgress skills={dashboardData.skillProgress} />
        </div>
        <div className="col-12 col-lg-5 d-flex">
          <TopCompanies companies={dashboardData.topCompanies} />
        </div>
      </div>
    </>
  );
};

export default StudentDashboardPage;
