// This file simulates the data you would get from your AI backend.

// --- Data for Full Stack Developer Roadmap ---
const fullStackNodes = [
  { id: 'fs-1', type: 'roadmapNode', data: { label: 'Fundamentals: HTML, CSS, JavaScript', description: 'Master the core languages of the web. Understand HTML structure, CSS styling, and basic JavaScript.' }, position: { x: 300, y: 0 } },
  { id: 'fs-2', type: 'roadmapNode', data: { label: 'JavaScript Fundamentals Deep Dive', description: 'Explore advanced JavaScript concepts like closures, prototypes, and asynchronous programming.' }, position: { x: 300, y: 210 } },
  { id: 'fs-3', type: 'roadmapNode', data: { label: 'Version Control with Git', description: 'Learn to use Git for managing code changes, collaboration, and deploying projects.' }, position: { x: 300, y: 420 } },
  { id: 'fs-4', type: 'roadmapNode', data: { label: 'React Basics', description: 'Understand components, JSX, state, and props in React. Learn the fundamentals of building UIs.' }, position: { x: 50, y: 600 } },
  { id: 'fs-5', type: 'roadmapNode', data: { label: 'Node.js & Express', description: 'Build server-side applications and APIs using Node.js and the Express framework.' }, position: { x: 550, y: 640 } },
  { id: 'fs-6', type: 'roadmapNode', data: { label: 'Databases (SQL & NoSQL)', description: 'Learn how to work with both relational (PostgreSQL) and non-relational (MongoDB) databases.' }, position: { x: 550, y: 840 } },
  { id: 'fs-7', type: 'roadmapNode', data: { label: 'State Management (Redux/Zustand)', description: 'Manage complex application state efficiently using a predictable state container.' }, position: { x: 50, y: 780 } },
  { id: 'fs-8', type: 'roadmapNode', data: { label: 'Deployment & DevOps', description: 'Learn to deploy your full-stack applications to cloud services like Vercel, Netlify, or AWS.' }, position: { x: 300, y: 950 } },
];

const fullStackEdges = [
  { id: 'fse-1-2', source: 'fs-1', target: 'fs-2', animated: true },
  { id: 'fse-2-3', source: 'fs-2', target: 'fs-3', animated: true },
  { id: 'fse-3-4', source: 'fs-3', target: 'fs-4', animated: true },
  { id: 'fse-3-5', source: 'fs-3', target: 'fs-5', animated: true },
  { id: 'fse-5-6', source: 'fs-5', target: 'fs-6', animated: true },
  { id: 'fse-4-7', source: 'fs-4', target: 'fs-7', animated: true },
  { id: 'fse-6-8', source: 'fs-6', target: 'fs-8', animated: true },
  { id: 'fse-7-8', source: 'fs-7', target: 'fs-8', animated: true },
];

// --- Data for Data Science Roadmap ---
const dataScienceNodes = [
    { id: 'ds-1', type: 'roadmapNode', data: { label: 'Python Fundamentals', description: 'Master the Python language, including data structures, control flow, and functions.' }, position: { x: 250, y: 0 } },
    { id: 'ds-2', type: 'roadmapNode', data: { label: 'Data Analysis with Pandas & NumPy', description: 'Learn to manipulate and analyze data efficiently using core data science libraries.' }, position: { x: 250, y: 150 } },
    { id: 'ds-3', type: 'roadmapNode', data: { label: 'Data Visualization', description: 'Create compelling visualizations with libraries like Matplotlib and Seaborn.' }, position: { x: 100, y: 300 } },
    { id: 'ds-4', type: 'roadmapNode', data: { label: 'SQL for Data Analysis', description: 'Master querying relational databases to extract and analyze data.' }, position: { x: 400, y: 300 } },
    { id: 'ds-5', type: 'roadmapNode', data: { label: 'Machine Learning Fundamentals', description: 'Understand core ML concepts and algorithms with Scikit-learn.' }, position: { x: 250, y: 450 } },
    { id: 'ds-6', type: 'roadmapNode', data: { label: 'Deep Learning (TensorFlow/PyTorch)', description: 'Dive into neural networks and deep learning frameworks for advanced models.' }, position: { x: 250, y: 600 } },
];

const dataScienceEdges = [
    { id: 'dse-1-2', source: 'ds-1', target: 'ds-2', animated: true },
    { id: 'dse-2-3', source: 'ds-2', target: 'ds-3', animated: true },
    { id: 'dse-2-4', source: 'ds-2', target: 'ds-4', animated: true },
    { id: 'dse-3-5', source: 'ds-3', target: 'ds-5', animated: true },
    { id: 'dse-4-5', source: 'ds-4', target: 'ds-5', animated: true },
    { id: 'dse-5-6', source: 'ds-5', target: 'ds-6', animated: true },
];


export const generateMockRoadmap = (field) => {
    // Check if the requested field is for Data Science to return a different roadmap
    if (field.toLowerCase().includes('data science')) {
        return {
            title: `Data Science Roadmap`,
            description: `A comprehensive guide to becoming a Data Scientist, covering Python, data analysis, visualization, and machine learning.`,
            duration: '9-15 Months',
            nodes: dataScienceNodes,
            edges: dataScienceEdges,
        };
    }
    
    // Otherwise, return the default Full Stack roadmap
    return {
        title: `${field} Roadmap`,
        description: `This roadmap provides a structured path to becoming a proficient ${field}. It covers essential front-end concepts with React, back-end technologies, databases, and deployment strategies.`,
        duration: '12-18 Months',
        nodes: fullStackNodes,
        edges: fullStackEdges,
    };
};