import { Avatar, Box, DialogContent, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as Iconos from '@mui/icons-material';
import { BotonPrimario, BotonSecundario } from "../UI/botones/Botones";
import * as Textos from "../../Cosntantes/textos";

interface ModalConfirmacionProps {
    abierto: boolean,
    titulo?: string,
    mensaje?: string,
    textoBotonConfirmar?: string,
    textoBotonCancelar?: string,
    onConfirmacion: () => void,
    onCancelacion: () => void
}

export const ModalConfirmacion = (props: ModalConfirmacionProps) => {

    let titulo: string = Textos.CONFIRMAR;
    let mensaje: string = Textos.CONFIRME_DESEA_REALIZAR_ACCION;

    if (props.titulo) {
        titulo = props.titulo;
    }

    if (props.mensaje) {
        mensaje = props.mensaje;
    }

    return (
        <Dialog open={props.abierto} maxWidth="md">
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2
                    }}>
                    <Avatar sx={{ m: 1, mb: 2, bgcolor: "blue" }}>
                        <Iconos.QuestionMark />
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        {titulo}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {mensaje}
                    </Typography>
                    <Grid container spacing={2} justifyContent={"center"}>
                        <Grid item>
                            <BotonSecundario texto={props.textoBotonCancelar ? props.textoBotonCancelar : Textos.CANCELAR} style={{marginTop: 20}} onClick={props.onCancelacion} />
                        </Grid>
                        <Grid item>
                            <BotonPrimario texto={props.textoBotonConfirmar ? props.textoBotonConfirmar : Textos.CONFIRMAR} style={{marginTop: 20}} onClick={props.onConfirmacion} />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}



interface ModalAlertaProps {
    abierto: boolean,
    tipo: "correcto" | "alerta" | "error",
    titulo?: string,
    mensaje?: string,
    textoBoton?: string,
    onClose: () => void
}

export const ModalAlerta = (props: ModalAlertaProps) => {

    let colorIcono: String;
    let icono: JSX.Element;
    let titulo: string;
    let mensaje: string;

    switch (props.tipo) {
        case "correcto":
            colorIcono = "green";
            icono = <Iconos.CheckCircle></Iconos.CheckCircle>;
            titulo = Textos.CORRECTO;
            mensaje = Textos.COMPLETO_ACCION_FORMA_CORRECTA;
            break;
        case "alerta":
            colorIcono = "blue";
            icono = <Iconos.Error></Iconos.Error>;
            titulo = Textos.ALERTA;
            mensaje = Textos.ALERTA;
            break;
        case "error":
            colorIcono = "red";
            icono = <Iconos.Cancel></Iconos.Cancel>;
            titulo = Textos.ERROR;
            mensaje = Textos.OCURRIO_ERROR_EJECUTAR_ACCION;
            break;
    };

    if (props.titulo) {
        titulo = props.titulo;
    }

    if (props.mensaje) {
        mensaje = props.mensaje;
    }

    return (
        <Dialog open={props.abierto} maxWidth="md" onClose={props.onClose}>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2
                    }}>
                    <Avatar sx={{ m: 1, mb: 2, bgcolor: colorIcono.toString() }}>
                        {icono}
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        {titulo}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {mensaje}
                    </Typography>
                    <BotonPrimario texto={props.textoBoton ? props.textoBoton : Textos.ACEPTAR} style={{marginTop: 20}} onClick={props.onClose} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}