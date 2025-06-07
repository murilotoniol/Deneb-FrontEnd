import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "../../services/AuthContext";
import "./AsideMenu.css";
import { useNavigate } from "react-router-dom";

export default function AsideMenu({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const headerHeight = '64px';

  const goToPerfil = () => {
    navigate("/perfil");
    onClose(); 
  };

  const goToMeusServicos = () => {
    navigate("/meus-servicos");
    onClose();
  };

  const goToAvaliacoes = () => {
    navigate("/avaliacoes");
    onClose();
  };

  const goToMensagens = () => {
    navigate("/mensagens");
    onClose();
  };

  const goToOfertarServico = () => {
    navigate("/ofertaservico");
    onClose();
  };

  const goToServicosContratados = () => {
    navigate("/servicos-contratados");
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  const goToEntrar = () => {
    navigate("/login"); 
    onClose();
  };

  const userMenuItems = [
    { text: "Perfil", action: goToPerfil },
    { text: "Meus Serviços", action: goToMeusServicos },
    { text: "Avaliações", action: goToAvaliacoes },
    { text: "Mensagens", action: goToMensagens },
  ];

  const userMenuItems2 = [
    { text: "Serviços Contratados", action: goToServicosContratados },
    { text: "Sair", action: handleLogout },
  ];

  const guestMenuItems = [
    { text: "Entrar", action: goToEntrar },
  ];

  const themeMenuItems = [
    { text: "Tema Claro/Escuro", action: () => { /* Lógica para trocar tema */ onClose(); } },
  ];

  const DrawerList = (
    <Box
      sx={{ 
        width: 250,
      }}
      role="presentation"
    >
      {user ? (
        <>
          <List>
            {userMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {userMenuItems2.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <List>
            {guestMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {themeMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  ); 

  return (
    <div className="aside-menu">
      <Drawer 
        open={open} 
        onClose={onClose} 
        anchor="right"
        disableScrollLock={true}
        hideBackdrop={false}
        elevation={4}
        PaperProps={{
          sx: {
            top: headerHeight,
            height: 'auto',
            maxHeight: `calc(100vh - ${headerHeight})`,
            overflowY: 'auto',
            borderRadius: '10px',
            position: 'fixed',
          },
        }}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
          disablePortal: false,
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}