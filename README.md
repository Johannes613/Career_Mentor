<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 1000px; margin: auto; padding: 20px;">

  <h1>CareerMentorAI: AI-Powered Career Guidance Platform</h1>

  <!-- Tech Badges -->
  <div style="margin-bottom: 20px;">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Badge">
    <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
    <img src="https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API Badge">
    <img src="https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
    <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions Badge">
  </div>

  <p><strong>CareerMentorAI</strong> is a professional, secure, and intelligent web application designed to guide students through their career journey. It leverages the power of AI to provide personalized career roadmaps, resume analysis, and tailored document generation, replacing uncertainty with a clear, data-driven plan for success.</p>

  <p>
    🐳 Docker Image Available:  
    <a href="https://hub.docker.com/repository/docker/johannes613/ai-career-mentor/general" target="_blank">
      https://hub.docker.com/repository/docker/johannes613/ai-career-mentor
    </a>
  </p>

  <p>
    CI/CD Enabled with <strong>GitHub Actions</strong>: automatically builds and pushes the Docker image on every push to the <code>main</code> branch.  
    The workflow file is available in the repository under: <code>.github/workflows/docker-build.yml</code>
  </p>

  <hr/>

  <h2>Live Preview</h2>

  <p><em>Deployed Site: <a href="https://ai-career-mentor.vercel.app/dashboard" target="_blank">https://ai-career-mentor.vercel.app/dashboard</a></em></p>
  
  <h3>Demo</h3>
  <img src="https://github.com/user-attachments/assets/20c024ed-8554-44e1-aa1f-fb950bde9752" alt="Preview GIF" style="max-width: 100%; height: auto;" />

  <hr/>

  <h2>The Problem</h2>
  <ul>
    <li><strong>Unstructured Career Planning:</strong> Students often lack a clear, step-by-step guide to prepare for their desired career. </li>
    <li><strong>Generic Resumes & Cover Letters:</strong> Creating application documents tailored to specific job descriptions is time-consuming and difficult.</li>
    <li><strong>Skill Gaps:</strong> Students are often unaware of the specific skills they need to develop to become competitive candidates.</li>
    <li><strong>Lack of Immediate Guidance:</strong> Getting quick, reliable answers to specific career questions can be challenging.</li>
  </ul>

  <p><strong>CareerMentorAI</strong> solves these challenges by providing a suite of integrated, AI-driven tools in a single, professional platform.</p>

  <hr/>

  <h2>Core Features</h2>

  <h3>1. AI-Powered Tools Suite</h3>
  <ul>
    <li><strong>Resume Analyzer:</strong> Upload a resume to receive an instant AI-powered score, detailed feedback on sections like Experience and Skills, and actionable tips for improvement.</li>
    <li><strong>Career Roadmap Generator:</strong> Describe a career goal and generate a visual, interactive roadmap of skills to learn and steps to take, powered by React Flow.</li>
    <li><strong>Cover Letter Generator:</strong> Automatically create cover letters tailored to a specific job description by providing key details.</li>
  </ul>

  <h3>2. Interactive Dashboards & Document Management</h3>
  <ul>
    <li><strong>Student Dashboard:</strong> An at-a-glance view of key metrics, skill progress, and recommended courses.</li>
    <li><strong>Workspace:</strong> A central hub to access all AI tools and view a history of generated documents.</li>
    <li><strong>My Documents Page:</strong> A dedicated section to view, filter, and manage all generated resumes, cover letters, and roadmaps.</li>
  </ul>

  <h3>3. AI Career Assistant Chatbot</h3>
  <ul>
    <li>An integrated chatbot, available on all pages, for instant answers to career-related questions.</li>
    <li>Features a professional UI with simulated typing and a welcoming, branded experience.</li>
  </ul>
  <hr/>

  <h2>Tech Stack</h2>
  <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse;">
    <tr style="background-color: #f2f2f2;"><th>Layer</th><th>Technologies Used</th></tr>
    <tr><td><strong>Frontend</strong></td><td>React, Material-UI, JavaScript</td></tr>
    <tr><td><strong>AI / Generation</strong></td><td>Google Gemini API</td></tr>
    <tr><td><strong>Text & Document Processing</strong></td><td>OCR (Tesseract.js), NLP libraries</td></tr>
    <tr><td><strong>Charts & Visualizations</strong></td><td>Recharts, React Flow</td></tr>
    <tr><td><strong>PDF Rendering</strong></td><td>React-PDF</td></tr>
    <tr><td><strong>UI/UX</strong></td><td>Lucide React (Icons), Figma (Prototyping)</td></tr>
    <tr><td><strong>Containerization</strong></td><td>Docker</td></tr>
    <tr><td><strong>CI/CD</strong></td><td>GitHub Actions (build & push to Docker Hub on push to <code>main</code>)</td></tr>
  </table>

  <hr/>

  <h2>Getting Started Locally</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (v18+)</li>
    <li>npm (Node Package Manager)</li>
    <li>A `.env` file for your Gemini API Key</li>
  </ul>

  <h3>Installation</h3>

  <ol>
    <li>
      <strong>Clone the repository:</strong>
      <pre><code style="background-color: #f2f2f2; padding: 5px; border-radius: 4px; display: block;">git clone https://github.com/your-username/ai-career-mentor.git
cd ai-career-mentor</code></pre>
    </li>
    <li>
      <strong>Install dependencies:</strong>
      <pre><code style="background-color: #f2f2f2; padding: 5px; border-radius: 4px; display: block;">npm install</code></pre>
    </li>
    <li>
      <strong>Set up PDF Worker (for Resume Analyzer):</strong>
      <pre><code style="background-color: #f2f2f2; padding: 5px; border-radius: 4px; display: block;"># On Mac/Linux or Git Bash
cp ./node_modules/pdfjs-dist/build/pdf.worker.mjs ./public/

# On Windows CMD
copy .\\node_modules\\pdfjs-dist\\build\\pdf.worker.mjs .\\public\\</code></pre>
    </li>
    <li>
      <strong>Run the application:</strong>
      <pre><code style="background-color: #f2f2f2; padding: 5px; border-radius: 4px; display: block;">npm start</code></pre>
      <p>The application will be available at <code>https://ai-career-mentor.vercel.app/dashboard</code></p>
    </li>
  </ol>

</body>
</html>
