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
import { keyframes } from "@mui/system";

// Import necessary icons
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

// Keyframes for the dot animation
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

// A new component for the "AI is thinking..." indicator
const TypingIndicator = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      alignSelf: "flex-start",
    }}
  >
    <Box sx={{ display: "flex", gap: "4px" }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.main",
          borderRadius: "50%",
          animation: `${bounce} 1.4s infinite ease-in-out both`,
          animationDelay: "-0.32s",
        }}
      /> 
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.main",
          borderRadius: "50%",
          animation: `${bounce} 1.4s infinite ease-in-out both`,
          animationDelay: "-0.16s",
        }}
      />
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.main",
          borderRadius: "50%",
          animation: `${bounce} 1.4s infinite ease-in-out both`,
        }}
      />
    </Box>
    <Typography variant="body2" color="text.secondary">
      AI is thinking...
    </Typography>
  </Box>
);

const Chatbot = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your CareerMentor AI Assistant. I can help you with career questions, resume feedback, and planning your next steps. How can I assist you today?",
    },
  ]);
  // State to track if the bot is "typing"
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Effect to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = formData.get("message");
    if (text.trim()) {
      setMessages((prev) => [...prev, { from: "user", text }]);
      setIsTyping(true); // Show the typing indicator
      event.currentTarget.reset();

      // Simulate a bot response after a delay
      setTimeout(() => {
        setIsTyping(false); // Hide the typing indicator
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Thanks for your message! I'm processing your request.",
          },
        ]);
      }, 2500); // Increased delay to make the indicator visible
    }
  };

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 100,
          right: 24,
          width: 360,
          height: 500,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          zIndex: 1300,
          transition: "transform 0.3s ease-in-out, opacity 0.2s ease-in-out",
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          opacity: isOpen ? 1 : 0,
          transformOrigin: "bottom right",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            AI Assistant
          </Typography>
          <IconButton onClick={toggleChat} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Message Area */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                bgcolor:
                  msg.from === "user" ? "primary.main" : "background.default",
                color:
                  msg.from === "user" ? "primary.contrastText" : "text.primary",
                p: 1.5,
                borderRadius: 3,
                maxWidth: "80%",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Box>
          ))}
          {/* Conditionally render the typing indicator */}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
        >
          <TextField
            fullWidth
            name="message"
            placeholder="Enter your message..."
            variant="outlined"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary" edge="end">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>

      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleChat}
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
};

export default Chatbot;
