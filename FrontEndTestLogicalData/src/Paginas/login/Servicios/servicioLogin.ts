import axios from 'axios';
import { MRespuesta } from '../../../Modelos/Otra/mRespuesta';
import { Usuario } from '../../../Modelos/Usuario/mUsuario';
import { MAutenticacionRespuesta } from '../../../Modelos/Usuario/mAutenticacion';
import { SSesion } from '../Solicitudes/sSesion';

const API_PORT_BACKEND_LOGICAL_DATA = import.meta.env.VITE_API_PORT_BACKEND;
const END_POINT_BACKEND: string = `http://localhost:${API_PORT_BACKEND_LOGICAL_DATA}/api/Usuario/`;

export const servicioLogIn = {

    /**
   * Autor: Jirgort McCarty V
   * Fecha: 19/06/2024
   * Descripción: Autentica un usuario.
   * @returns El usuario autenticado y un token JWT.
   */
  autenticarUsuario: async (credenciales: SSesion) => {
    let respuestaFinal: MRespuesta<Usuario> = new MRespuesta<Usuario>();
    
    try {
        await axios
        .post<MAutenticacionRespuesta>(`${END_POINT_BACKEND}AutenticarUsuario`, credenciales)
        .then((res) => {
          respuestaFinal.dato = res.data.dato.usuario;
          respuestaFinal.respuestaExitosa = true;

          localStorage.setItem('token', res.data.dato.token);
          localStorage.setItem('id', res.data.dato.usuario.id.toString());
          localStorage.setItem('username', res.data.dato.usuario.username);
          localStorage.setItem('nombre', res.data.dato.usuario.nombre);
          localStorage.setItem('apellido', res.data.dato.usuario.apellido);
          
        });

    } catch (error: any) {
      respuestaFinal.mensaje = error;
      respuestaFinal.respuestaExitosa = false;
    }

    return respuestaFinal;
  },
};
