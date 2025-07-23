<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CareerMentorAI Project Overview</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 1000px; margin: auto; padding: 20px;">

  <h1>CareerMentorAI: AI-Powered Career Guidance Platform</h1>

  <p><strong>CareerMentorAI</strong> is a professional, secure, and intelligent web application designed to guide students through their career journey. It leverages the power of AI to provide personalized career roadmaps, resume analysis, and tailored document generation, replacing uncertainty with a clear, data-driven plan for success.</p>

  <hr/>

  <h2>Live Preview & Screenshots</h2>

  <p><em>(You can add your deployment link here once it's live)</em></p>
  
  <h3>Screenshots</h3>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; text-align: center;">
    <div style="flex: 1; min-width: 400px;">
        <p><strong>Student Dashboard</strong></p>
        <img width="450" alt="A professional dashboard showing student stats, skills, and recommended courses." src="YOUR_IMAGE_URL_HERE" />
    </div>
    <div style="flex: 1; min-width: 400px;">
        <p><strong>AI Tools Workspace</strong></p>
        <img width="450" alt="The workspace page with a hero section, tool cards, and history." src="YOUR_IMAGE_URL_HERE" />
    </div>
    <div style="flex: 1; min-width: 400px;">
        <p><strong>Resume Analyzer Results</strong></p>
        <img width="450" alt="The detailed AI analysis results page with scores and a resume preview." src="YOUR_IMAGE_URL_HERE" />
    </div>
    <div style="flex: 1; min-width: 400px;">
        <p><strong>Login & Sign Up Page</strong></p>
        <img width="450" alt="The responsive two-panel login and sign-up screen." src="YOUR_IMAGE_URL_HERE" />
    </div>
  </div>

  <hr/>

  <h2>The Problem</h2>
  <ul>
    <li><strong>Unstructured Career Planning:</strong> Students often lack a clear, step-by-step guide to prepare for their desired career.</li>
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
  
  <h3>4. Professional & Responsive UI</h3>
  <ul>
    <li>A fully collapsible sidebar for enhanced navigation and screen space.</li>
    <li>Switchable Light and Dark themes.</li>
    <li>A hybrid layout system using Bootstrap for the main grid and Material-UI for all internal components, ensuring a consistent and professional look on all devices.</li>
  </ul>


  <hr/>

  <h2>Tech Stack</h2>
  <table border="1" cellspacing="0" cellpadding="8">
    <tr><th>Layer</th><th>Technologies Used</th></tr>
    <tr><td><strong>Frontend</strong></td><td>React, Material-UI, Bootstrap (for grid layout)</td></tr>
    <tr><td><strong>AI / Generation</strong></td><td>Google Gemini API (or other large language models)</td></tr>
    <tr><td><strong>Text & Document Processing</strong></td><td>OCR libraries (e.g., Tesseract.js), NLP libraries</td></tr>
    <tr><td><strong>Charts & Visualizations</strong></td><td>Recharts, React Flow</td></tr>
    <tr><td><strong>PDF Rendering</strong></td><td>React-PDF</td></tr>
    <tr><td><strong>UI/UX</strong></td><td>Lucide React (Icons), Figma (Prototyping)</td></tr>
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
      <pre><code>git clone https://github.com/your-username/ai-career-mentor.git
cd ai-career-mentor</code></pre>
    </li>
    <li>
      <strong>Install dependencies:</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li>
        <strong>Set up PDF Worker (for Resume Analyzer):</strong>
        <pre><code># On Mac/Linux or Git Bash
cp ./node_modules/pdfjs-dist/build/pdf.worker.mjs ./public/

# On Windows CMD
copy .\\node_modules\\pdfjs-dist\\build\\pdf.worker.mjs .\\public\\
</code></pre>
    </li>
    <li>
      <strong>Run the application:</strong>
      <pre><code>npm start</code></pre>
      <p>The application will be available at <code>http://localhost:3000</code>.</p>
    </li>
  </ol>

</body>
</html>
