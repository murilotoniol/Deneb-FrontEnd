import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../services/AuthContext";
import { useGetServices } from "../../hooks/useGetServices";
import { useNavigate } from "react-router-dom";

export default function MeusServicos() {
  const { user, loading: loadingUser } = useAuth();
  const { services, loading, error } = useGetServices();
  const navigate = useNavigate();

  if (loadingUser || loading) {
    return (
      <div>
        <Header />
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography>Carregando seus serviços...</Typography>
        </Box>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography color="error">Erro ao carregar serviços: {error}</Typography>
        </Box>
        <Footer />
      </div>
    );
  }

  // Filtra os serviços do usuário logado
  const myServices = services.filter(service => service.user_id === user?.uid);

  return (
    <div>
      <Header />
      <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Container component="main" maxWidth="md" sx={{ flex: 1, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography component="h1" variant="h5" color="primary" sx={{ mb: 2, textAlign: 'center' }}>
            Meus Serviços
          </Typography>
          {myServices.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Você ainda não cadastrou nenhum serviço.
            </Typography>
          ) : (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 3, mt: 2, width: '100%' }}>
              {myServices.map((service) => (
                <Box
                  key={service.id}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    borderRadius: 2,
                    boxShadow: 2,
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    transition: "0.2s",
                    '&:hover': { boxShadow: 6, background: '#f0f8ff', borderColor: '#42a5f6' },
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => navigate(`/servico/${service.id}`)}
                >
                  <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>{service.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#0a2a37', mb: 1, wordBreak: 'break-word' }}>{service.description}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="caption" sx={{ color: '#5591a9' }}>Tipo: {service.type}</Typography>
                    <Typography variant="caption" sx={{ color: '#5591a9' }}>Valor: R$ {service.price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </div>
  );
} 