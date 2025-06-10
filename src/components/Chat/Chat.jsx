import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { chatService } from '../../services/chatService';
import { useAuth } from '../../hooks/useAuth'; // Assumindo que você tem um hook de autenticação
import './Chat.css';

const Chat = ({
  otherUserId,
  otherUserName,
  otherUserAvatar,
  chatId: initialChatId,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState(initialChatId);
  const [loading, setLoading] = useState(true);
  const messagesContainerRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let unsubscribe;

    const initializeChat = async () => {
      try {
        setLoading(true);
        console.log('Inicializando chat com ID:', chatId);

        // Começa a escutar as mensagens
        unsubscribe = chatService.listenToMessages(chatId, newMessages => {
          setMessages(newMessages);
          setLoading(false);
        });
      } catch (error) {
        console.error('Erro ao inicializar chat:', error);
        setLoading(false);
      }
    };

    if (chatId) {
      initializeChat();
    }

    return () => {
      if (unsubscribe) {
        console.log('Cancelando escuta de mensagens');
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

  const handleSendMessage = async e => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      await chatService.sendMessage(chatId, user.uid, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Aqui você pode adicionar um feedback visual do erro
    }
  };

  const formatTimestamp = timestamp => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography>Carregando mensagens...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Cabeçalho do chat */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar src={otherUserAvatar} alt={otherUserName}>
          {otherUserName?.charAt(0)}
        </Avatar>
        <Typography variant="h6" color="primary">
          {otherUserName}
        </Typography>
      </Box>

      {/* Área de mensagens */}
      <Box
        className="messages-container"
        ref={messagesContainerRef}
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map(message => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent:
                message.senderId === user.uid ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              className={`mensagem-card${message.senderId === user.uid ? ' mensagem-usuario' : ' mensagem-outro'}`}
            >
              <Typography
                variant="body1"
                sx={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  letterSpacing: '0.00938em',
                }}
              >
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5,
                  fontSize: '0.75rem',
                  opacity: 0.7,
                }}
              >
                {formatTimestamp(message.timestamp)}
              </Typography>
            </div>
          </Box>
        ))}
      </Box>

      {/* Área de input */}
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          size="small"
          className="message-input"
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!newMessage.trim()}
          className="send-button"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
