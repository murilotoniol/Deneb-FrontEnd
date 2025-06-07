import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { PawPrint } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const { loading, error: authError, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor, insira seu email");
      return;
    }

    try {
      await resetPassword(email);
      setMessage(
        "Email de recuperação enviado. Por favor, verifique sua caixa de entrada."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage("Erro ao enviar email de recuperação. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Header />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <PawPrint size={32} color="#42a5f6" />
              <Typography component="h1" variant="h5" color="primary">
                Recuperar Senha
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              {message && (
                <ErrorMessage
                  message={message}
                  type={message.includes("enviado") ? "success" : "error"}
                />
              )}
              {authError && <ErrorMessage message={authError} type="error" />}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2">
                  Lembrou sua senha?{' '}
                  <MuiLink href="/login" color="primary" sx={{ fontWeight: 600 }}>
                    Voltar para o login
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
