import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Adicionar imports para ícones se necessário no futuro
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import MailIcon from '@mui/icons-material/Mail';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import LoginIcon from '@mui/icons-material/Login';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function AsideMenu({ open, onClose, user }) {

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      {user ? (
        // Conteúdo para usuário logado
        <>
          <List>
            {['Perfil', 'Avaliações', 'Mensagens'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  {/* Adicionar ícone aqui se desejar, ex: <ListItemIcon>{index === 0 ? <AccountCircleIcon /> : index === 1 ? <AssessmentIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Sair'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  {/* Adicionar ícone aqui se desejar, ex: <ListItemIcon><ExitToAppIcon /></ListItemIcon> */}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        // Conteúdo para usuário não logado
        <>
          <List>
            {['Entrar'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  {/* Adicionar ícone aqui se desejar, ex: <ListItemIcon><LoginIcon /></ListItemIcon> */}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Tema Claro/Escuro'].map((text, index) => ( // Botão de Tema
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  {/* Adicionar ícone aqui se desejar, ex: <ListItemIcon><Brightness4Icon /></ListItemIcon> ou <Brightness7Icon /> */}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
}