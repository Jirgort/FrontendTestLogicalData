import { MArticulo } from "../../Modelos/Articulo/mArticulo";
import { servicioArticulos } from "../Inventario/Servicios/servicioArticulos";
import { create } from "zustand";
import { SOrden } from "../Catalogo/Solicitudes/SOrden";
import { SAgregarOrden } from "../Catalogo/Solicitudes/SAgregarOrden";
import { servicioOrden } from "../Catalogo/servicios/servicioOrden";
import * as Textos from "../../Cosntantes/textos"
import { SItem } from "../Catalogo/Solicitudes/SItem";

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Se definen los atributos de la página de articulos
*/
type PaginaOrdenState = {
  articulos: MArticulo[],
  codigo: string,
  nombre: string,
  mostrarErrorCampos: boolean,
  cantidad: number;
  items: SItem[];
  IVA: number;
  totalFactura: number;
  subTotalFactura: number;
  estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
  orden?: SOrden;
  ordenId: number;
  IVATotal: number,
  fecha: string,
  tipoMensaje: 'error' | 'correcto' | 'alerta';
  msjModal: string;
  modalMensajesAbierto: boolean;
  modalComprobanteAbierto: boolean;
  ordenPDF?: SOrden
}

type PaginaOrdenActions = {

  /**
* Autor: Jirgort McCarty Vasquez
* Fecha: 20/09/2024
* Descripción: Establece un valor a codigo.
* @param valor valor de codigo
*/
  establecerCodigo: (valor: string) => void,

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Reinicia los estados de la vista.
  */
  reiniciarEstado: () => void,

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Obtiene los articulos.
  */
  obtenerArticulos: () => void,

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: establece el nombre del articulo.
  */
  establecerNombre: () => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: establece la cantidad de los articulo.
  */
  establecerCantidad: (valor: number) => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Agrega un item.
 */
  agregarItem: () => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Elimina un item de la orden.
  */
  eliminarItem: (itemId: number) => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor de los productos de la orden.
   * @param productos Valor por el cual se va establecer el atributo ordenItems.
  */
  establecerItems: (productos: SItem[]) => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Agrega una orden.
  */
  agregarOrden: () => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del IVA total de los items.
   * @param items Valor por el cual se va establecer el atributo orderItems.
  */
  calcularIVA: (items: SItem[], productos: MArticulo[]) => number;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del total de la factura.
  */
  establecerTotalFactura: () => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del modal abierto.
   * @param valor Valor por el cual se va establecer el atributo modalMensajesAbierto.
  */
  establecerModalMensajesAbierto: (valor: boolean) => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del modal de comprobante.
   * @param valor Valor por el cual se va establecer el atributo modalComprobanteAbierto.
  */
  establecerModalComprobante: (valor: boolean) => void;

}

