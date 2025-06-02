import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "../../services/AuthContext";

// Adicionar imports para ícones se necessário no futuro
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import MailIcon from '@mui/icons-material/Mail';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import LoginIcon from '@mui/icons-material/Login';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function AsideMenu({ open, onClose }) {
  const headerHeight = '64px';
  const { user } = useAuth();

  const DrawerList = (
    <Box
      sx={{ 
        width: 250,
      }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      {user ? (
        <>
          <List>
            {["Perfil", "Meus Serviços", "Avaliações", "Mensagens"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Serviços Contratados", "Sair"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <List>
            {["Entrar"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Tema Claro/Escuro"].map(
              (
                text,
                index
              ) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </>
      )}
    </Box>
  ); 

  return (
    <div>
      <Drawer 
        open={open} 
        onClose={onClose} 
        anchor="right"
        PaperProps={{
          sx: {
            top: headerHeight,
            height: 'auto',
            maxHeight: `calc(100vh - ${headerHeight})`,
            overflowY: 'auto',
          },
        }}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}