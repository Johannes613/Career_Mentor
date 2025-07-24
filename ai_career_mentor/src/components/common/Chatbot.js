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
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Bot } from "lucide-react";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

const TypingIndicator = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box sx={{ display: "flex", gap: "4px" }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            bgcolor: "primary.main",
            borderRadius: "50%",
            animation: `${bounce} 1.4s infinite ease-in-out both`,
            animationDelay: `${-0.32 + i * 0.16}s`,
          }}
        />
      ))}
    </Box>
    <Typography variant="body2" color="text.secondary">
      AI is typing...
    </Typography>
  </Box>
);

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Chatbot = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your CareerMentor AI Assistant. I can help you with career questions, resume feedback, and planning your next steps. How can I assist you today?",
      time: formatTime(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = form.get("message");
    if (text.trim()) {
      const time = formatTime();
      setMessages((prev) => [...prev, { from: "user", text, time }]);
      setIsTyping(true);
      event.currentTarget.reset();

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Ahlan wa sahlan! Hello! Let me assist you with that.",
            time: formatTime(),
          },
        ]);
      }, 2000);
    }
  };

  return (
    <>
      <Paper
        elevation={10}
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
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.3s ease",
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Bot size={24} />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                AI Assistant
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                  }}
                />
                <Typography variant="caption">
                  Available • I'm here to help you!
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton onClick={toggleChat} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            bgcolor: theme.palette.grey[50],
          }}
        >
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                bgcolor:
                  msg.from === "user" ? "primary.main" : "background.paper",
                color:
                  msg.from === "user" ? "primary.contrastText" : "text.primary",
                px: 2,
                py: 1.2,
                borderRadius: 2,
                boxShadow: 1,
                maxWidth: "80%",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  opacity: 0.6,
                  fontSize: "0.65rem",
                }}
              >
                {msg.time}
              </Typography>
            </Box>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input area */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <TextField
            fullWidth
            name="message"
            variant="outlined"
            placeholder="Enter your message..."
            size="small"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary">
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
        onClick={toggleChat}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
          boxShadow: 6,
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
};

export default Chatbot;
