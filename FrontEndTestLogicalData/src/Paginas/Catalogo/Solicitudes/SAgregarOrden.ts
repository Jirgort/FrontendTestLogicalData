
import { SItem } from "./SItem";
import { SOrden } from "./SOrden";


/**
 * Autor: Jirgot McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface del modelo de solicitud para agregar una orden.
 */
export interface SAgregarOrden {
  orden: SOrden,
  items: SItem[]
}