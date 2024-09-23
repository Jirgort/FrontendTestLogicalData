import { MItem } from "./Articulo/mItem";

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface del modelo de Order.
 */
export interface MOrden {
  orden: number;
  usuarioId: number,
  id: number;
  fecha: Date;
  total: number;
  items: MItem[];
}