import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
          <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
            <ErrorOutlineIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" color="primary" gutterBottom>
              Página não encontrada
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Ops! A página que você tentou acessar não existe ou foi movida.<br />
              Verifique o endereço ou volte para a página inicial.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 600 }}
            >
              Voltar para Home
            </Button>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
} 