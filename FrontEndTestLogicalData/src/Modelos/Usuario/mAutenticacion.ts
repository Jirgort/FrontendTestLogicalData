import { MUsuarioToken } from "./mUsuarioToken";

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface del modelo de MAutenticacionRespuesta.
 */
export interface MAutenticacionRespuesta {
  estadoRespuesta: number,
  mensaje: string,
  dato: MUsuarioToken
}