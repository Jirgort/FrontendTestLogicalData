/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface que almacena la respuesta de articulos de la API.
 */
import { MArticulo } from "./mArticulo";

export interface MArticuloRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MArticulo[];
}