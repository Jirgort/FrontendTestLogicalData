/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface del modelo de Item.
 */
export interface MItem {
    id: number,
    ordenId: number,
    productoId: number,
    cantidad: number,
    precio: number,
    total: number,
  }