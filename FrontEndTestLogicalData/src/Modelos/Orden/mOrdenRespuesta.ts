import { MOrden } from "./mOrden";

/**
 * Autor: Jirgort McCarty V
 * Fecha: 21/09/2024
 * Descripción: Interface que encapsula la respuesta de ordenes de la API.
 */
export interface MOrdenRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MOrden;
}