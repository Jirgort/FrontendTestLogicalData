/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 21/09/2024
 * Descripción: Modelo que define los datos del articulo.
 */
export interface SActualizarArticulo {
    articuloId:number
    codigo: string,
    nombre: string;
    precio: string;
    iva: boolean;
  }