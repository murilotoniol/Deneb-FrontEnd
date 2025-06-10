import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { chatService } from '../../services/chatService';
import { useAuth } from '../../hooks/useAuth';

const ChatList = ({ onChatSelect, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribeChats;

    const loadChats = async () => {
      try {
        setLoading(true);
        console.log('Carregando lista de chats para usuário:', user?.uid);

        // Busca os chats iniciais
        const initialChats = await chatService.getUserChats(user.uid);
        setChats(initialChats);

        // Configura listeners para cada chat
        initialChats.forEach(chat => {
          chatService.listenToChatUpdates(chat.id, updatedChat => {
            setChats(prevChats =>
              prevChats.map(c => (c.id === updatedChat.id ? updatedChat : c))
            );
          });
        });

        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar chats:', error);
        setLoading(false);
      }
    };

    if (user?.uid) {
      loadChats();
    }

    return () => {
      if (unsubscribeChats) {
        console.log('Cancelando escuta de chats');
        unsubscribeChats();
      }
    };
  }, [user?.uid]);

  const formatLastMessageTime = timestamp => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString();
    }
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
        <Typography>Carregando conversas...</Typography>
      </Box>
    );
  }

  if (chats.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography color="text.secondary">
          Nenhuma conversa iniciada.
          <br />
          Comece uma conversa através de um serviço.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        Conversas
      </Typography>

      <List sx={{ flex: 1, overflow: 'auto', px: 1 }}>
        {chats
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map(chat => {
            // Determina o outro usuário no chat
            const otherUserId = Object.keys(chat.participants).find(
              id => id !== user.uid
            );

            // Obter informações do outro usuário do participantsInfo
            const otherUserInfo = chat.participantsInfo?.[otherUserId] || {};
            const serviceInfo = chat.serviceInfo || {};

            // Nome do usuário: prioriza participantsInfo, depois serviceInfo
            const userName =
              otherUserInfo.name || serviceInfo.userName || 'Usuário';
            // Avatar do usuário: prioriza participantsInfo, depois serviceInfo
            const userAvatar = otherUserInfo.avatar || serviceInfo.userAvatar;

            return (
              <ListItem
                key={chat.id}
                button
                selected={chat.id === selectedChatId}
                onClick={() =>
                  onChatSelect({
                    chatId: chat.id,
                    userId: otherUserId,
                    name: userName,
                    avatar: userAvatar,
                  })
                }
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={userAvatar} alt={userName}>
                    {userName.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={userName}
                  secondary={
                    <Box
                      component="span"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '70%',
                          color: '#222',
                        }}
                      >
                        {chat.lastMessage || 'Nenhuma mensagem'}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ ml: 1, color: '#888' }}
                      >
                        {formatLastMessageTime(chat.updatedAt)}
                      </Typography>
                    </Box>
                  }
                  sx={{}}
                />
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
};

export default ChatList;
