import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePaginaRegistros } from './store';
import { ModalAlerta } from '../../Componentes/Modales/Modales';

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 21/09/2024
 * Descripción: Componente que construye la página de RegistrarUsuario
 * @returns Retorna la página que gestiona el RegistrarUsuario
*/
const RegistrarUsuario = () => {
    const {
        nombre,
        apellido,
        username,
        contrasenia,
        modalMensajesAbierto,
        tipoMensaje,
        msjModal,
        establecerNombre,
        establecerUsername,
        establecerApellido,
        establecerContrasenia,
        guardarUsuario,
        establecerModalMensajesAbierto
    } = usePaginaRegistros();
    const [loading,] = useState(false);
    const [error,] = useState('')


    const navigate = useNavigate();
    const handleCloseModal = () => {
        establecerModalMensajesAbierto(false);
        navigate('/login');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '89vh',
                width: '95vw',
                backgroundImage: `url('./assets/bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
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
                    Registrarse
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nombre}
                    onChange={(e) => establecerNombre(e.target.value)}
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={apellido}
                    onChange={(e) => establecerApellido(e.target.value)}
                />
                <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => establecerUsername(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contrasenia}
                    onChange={(e) => establecerContrasenia(e.target.value)}
                />
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={guardarUsuario}
                        sx={{ mt: 2 }}
                    >
                        Registrarse
                    </Button>
                )}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }} textAlign="center">
                        {error}
                    </Typography>
                )}
            </Paper>
            <ModalAlerta
                abierto={modalMensajesAbierto}
                tipo={tipoMensaje}
                mensaje={msjModal}
                onClose={() => handleCloseModal()} />
        </Box>
    );
};

export default RegistrarUsuario;
