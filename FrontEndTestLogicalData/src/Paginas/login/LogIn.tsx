import { useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { SSesion } from './Solicitudes/sSesion';
import { useLoginStore } from './store';
import { useNavigate } from 'react-router-dom';


/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 21/09/2024
 * Descripción: Componente que construye la página de LogIn
 * @returns Retorna la página que gestiona el login
*/
export const LoginPage = () => {
  const {
    nombreUsuario,
    contraseniaUsuario,
    estadoAutenticacion,
    mensajeError,
    establecerUsuario,
    establecerContrasena,
    iniciarSesion
  } = useLoginStore();

  const autenticarUsuario = () => {
    const credenciales: SSesion = {
      username: nombreUsuario,
      contrasenia: contraseniaUsuario,
    };
    iniciarSesion(credenciales);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (estadoAutenticacion === 'autenticado') {
      window.location.href = '/inventario';
      window.location.reload();
    }
  }, [estadoAutenticacion]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '89vh',
        width: '95vw',
        position: 'relative',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          maxWidth: 400,
          width: '100%',
          borderRadius: '0px',
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Iniciar Sesión
        </Typography>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombreUsuario}
          onChange={(e) => establecerUsuario(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={contraseniaUsuario}
          onChange={(e) => establecerContrasena(e.target.value)}
        />
        {estadoAutenticacion === 'autenticando' ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={autenticarUsuario}
            sx={{ mt: 2 }}
          >
            Iniciar Sesión
          </Button>
        )}
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/registro')}
          sx={{
            marginTop: 2,
            marginLeft: 35
          }}
        >
          Registrar
        </Button>
        {estadoAutenticacion === 'error' && (
          <Typography color="error" sx={{ mt: 2 }} textAlign="center">
            Error: {mensajeError}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
