/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface que almacena la respuesta de articulos de la API.
 */
import { MRegistroUsuario } from "./mRegistroUsuario";

export interface MRegistroUsuarioRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MRegistroUsuario[];
}