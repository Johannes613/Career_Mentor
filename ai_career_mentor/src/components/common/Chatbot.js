import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Fab,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Bot } from "lucide-react";

// A utility function to format the current time
const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// The system prompt that defines the bot's persona and knowledge
const systemPrompt = `You are the "CareerMentor AI Assistant," a helpful and professional chatbot for the CareerMentorAI application. Your purpose is to assist students with their career goals.
The application has the following features:
- AI Resume Analyzer: Scores and provides feedback on resumes.
- Career Roadmap Generator: Creates personalized learning paths for different careers.
- Cover Letter Generator: Writes cover letters based on job descriptions.
- My Documents: A place to store all generated documents.
Keep your answers concise, helpful, and encouraging. Always act as a career coach.`;


// *** BUG FIX: The logic inside this hook has been simplified ***
const useTypingEffect = (fullText, isLastMessage) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // If this is the last message, start the typing effect from scratch.
    if (isLastMessage && fullText) {
      setTypedText(''); // Reset text
      const words = fullText.split(/(\s+)/);
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < words.length) {
          // Use a functional update to ensure we have the latest previous state
          setTypedText(prev => prev + words[i]);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Typing speed

      // Cleanup function to clear interval if the component unmounts or re-renders
      return () => clearInterval(typingInterval);
    } else {
      // For all previous messages, just show the full text immediately.
      setTypedText(fullText);
    }
  }, [fullText, isLastMessage]); // The effect re-runs only when the text or its "last message" status changes

  return typedText;
};

// Bot message component with typing animation
const BotMessage = ({ text, time, isLastMessage }) => {
  const theme = useTheme();
  const typedText = useTypingEffect(text, isLastMessage);
  const isTyping = isLastMessage && typedText !== text;
  
  const blinkingCursor = `@keyframes blinkingCursor { from, to { border-color: transparent; } 50% { border-color: ${theme.palette.primary.main}; } }`;

  return (
    <Box sx={{ alignSelf: "flex-start", bgcolor: "background.paper", color: "text.primary", px: 2, py: 1.2, borderRadius: 2, boxShadow: 1, maxWidth: "80%" }}>
       <style>{blinkingCursor}</style>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
        {typedText}
        {isTyping && <Box component="span" sx={{ ml: '2px', borderRight: '2px solid', animation: 'blinkingCursor 0.75s step-end infinite' }} />}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", mt: 0.5, opacity: isTyping ? 0 : 0.6, transition: 'opacity 0.3s', fontSize: "0.65rem" }}>
        {time}
      </Typography>
    </Box>
  );
};


// Main Chatbot Component
const Chatbot = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your CareerMentor AI Assistant. How can I assist you today?",
      time: formatTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const userText = inputValue.trim();

    if (!userText || isLoading) return;

    const newUserMessage = { from: "user", text: userText, time: formatTime() };
    const newMessages = [...messages, newUserMessage];
    
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const apiHistory = newMessages.map(msg => ({
      role: msg.from === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: apiHistory,
          systemInstruction: {
            role: "system",
            parts: [{ text: systemPrompt }],
          },
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      const botText = rawText ? rawText.replace(/\*/g, '') : "Sorry, I couldn't process that. Please try again.";

      setMessages((prev) => [...prev, { from: "bot", text: botText, time: formatTime() }]);

    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages((prev) => [...prev, { from: "bot", text: "There was an error connecting to the AI. Please check your API key.", time: formatTime() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper
        elevation={10}
        sx={{
          position: "fixed", bottom: 100, right: 24, width: 360, height: 500,
          borderRadius: 4, display: "flex", flexDirection: "column",
          zIndex: 1300, bgcolor: "background.paper", border: "1px solid",
          borderColor: "divider", transition: "all 0.3s ease",
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          opacity: isOpen ? 1 : 0, visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <Box
          sx={{
            p: 2, bgcolor: "primary.main", color: "primary.contrastText",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Bot size={24} />
            <Box>
              <Typography variant="h6" fontWeight="bold">AI Assistant</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main" }} />
                <Typography variant="caption">Online • Ready to help</Typography>
              </Box>
            </Box>
          </Box>
          <IconButton onClick={toggleChat} color="inherit"><CloseIcon /></IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1, p: 2, overflowY: "auto", display: "flex",
            flexDirection: "column", gap: 1.5,
            bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          }}
        >
          {messages.map((msg, idx) => {
              const isLastBotMessage = msg.from === 'bot' && idx === messages.length - 1;
              return msg.from === 'user' ? (
                <Box key={idx} sx={{ alignSelf: "flex-end", bgcolor: "primary.main", color: "primary.contrastText", px: 2, py: 1.2, borderRadius: 2, boxShadow: 1, maxWidth: "80%" }}>
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ display: "block", mt: 0.5, opacity: 0.6, fontSize: "0.65rem" }}>{msg.time}</Typography>
                </Box>
              ) : (
                <BotMessage key={idx} text={msg.text} time={msg.time} isLastMessage={isLastBotMessage} />
              );
          })}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", bgcolor: "background.default" }}
        >
          <TextField
            fullWidth
            name="message"
            variant="outlined"
            placeholder="Enter your message..."
            size="small"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary" disabled={isLoading || !inputValue.trim()}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>

      <Fab color="primary" onClick={toggleChat} sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300, boxShadow: 6 }}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
};

export default Chatbot;