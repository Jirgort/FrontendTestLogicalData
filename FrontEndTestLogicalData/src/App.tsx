import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Componentes/Layout/Sidebar';
import { PaginaInventario } from './Paginas/Inventario/Inventario';
import PaginaCatalogo from './Paginas/Catalogo/Catalogo';
import RegistroUsuario from './Paginas/registroUsuario/RegistroUsuario';
import { Box, Toolbar } from '@mui/material';
import { LoginPage } from './Paginas/login/LogIn';
import bgImage from './assets/bg.png';

function App() {
  const TOKEN = localStorage.getItem('token');
  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {
    if (TOKEN && location.pathname === '/login') {
      navigate('/inventario');  
    }
    else if (!TOKEN && location.pathname !== '/login' && location.pathname !== '/registro') {
      navigate('/login');  
    }
  }, [TOKEN, location.pathname, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      {TOKEN && <Sidebar />} 
      <Box
       sx={{ flexGrow: 1, bgcolor: 'rgb(245, 239, 239)', p: 3,backgroundImage: location.pathname === '/login' ||location.pathname === '/registro' ?`url(${bgImage})`: 'none',
       backgroundSize: 'cover', 
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat' }}
      >
        <Toolbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/inventario" element={TOKEN ? <PaginaInventario /> : <Navigate to="/login" />} />
          <Route path="/catalogo" element={TOKEN ? <PaginaCatalogo /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={TOKEN ? "/inventario" : "/login"} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
