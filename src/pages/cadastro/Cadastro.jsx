import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  validateCPF,
  validatePhone,
  validatePassword,
  validateDate,
} from "../../utils/validation.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
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

export default function Cadastro() {
  const navigate = useNavigate();
  const { loading, error: authError, registerWithEmail } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cpf: "",
    phone_number: "",
    birth_date: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim()) {
      errors.first_name = "Nome é obrigatório";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Sobrenome é obrigatório";
    }
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
    }
    if (!validateCPF(formData.cpf)) {
      errors.cpf = "CPF inválido";
    }
    if (!validatePhone(formData.phone_number)) {
      errors.phone_number = "Telefone inválido";
    }
    if (!validateDate(formData.birth_date)) {
      errors.birth_date = "Data de nascimento inválida";
    }
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password =
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const result = await registerWithEmail(formData);
      if (result.success) {
        navigate("/login");
      }
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
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: '10vh' }}>
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
                mb: 2,
              }}
            >
              <PawPrint size={32} color="#42a5f6" />
              <Typography component="h1" variant="h5" color="primary">
                Cadastro
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Preencha os dados abaixo:
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="Nome"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                error={!!formErrors.first_name}
                helperText={formErrors.first_name}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Sobrenome"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                error={!!formErrors.last_name}
                helperText={formErrors.last_name}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                error={!!formErrors.cpf}
                helperText={formErrors.cpf}
                placeholder="000.000.000-00"
                inputProps={{ maxLength: 14 }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone_number"
                label="Telefone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                error={!!formErrors.phone_number}
                helperText={formErrors.phone_number}
                placeholder="(00) 00000-0000"
                inputProps={{ maxLength: 15 }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="birth_date"
                label="Data de Nascimento"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                error={!!formErrors.birth_date}
                helperText={formErrors.birth_date}
                placeholder="DD/MM/AAAA"
                inputProps={{ maxLength: 10 }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirme a Senha"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                sx={{ mb: 2 }}
              />
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
                {loading ? "Registrando..." : "Registrar"}
              </Button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2">
                  Já tem uma conta?{' '}
                  <MuiLink component={Link} to="/login" color="primary" sx={{ fontWeight: 600 }}>
                    Entrar
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
