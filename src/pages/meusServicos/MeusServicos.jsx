import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function MeusServicos() {
  return (
    <div>
      <Header />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container
          component="main"
          maxWidth="md"
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
            <Typography component="h1" variant="h5" color="primary" sx={{ mb: 2 }}>
              Meus Serviços
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Aqui você verá a lista de serviços que você oferece.
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
} 