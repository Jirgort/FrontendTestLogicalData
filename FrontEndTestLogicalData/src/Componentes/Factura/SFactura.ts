/**
 * Autor: Jirgort McCarty V
 * Fecha: 21/09/2024
 * Descripción: Interface del modelo de solicitud de Factura.
 */
export interface SFactura {
    codigo: string;
    nombre: string;
    precio: number;
    iva: number;
    cantidad: number;
    total: number;
  }