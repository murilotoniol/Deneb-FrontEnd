import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { PawPrint } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [localLoading, setLocalLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const auth = getAuth();

  const handleLogin = async e => {
    e.preventDefault();
    setLocalLoading(true);

    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos');
      setMessageType('error');
      setLocalLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login realizado com sucesso!');
      setMessageType('success');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Erro ao fazer login.';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Email ou senha inválidos.';
          break;
        default:
          errorMessage = error.message;
      }

      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLocalLoading(false);
    }
  };

  if (localLoading || authLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
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
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <PawPrint size={32} color="#42a5f6" />
              <Typography component="h1" variant="h5" color="primary">
                Entrar
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
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
                onChange={e => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              {message && <ErrorMessage message={message} type={messageType} />}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Lembrar de mim"
                />
                <MuiLink
                  component={Link}
                  to="/recuperar-senha"
                  variant="body2"
                  color="primary"
                >
                  Esqueceu a senha?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={localLoading || authLoading}
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {localLoading || authLoading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Não tem uma conta?{' '}
                  <MuiLink
                    component={Link}
                    to="/registrar"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    Cadastre-se
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
