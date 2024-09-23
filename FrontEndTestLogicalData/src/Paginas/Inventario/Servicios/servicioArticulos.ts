import { MRespuestaServicio } from "../../../Modelos/Otra/mRespuestaServicio";
import { MArticulo } from "../../../Modelos/Articulo/mArticulo";
import * as Textos from "../../../Cosntantes/textos";
import { SAgregarArticulo } from "../Solicitudes/sAgregarArticulo";
import { SActualizarArticulo } from "../Solicitudes/sActualizarArticulo";
import * as ManejadorErrores from "../../../Utilidades/manejadorErrores";
import axios from "axios";
import { MArticuloRespuesta } from "../../../Modelos/Articulo/mArticuloRespuesta";
import { MRespuesta } from "../../../Modelos/Otra/mRespuesta";

const API_PORT_BACKEND = import.meta.env.VITE_API_PORT_BACKEND;
const END_POINT_BACKEND: string = `http://localhost:${API_PORT_BACKEND}/api/Articulo/`;
const TOKEN = localStorage.getItem('token');

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Servicio encargado de obtener los Articulos del servidor.
 */
export const servicioArticulos = {

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Lista los Articulos en el API del sistema.
     * @returns Retorna el arreglo de Articulos obtenido.
     */
    listarArticulos: async () => {

        let respuestaFinal: MRespuesta<MArticulo[]> = new MRespuesta<MArticulo[]>();

        try {
            await axios.get<MArticuloRespuesta>(
                `${END_POINT_BACKEND}ListarArticulos`,{ headers:{Authorization: `Bearer ${TOKEN}`},
            })
            .then((res)=>{
                respuestaFinal.dato =res.data.dato;
                respuestaFinal.respuestaExitosa = true;
            })
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                respuestaFinal.mensaje = Textos.ERROR_OBTENIENDO_ARTICULOS;

            }
            respuestaFinal.respuestaExitosa = false;

        }

        return respuestaFinal;
    },

    /**
    * Autor: Jirgort McCarty Vasquez
    * Fecha: 20/09/2024
    * Descripción:Actualiza un articulo
    * @param solicitud Solicitud para actualizar el articulo
    * @returns Un booleano indicando si fue exitosa o no la actualización.
    */
    actualizarArticulo: async (solicitud: SActualizarArticulo) => {
        let respuestaFinal: MRespuestaServicio<boolean> = new MRespuestaServicio<boolean>();
        console.log(solicitud)
        try {
             await axios.put<boolean>(
                `${END_POINT_BACKEND}ActualizarArticulo`, solicitud,
                {headers: {Authorization: `Bearer ${TOKEN}` }}

            ).then((res)=>{
                respuestaFinal.dato = res.data;
                respuestaFinal.respuestaExitosa = true;
            })

        } catch (error: any) {

            if (ManejadorErrores.esErrorAxiosConMensaje(error)) {
                respuestaFinal.mensaje = error.response.data;
            } else {
                respuestaFinal.mensaje = Textos.ERROR_ACTUALIZANDO_ARTICULO;
            }
            respuestaFinal.respuestaExitosa = false;
        }

        return respuestaFinal;
    },

    /**
    * Autor: Jirgort McCarty Vasquez
    * Fecha: 20/09/2024
    * Descripción:Agrega un articulo
    * @param solicitud Solicitud para agregar un nuevo articulo
    * @returns Retorna el articulo agregado
    */
    agregarArticulo: async (solicitud: SAgregarArticulo) => {
        let respuestaFinal: MRespuesta<MArticulo> = new MRespuesta<MArticulo>();
        try {
            const respuesta : any = await axios.post<MArticuloRespuesta>(
                `${END_POINT_BACKEND}AgregarArticulo`, solicitud,
                {headers:{Authorization:`Bearer ${TOKEN}` }}

            )
            respuestaFinal.dato = respuesta.data.dato;
            respuestaFinal.respuestaExitosa = true;

        } catch (error: any) {

            if (ManejadorErrores.esErrorAxiosConMensaje(error)) {
                respuestaFinal.mensaje = error.response.data;
            } else {
                respuestaFinal.mensaje = Textos.ERROR_AGREGANDO_ARTICULO;

            }
            respuestaFinal.respuestaExitosa = false;
        }

        return respuestaFinal;

    },

    /**
    * Autor: Jirgort McCarty Vasquez
    * Fecha: 20/09/2024
    * Descripción:Elimina un articulo
    * @param id Identificar de articulo a eliminar
    * @returns Retorna el articulo eliminado
    */
    borrarArticulo: async (id: number) => {
        let respuestaFinal: MRespuestaServicio<MArticulo> = new MRespuestaServicio<MArticulo>();

        try {
             await await axios .delete<MArticulo>(
                `${END_POINT_BACKEND}BorrarArticulo?id=${id}`,
                { headers: { Authorization: `Bearer ${TOKEN}` } }
            ).then((res)=>{
                respuestaFinal.dato =res.data;
                respuestaFinal.respuestaExitosa = true;
            })
           

        } catch (error: any) {

            if (ManejadorErrores.esErrorAxiosConMensaje(error)) {
                respuestaFinal.mensaje = error.response.data;
            } else {

                respuestaFinal.mensaje = Textos.ERROR_BORRANDO_ARTICULO;

            }
            respuestaFinal.respuestaExitosa = false;
        }

        return respuestaFinal;

    }

}