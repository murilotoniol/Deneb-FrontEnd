import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChatList from "../../components/Chat/ChatList";
import Chat from "../../components/Chat/Chat";
import { useAuth } from "../../hooks/useAuth";
import { usePresence } from "../../hooks/usePresence";
import { chatService } from "../../services/chatService";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Mensagens.css";

const Mensagens = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    user,
    userData,
    isAuthenticated,
    loading: authLoading,
    initialized,
  } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  // Usa o hook de presença para gerenciar o status online/offline
  usePresence();

  useEffect(() => {
    const initializeChat = async () => {
      // Se ainda está carregando a autenticação, não faz nada
      if (authLoading) {
        console.log("Mensagens: Aguardando carregamento da autenticação...");
        return;
      }

      // Se não há usuário após o carregamento, redireciona para login
      if (!user) {
        console.log("Mensagens: Usuário não autenticado, redirecionando...");
        navigate("/login", {
          state: { from: location.pathname },
        });
        return;
      }

      // Verifica se há informações do chat para inicializar
      const chatInfo = location.state?.chatInfo;
      if (!chatInfo) {
        console.log("Mensagens: Sem informações de chat para inicializar");
        return;
      }

      try {
        console.log("Mensagens: Iniciando criação/obtenção do chat...");
        setLoading(true);

        const chatId = await chatService.createOrGetChat(
          user.uid,
          chatInfo.userId,
          chatInfo.serviceInfo,
        );

        console.log("Mensagens: Chat inicializado com sucesso", { chatId });
        setSelectedChat({
          userId: chatInfo.userId,
          name: chatInfo.name,
          avatar: chatInfo.avatar,
          chatId: chatId,
        });
      } catch (error) {
        console.error("Mensagens: Erro ao inicializar chat", error);
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [user, authLoading, navigate, location]);

  if (loading || authLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  const handleChatSelect = (chatInfo) => {
    setSelectedChat(chatInfo);
  };

  return (
    <>
      <Header />
      <div className="mensagens-container">
        <div className="mensagens-content">
          <Grid container spacing={2} sx={{ height: "100%" }}>
            {/* Lista de Chats */}
            <Grid
              item
              xs={12}
              md={4}
              className="mensagens-lista-col"
              sx={{
                height: "100%",
                display: isMobile && selectedChat ? "none" : "block",
              }}
            >
              <ChatList
                onChatSelect={handleChatSelect}
                selectedChatId={selectedChat?.chatId}
              />
            </Grid>
            {/* Área do Chat */}
            <Grid
              item
              xs={12}
              md={8}
              className="mensagens-chat-col"
              sx={{
                height: "100%",
                display: isMobile && !selectedChat ? "none" : "block",
              }}
            >
              {selectedChat ? (
                <Chat
                  otherUserId={selectedChat.userId}
                  otherUserName={selectedChat.name}
                  otherUserAvatar={selectedChat.avatar}
                  chatId={selectedChat.chatId}
                />
              ) : (
                <Box
                  className="mensagem-card"
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                    borderRadius: "12px",
                    p: 3,
                    textAlign: "center",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Selecione uma conversa para começar a chatear
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ou volte para a página do serviço e clique em "Mensagem"
                    para iniciar uma nova conversa
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mensagens;
