import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { chatService } from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth"; // Assumindo que você tem um hook de autenticação
import "./Chat.css";

const Chat = ({
  otherUserId,
  otherUserName,
  otherUserAvatar,
  chatId: initialChatId,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(initialChatId);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let unsubscribe;

    const initializeChat = async () => {
      try {
        setLoading(true);
        console.log("Inicializando chat com ID:", chatId);

        // Começa a escutar as mensagens
        unsubscribe = chatService.listenToMessages(chatId, (newMessages) => {
          setMessages(newMessages);
          setLoading(false);
        });
      } catch (error) {
        console.error("Erro ao inicializar chat:", error);
        setLoading(false);
      }
    };

    if (chatId) {
      initializeChat();
    }

    return () => {
      if (unsubscribe) {
        console.log("Cancelando escuta de mensagens");
        unsubscribe();
      }
    };
  }, [chatId]);

  // Atualiza o chatId quando ele for fornecido externamente
  useEffect(() => {
    if (initialChatId) {
      setChatId(initialChatId);
    }
  }, [initialChatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      await chatService.sendMessage(chatId, user.uid, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      // Aqui você pode adicionar um feedback visual do erro
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography>Carregando mensagens...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Cabeçalho do chat */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar src={otherUserAvatar} alt={otherUserName}>
          {otherUserName?.charAt(0)}
        </Avatar>
        <Typography variant="h6">{otherUserName}</Typography>
      </Box>

      {/* Área de mensagens */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent:
                message.senderId === user.uid ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: "70%",
                bgcolor:
                  message.senderId === user.uid
                    ? "#2196f3 !important"
                    : "#f5f5f5",
                color: message.senderId === user.uid ? "#ffffff" : "#000000",
                borderRadius: 2,
                position: "relative",
                zIndex: 1,
                boxShadow:
                  message.senderId === user.uid
                    ? "0 2px 4px rgba(33, 150, 243, 0.3)"
                    : "0 2px 4px rgba(0, 0, 0, 0.1)",
                "& > *": {
                  position: "relative",
                  zIndex: 2,
                },
                "&::after":
                  message.senderId === user.uid
                    ? {
                        content: '""',
                        position: "absolute",
                        right: -8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "8px solid transparent",
                        borderLeft: "8px solid #2196f3",
                        zIndex: 0,
                      }
                    : {},
                "&::before":
                  message.senderId !== user.uid
                    ? {
                        content: '""',
                        position: "absolute",
                        left: -8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "8px solid transparent",
                        borderRight: "8px solid #f5f5f5",
                        zIndex: 0,
                      }
                    : {},
                background:
                  message.senderId === user.uid ? "#2196f3" : "#f5f5f5",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  letterSpacing: "0.00938em",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "right",
                  mt: 0.5,
                  fontSize: "0.75rem",
                  opacity: message.senderId === user.uid ? 0.9 : 0.7,
                  color:
                    message.senderId === user.uid
                      ? "#ffffff"
                      : "rgba(0, 0, 0, 0.6)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {formatTimestamp(message.timestamp)}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Área de input */}
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          size="small"
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!newMessage.trim()}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
