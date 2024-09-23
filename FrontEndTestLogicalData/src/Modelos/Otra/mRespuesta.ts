/**
 * Autor: Jirgort McCarty V
 * Fecha: 21/09/2024
 * Descripción: Clase que encapsula la respuesta de la API.
 */
export class MRespuesta<T> {
    respuestaExitosa: boolean = false;
    mensaje: string = "";
    dato?: T;
  }