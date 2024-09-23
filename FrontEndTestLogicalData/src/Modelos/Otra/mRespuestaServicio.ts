/**
 * Autor: Jirgort McCarty V
 * Fecha: 21/09/2024
 * Descripción: Clase que encapsula la respuesta del servicio.
 */
export class MRespuestaServicio<T> {
  respuestaExitosa: boolean = false;
  mensaje: string = "";
  dato?: T;
}