import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

import DocumentCard from '../components/documents/DocumentCard';
import DocumentListItem from '../components/documents/DocumentListItem';

import {
  Search,
  FileText,
  Mail,
  Milestone,
  List as ListIcon,
  Grid as GridIcon
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

// Mock data for guests
const mockDocuments = [
  { id: 1, type: "Resume", title: "Resume for Software Engineer", date: "July 22, 2025", icon: <FileText /> },
  { id: 2, type: "Cover Letter", title: "Cover Letter for Google", date: "July 21, 2025", icon: <Mail /> },
  { id: 3, type: "Roadmap", title: "Career Roadmap for Data Science", date: "July 20, 2025", icon: <Milestone /> },
  { id: 4, type: "Resume", title: "Resume for Product Manager", date: "July 19, 2025", icon: <FileText /> },
  { id: 5, type: "Cover Letter", title: "Cover Letter for Meta", date: "July 18, 2025", icon: <Mail /> },
  { id: 6, type: "Resume", title: "Creative Director Resume v2", date: "July 17, 2025", icon: <FileText /> },
];

const MyDocumentsPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState(""); // NEW STATE

  const [resumeDocs, setResumeDocs] = useState([]);
  const [coverLetterDocs, setCoverLetterDocs] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Fetch Cover Letters
  useEffect(() => {
    if (user && !user.isGuest) {
      const q = query(collection(db, "coverLetters"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const letters = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            type: "Cover Letter",
            title: `Cover Letter for ${data.role}`,
            date: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "N/A",
            icon: <Mail />,
            createdAt: data.createdAt
          };
        });
        setCoverLetterDocs(letters);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Fetch Resume Analyses
  useEffect(() => {
    if (user && !user.isGuest) {
      const q = query(collection(db, "resumeAnalyses"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const resumes = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            type: "Resume",
            title: `Analysis for ${data.fileName}`,
            date: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "N/A",
            icon: <FileText />,
            createdAt: data.createdAt
          };
        });
        setResumeDocs(resumes);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Merge both datasets
  useEffect(() => {
    if (user && !user.isGuest) {
      const combined = [...resumeDocs, ...coverLetterDocs];
      combined.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setDocuments(combined);
    } else {
      setDocuments(mockDocuments);
    }
  }, [resumeDocs, coverLetterDocs, user]);

  // ✅ Filtering by type + search term
  const filteredDocuments = documents.filter((doc) => {
    const matchesType = filter === "All" || doc.type === filter;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold">
        My Generated Documents
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Access all your generated resumes, cover letters, and career roadmaps here.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <ButtonGroup variant="outlined" aria-label="document filter button group">
          <Button onClick={() => setFilter("All")} variant={filter === "All" ? "contained" : "outlined"}>All</Button>
          <Button onClick={() => setFilter("Resume")} variant={filter === "Resume" ? "contained" : "outlined"}>Resumes</Button>
          <Button onClick={() => setFilter("Cover Letter")} variant={filter === "Cover Letter" ? "contained" : "outlined"}>Cover Letters</Button>
          <Button onClick={() => setFilter("Roadmap")} variant={filter === "Roadmap" ? "contained" : "outlined"}>Roadmaps</Button>
        </ButtonGroup>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search documents..."
            value={searchTerm} // ✅ Binds search input
            onChange={(e) => setSearchTerm(e.target.value)} // ✅ Update state
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              )
            }}
          />
          <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} size="small">
            <ToggleButton value="list" aria-label="list view"><ListIcon size={18} /></ToggleButton>
            <ToggleButton value="grid" aria-label="grid view"><GridIcon size={18} /></ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {view === "list" ? (
        <div className="vstack gap-2">
          {filteredDocuments.map((doc) => (
            <DocumentListItem key={doc.id} {...doc} />
          ))}
        </div>
      ) : (
        <div className="row g-3">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="col-12 col-sm-6 col-lg-4 d-flex">
              <DocumentCard {...doc} />
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default MyDocumentsPage;
