/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface del modelo de solicitud de Orden.
 */

export interface SOrden {
    id?: number,
    usuarioId: number,
    fecha: Date,
    total: number
  }