const estadoInicial: PaginaOrdenState = {
  estadoCargando: 'sin-cargar',
  articulos: [],
  codigo: "",
  nombre: "",
  mostrarErrorCampos: false,
  cantidad: 0,
  items: [],
  IVA: 0.13,
  totalFactura: 0,
  subTotalFactura: 0,
  ordenId: 0,
  IVATotal: 0,
  fecha: '',
  tipoMensaje: 'alerta',
  msjModal: '',
  modalMensajesAbierto: false,
  modalComprobanteAbierto: false,
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Define el store de la página de Ordenes.
 */
export const useOrdenes = create<PaginaOrdenState & PaginaOrdenActions>((set, get) => ({
  ...estadoInicial,

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: establece el nombre del articulo.
  */
  establecerNombre: () => {
    const { articulos, codigo } = get();

    let articulo = articulos.find((prod) => prod.codigo === codigo);
    set({ nombre: articulo?.nombre });
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece un valor a codigo.
   * @param valor valor del codigo del articulo.
  */
  establecerCodigo: (valor: string) => {

    const { establecerNombre } = get();

    set({ codigo: valor });
    establecerNombre();
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: establece la cantidad de los articulo.
  */
  establecerCantidad: (valor: number) => {
    set({ cantidad: valor });
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Reinicia los estados de la vista.
  */
  reiniciarEstado: () => {
    set(estadoInicial);
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Obtiene los articulos.
  */
  obtenerArticulos: async () => {

    const respuesta = await servicioArticulos.listarArticulos();

    if (respuesta.respuestaExitosa) {
      set({
        articulos: respuesta.dato,

      });
    }
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Agrega un item.
  */
  agregarItem: () => {
    const { items, articulos, cantidad, codigo, establecerItems, establecerTotalFactura } = get();
    let articulo = articulos.find((prod) => prod.codigo === codigo);

    if (articulo) {
      let item: SItem = {
        cantidad: cantidad,
        articuloId: articulo.id,
        precio: parseInt(articulo?.precio),
      };

      if (items.find((prod) => prod.articuloId === articulo?.id)) {
        const nuevosItems = items.filter(
          (producto) => producto.articuloId !== articulo?.id
        );
        const itemsActualizados = [...nuevosItems, item];

        establecerItems(itemsActualizados);
      } else {

        const itemsActualizados = [...items, item];
        establecerItems(itemsActualizados);
      }
    }

    establecerTotalFactura();
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Elimina un item de la orden.
  */
  eliminarItem: (itemId: number) => {
    const { items, establecerItems, establecerTotalFactura } = get();
    const nuevosItems = items.filter((item) => item.articuloId !== itemId);

    establecerItems(nuevosItems);
    establecerTotalFactura();
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor de los productos de la orden.
   * @param items Valor por el cual se va establecer el atributo ordenItems.
  */
  establecerItems: (items: SItem[]) => {
    set({ items: items });
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del total de la factura.
  */
  establecerTotalFactura: () => {
    const { items, IVA, articulos } = get();
    let total = 0;
    let subTotal = 0;
    items.forEach((item) => {
      let producto = articulos.find(
        (prod) => prod.id === item.articuloId
      );

      subTotal += item.precio * item.cantidad;
      
      if (producto?.iva) {

        let itemIva = item.precio * item.cantidad * IVA;
        total += item.precio * item.cantidad + itemIva;

      } else {

        total += item.precio * item.cantidad;

      }
    });

    set({ totalFactura: total, subTotalFactura: subTotal });
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Agrega una orden.
  */
  agregarOrden: async () => {
    const { items, articulos, totalFactura, calcularIVA } = get();
    const fechaActual: Date = new Date();
    const fechaString = fechaActual.toISOString()
    let orden: SOrden = {
      usuarioId: Number(localStorage.getItem('id')),
      fecha: new Date(fechaString),
      total: totalFactura,
    };

    let solicitud: SAgregarOrden = {
      orden: orden,
      items: items,
    };



    set({ estadoCargando: 'cargando', ordenPDF: orden });
    const respuesta = await servicioOrden.agregarOrden(solicitud);

    var ivatotal = calcularIVA(items, articulos)

    if (respuesta.respuestaExitosa) {
      set({
        orden: respuesta.dato,
        ordenId: respuesta.dato?.id,
        IVATotal: ivatotal,
        fecha: fechaActual.toDateString(),
        estadoCargando: 'cargado',
        tipoMensaje: 'correcto',
        msjModal: Textos.EXITO_AGREGANDO_ORDEN,
        modalMensajesAbierto: true,
      });

    } else {
      set({ estadoCargando: 'error', modalMensajesAbierto: true, tipoMensaje: 'error', msjModal: Textos.ERROR_AGREGAR_ORDEN, });
    }
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del IVA total de los items.
   * @param items Valor por el cual se va establecer el atributo orderItems.
  */
  calcularIVA(items: SItem[], productos: MArticulo[]): number {
    let totalIVA = 0;

    items.forEach((item) => {
      const producto = productos.find((prod) => prod.id === item.articuloId);
      if (producto) {
        const subtotal = item.cantidad * item.precio;
        totalIVA += subtotal * 0.13;
      }
    });

    return totalIVA;
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del modal abierto.
   * @param valor Valor por el cual se va establecer el atributo modalMensajesAbierto.
  */
  establecerModalMensajesAbierto: (valor: boolean) => {
    set({ modalMensajesAbierto: valor });

    if (!valor) {
      set({ modalComprobanteAbierto: true })
    }
  },
  
  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Establece el valor del modal de comprobante.
   * @param valor Valor por el cual se va establecer el atributo modalComprobanteAbierto.
  */
  establecerModalComprobante: (valor: boolean) => {
    const { reiniciarEstado } = get();
    set({ modalComprobanteAbierto: valor })

    if (!valor) {
      set({ reiniciarEstado })
    }
  },

}));
