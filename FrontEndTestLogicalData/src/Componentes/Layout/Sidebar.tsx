import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, Toolbar, Box, ListItemButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.jpg';

const drawerWidth = 240;

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: sidebar estándar para mostrar información e interactuar con las rutas.
 * @returns El componente de la tabla con sus herramientas.
 */
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, #0D47A1, #64B5F6)', 
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 150,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius:"43px",
          }}
          alt="Logo"
          src={logo}
        />
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemButton component={Link} to="/inventario">
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Inventario" sx={{ color: '#fff' }} />
          </ListItemButton>
         
          <ListItemButton component={Link} to="/catalogo">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Catálogo" sx={{ color: '#fff' }} />
          </ListItemButton>

          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" sx={{ color: '#fff' }} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
