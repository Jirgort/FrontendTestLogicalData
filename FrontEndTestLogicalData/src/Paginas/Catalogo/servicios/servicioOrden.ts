import axios from "axios";
import { MRespuesta } from "../../../Modelos/Otra/mRespuesta";
import * as Textos from '../../../Cosntantes/textos';
import { SOrden } from "../Solicitudes/SOrden";
import { MOrdenRespuesta } from "../../../Modelos/Orden/mOrdenRespuesta";
import { SAgregarOrden } from "../Solicitudes/SAgregarOrden";

const API_PORT_BACKEND= import.meta.env.VITE_API_PORT_BACKEND;
const END_POINT_BACKEND: string = `http://localhost:${API_PORT_BACKEND}/api/Orden/`;
const TOKEN = localStorage.getItem('token');

export const servicioOrden = {

    /**
   * Autor: Jirgort McCarty  V
   * Fecha: 20/09/2024
   * Descripción: Agrega una orden al sistema.
   * @param solicitud modelo de la orden.
   * @returns Retorna la respuesta y la orden agregada, si fue exitoso.
   */
    agregarOrden: async (solicitud: SAgregarOrden) => {
      let respuestaFinal: MRespuesta<SOrden> = new MRespuesta<SOrden>();
  console.log(solicitud)
      try {
        await axios
          .post<MOrdenRespuesta>(`${END_POINT_BACKEND}AgregarOrden`, solicitud, { headers: { Authorization: `Bearer ${TOKEN}` } })
          .then((res) => {

            respuestaFinal.dato = res.data.dato;
            respuestaFinal.respuestaExitosa = true;
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });

      } catch (error: any) {
        respuestaFinal.mensaje = Textos.ERROR_AGREGAR_ORDEN;
        respuestaFinal.respuestaExitosa = false;
      }
  
      return respuestaFinal;
    },

}