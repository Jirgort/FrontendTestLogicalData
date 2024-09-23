import { Usuario } from "./mUsuario";

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface del modelo de la autenticacion.
 */
export interface MUsuarioToken {
  usuario: Usuario,
  token: string,
}