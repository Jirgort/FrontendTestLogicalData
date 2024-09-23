import axios from 'axios';
import { MRespuesta } from '../../../Modelos/Otra/mRespuesta';
import { SRegistrarUsuario } from '../Solicitudes/sRegistrarUsuario';
import { MRegistroUsuario } from '../../../Modelos/Usuario/mRegistroUsuario';
import * as ManejadorErrores from "../../../Utilidades/manejadorErrores";
import { MRegistroUsuarioRespuesta } from "../../../Modelos/Usuario/mRegistroUsuarioRespuesta";
import * as Textos from "../../../Cosntantes/textos";

const API_PORT_BACKEND_LOGICAL_DATA = import.meta.env.VITE_API_PORT_BACKEND;
const END_POINT_BACKEND: string = `http://localhost:${API_PORT_BACKEND_LOGICAL_DATA}/api/Usuario/`;

export const servicioRegistrar = {

   /**
   * Autor: Jirgort McCarty V
   * Fecha: 19/06/2024
   * Descripción: Agrega un usuario.
   * @returns El usuario registrado
   */
    agregarUsuario: async (solicitud: SRegistrarUsuario) => {
        let respuestaFinal: MRespuesta<MRegistroUsuario> = new MRespuesta<MRegistroUsuario>();
        try {
            const respuesta : any = await axios.post<MRegistroUsuarioRespuesta>(
                `${END_POINT_BACKEND}RegistrarUsuario`, solicitud
                

            )
            respuestaFinal.dato = respuesta.data.dato;
            respuestaFinal.respuestaExitosa = true;

        } catch (error: any) {

            if (ManejadorErrores.esErrorAxiosConMensaje(error)) {
                respuestaFinal.mensaje = error.response.data;
            } else {
                respuestaFinal.mensaje = Textos.ERROR_AGREGAR_USUARIO;

            }
            respuestaFinal.respuestaExitosa = false;
        }

        return respuestaFinal;

    },
};
