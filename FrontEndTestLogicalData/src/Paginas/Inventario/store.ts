
import { create } from "zustand";
import { servicioArticulos } from "./Servicios/servicioArticulos";
import { MArticulo } from "../../Modelos/Articulo/mArticulo";
import { SAgregarArticulo } from "./Solicitudes/sAgregarArticulo";
import { SActualizarArticulo } from "./Solicitudes/sActualizarArticulo";
import * as Textos from "../../Cosntantes/textos";
/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Se definen los atributos de la página de articulos
*/
type PaginaArticuloState = {
    articuloId: number,
    articulos: MArticulo[],
    articulo: MArticulo | null,
    estadoCargaArticulos: "sin-cargar" | "cargando" | "error" | "cargado",
    tipoMensaje: "error" | "correcto" | "alerta",
    modalAgregarEditarAbierto: boolean,
    modalMensajesAbierto: boolean,
    msjModal: string,
    mostrarErrorCampos: boolean,
    nombre: string,
    precio: string,
    codigo: string,
    iva: boolean,
    esEdicion: boolean,
    modalConfirmacionAbierto: boolean,
    articuloActivo: boolean,
    numeroArticulo: string,
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Se define las acciones de la página de articulos.
*/
type PaginaArticuloActions = {

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Se utiliza para obtener un array de Articulos
    */
    listarArticulos: () => Promise<void>,

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Reinicia los estados iniciales de los atributos del componente
    */
    reiniciarEstado: () => void

    /**
     * Autor: Jirgort McCarty V
     * Fecha: 20/09/2024
     * Descripción: Establece el valor del atributo establecerModalMensajesAbierto
     * @param valor Valor por el cual se va establecer el atributo establecerModalMensajesAbierto
    */
    establecerModalMensajesAbierto: (valor: boolean) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece si se debe mostrar el modal modalAgregarEditarAbierto.
     * @param valor El valor por asignar a la propiedad.
    */
    establecerModalAgregarEditarAbierto: (valor: boolean) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de actualizar un articulo al sistema.
    */
    actualizarArticulo: () => Promise<void>

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el nombre del articulo.
     * @param valor El valor por asignar a la propiedad articulo.
   */
    establecerNombre: (valor: string) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el código del articulo.
     * @param valor El valor por asignar a la propiedad código.
    */
    establecerCodigo: (valor: string) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el IVA de articulo.
     * @param valor El valor por asignar a la propiedad IVA.
    */
    establecerIVA: (valor: boolean) => void

    /**
     * Autor: Jirgort McCarty V
     * Fecha: 20/09/2024
     * Descripción: Establece el número de articulo
     * @param valor Valor por el cual se va establecer el atributo numeroArticulo
    */
    establecerNumeroArticulo: (valor: string) => void,

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el precio de articulo.
     * @param valor El valor por asignar a la propiedad precio.
    */
    establecerPrecio: (valor: string) => void

    /**
     * Autor: Jirgort McCarty V
     * Fecha: 20/09/2024
     * Descripción: Establece el valor del atributo articuloActivo
     * @param valor Valor por el cual se va establecer el atributo articuloActivo
    */
    establecerArticuloActivo: (valor: boolean) => void,

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Actualiza las acciones que se estan ejecutando en el sistema
     * @param accion La accion del evento.
     * @param articulo La información de la fila de una tabla.
    */
    establecerAgregarEditar: (accion: string, articulo?: MArticulo) => void;

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de guardar un articulo al sistema.
    */
    guardarArticulo: () => Promise<void>;

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de eliminar un articulo del sistema.
     * @param id El identificador del articulo a borrar
     */
    borrarArticulo: (id: number) => Promise<void>;

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de agregar un articulo al sistema.
    */
    agregarArticulo: () => Promise<void>

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece un modal de confirmación
     * @param valor El valor por asignar a la propiedad.
     * @param articulo La información de la fila selecionanda en la tabla
    */
    establecerModalConfirmacionAbierto: (valor: boolean, articulo?: MArticulo) => void
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Define el estado inicial de la página.
*/
const estadoInicial: PaginaArticuloState = {
    articuloId: 0,
    articulos: [],
    articulo: null,
    modalMensajesAbierto: false,
    estadoCargaArticulos: "sin-cargar",
    tipoMensaje: "alerta",
    modalAgregarEditarAbierto: false,
    mostrarErrorCampos: false,
    msjModal: '',
    nombre: "",
    precio: "0",
    codigo: "",
    iva: false,
    esEdicion: false,
    modalConfirmacionAbierto: false,
    articuloActivo: true,
    numeroArticulo: '0',
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Objeto constante que define los atributos y acciones de la página de Articulo.
*/
export const usePaginaArticulos = create<PaginaArticuloState & PaginaArticuloActions>((set, get) => ({
    ...estadoInicial,

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Se utiliza para obtener un array de Articulos
    */
    listarArticulos: async () => {
        set({ estadoCargaArticulos: "cargando" });
        const respuesta = await servicioArticulos.listarArticulos();

        if (respuesta.respuestaExitosa) {

            set({ articulos: respuesta.dato, estadoCargaArticulos: "cargado" });

        } else {
            set({ estadoCargaArticulos: "error", msjModal: respuesta.mensaje, modalMensajesAbierto: true, tipoMensaje: "error" })
        }
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de agregar un articulo al sistema.
    */
    agregarArticulo: async () => {
        const { codigo, nombre, precio, iva,estadoCargaArticulos, articulos } = get();
       
        if(estadoCargaArticulos !== "cargando"){

            if (codigo.trim() === '' || nombre.trim() === '' || precio.toString().trim() === '0') {
                set({ mostrarErrorCampos: true })
            } else {
                const solicitud: SAgregarArticulo = {
                    codigo: codigo.trim(),
                    nombre: nombre.trim(),
                    precio: precio.trim(),
                    iva:iva,
                }
                set({ estadoCargaArticulos: "cargando" });
                const respuesta = await servicioArticulos.agregarArticulo(solicitud);
                if (respuesta.respuestaExitosa) {
                    const articulosActualizados = respuesta.dato ? [...articulos, respuesta.dato] : articulos;
                    set({
                        modalAgregarEditarAbierto: false,
                        articulos: articulosActualizados,
                        tipoMensaje: "correcto",
                        msjModal: Textos.ARTICULO_AGREGADO_CORRECTAMENTE,
                        modalMensajesAbierto: true,
                        estadoCargaArticulos: "sin-cargar",
                        mostrarErrorCampos: false,
                        codigo: '',
                        nombre: '',
                        precio: precio.trim(),
                        iva: false,
                      
                    })
                } else {
                    set({
                        modalAgregarEditarAbierto: true,
                        msjModal: respuesta.mensaje,
                        tipoMensaje: "error",
                        modalMensajesAbierto: true,
                        estadoCargaArticulos: "sin-cargar",
                    });
                }
            }
        }
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de actualizar un articulo al sistema.
    */
    actualizarArticulo: async () => {
        const { articuloId,  codigo, nombre, precio, iva, articulos, estadoCargaArticulos } = get();

        if(estadoCargaArticulos !== "cargando"){

            if (codigo.trim() === '' || nombre.trim() === '' ||  precio.toString().trim() === '0') {
                set({ mostrarErrorCampos: true });
            } else {
                const solicitud: SActualizarArticulo = {
                    articuloId:articuloId,
                    codigo: codigo.trim(),
                    nombre: nombre.trim(),
                    precio: precio,
                    iva: iva,
                }
                set({estadoCargaArticulos: "cargando"})
                const respuesta = await servicioArticulos.actualizarArticulo(solicitud);
                
                if (respuesta.respuestaExitosa) {
                    const indiceArticulo = articulos.findIndex(dep => dep.id === articuloId);
                    articulos[indiceArticulo].codigo = codigo.trim();
                    articulos[indiceArticulo].nombre = nombre.trim();
                    articulos[indiceArticulo].precio = precio;
                    articulos[indiceArticulo].iva = iva;

                    set({
                        modalAgregarEditarAbierto: false,
                        articulos: articulos,
                        tipoMensaje: "correcto",
                        msjModal: Textos.ARTICULO_EDITADO_CORRECTAMENTE,
                        modalMensajesAbierto: true,
                        estadoCargaArticulos: "sin-cargar",
                        mostrarErrorCampos: false,
                        codigo: '',
                        nombre: '',
                        precio: '0',
                        iva: false,
                    })
                } else {
                    set({
                        modalAgregarEditarAbierto: true,
                        msjModal: respuesta.mensaje,
                        tipoMensaje: "error",
                        modalMensajesAbierto: true,
                        estadoCargaArticulos: "sin-cargar"
                    });
                }

            }
        }

    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de eliminar un articulo del sistema.
     * @param id El identificador del articulo a borrar
    */
    borrarArticulo: async (id: number) => {
        const { articulos, estadoCargaArticulos } = get();

        if(estadoCargaArticulos !== "cargando"){

            set({ estadoCargaArticulos: "cargando" });
            const respuesta = await servicioArticulos.borrarArticulo(id);
           
            if (respuesta.respuestaExitosa) {
                const articulosActualizados = articulos.filter(ser => ser.id !== id);

                set({ articulos: articulosActualizados,
                    modalConfirmacionAbierto: false,
                    tipoMensaje: "correcto",
                    estadoCargaArticulos: "sin-cargar",
                    msjModal: Textos.ARTICULO_ELIMINADO_CORRECTAMENTE, 
                    modalMensajesAbierto: true })
            } else {
                set({ tipoMensaje: "error", 
                estadoCargaArticulos: "sin-cargar",
                msjModal: respuesta.mensaje, 
                modalMensajesAbierto: true,
                modalConfirmacionAbierto:false
            
            })
            }
        }
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Reinicia los estados iniciales de los atributos del componente
    */
    reiniciarEstado: () => {
        set(estadoInicial);
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el nombre del articulo.
     * @param valor El valor por asignar a la propiedad nombre.
    */
    establecerNombre: (valor: string) => {
        set({ nombre: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el código del articulo.
     * @param valor El valor por asignar a la propiedad descripción.
    */
    establecerCodigo: (valor: string) => {
        set({ codigo: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el precio de articulo.
     * @param valor El valor por asignar a la propiedad precio.
    */
    establecerPrecio: (valor: string) => {
        set({ precio: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el IVA del articulo.
     * @param valor El valor por asignar a la propiedad IVA.
    */
    establecerIVA: (valor: boolean) => {
        set({ iva: valor });

    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el número de articulo
     * @param valor Valor por el cual se va establecer el atributo numeroArticulo
    */
    establecerNumeroArticulo: (valor: string) => {
        set({ numeroArticulo: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Actualiza las acciones que se estan ejecutando en el sistema
     * @param accion La accion del evento.
     * @param articulo La información de la fila de una tabla.
    */
    establecerAgregarEditar: (accion: string, articulo?: MArticulo) => {
        console.log("mi ar",articulo)
        switch (accion) {
            case Textos.EDITAR:
                set({
                    esEdicion: true,
                    modalAgregarEditarAbierto: true,
                    codigo: articulo?.codigo,
                    nombre: articulo?.nombre,
                    precio: articulo?.precio,
                    iva: articulo?.iva,
                    articuloId: articulo?.id,
                });
                break;

            case Textos.AGREGAR:
                set({ esEdicion: false, modalAgregarEditarAbierto: true });
                break;

            case Textos.CANCELAR:
                set({
                    esEdicion: false,
                    modalAgregarEditarAbierto: false,
                    mostrarErrorCampos: false,
                    codigo: '',
                    nombre: '',
                    precio: '0',
                    iva: false,
                    articuloId: 0,
                });
                break;

            default:
                break;
        }
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de guardar un articulo al sistema.
    */
    guardarArticulo: async () => {
        if (get().esEdicion) {
            await get().actualizarArticulo();
        } else {
            await get().agregarArticulo();
        }
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción:Establece si se debe mostrar el modal modalAgregarEditarAbierto.
     * @param valor El valor por asignar a la propiedad.
    */
    establecerModalAgregarEditarAbierto: (valor: boolean) => {
        set({ modalAgregarEditarAbierto: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el valor del atributo establecerModalMensajesAbierto
     * @param valor Valor por el cual se va establecer el atributo establecerModalMensajesAbierto
    */
    establecerModalMensajesAbierto: (valor: boolean) => {
        set({ modalMensajesAbierto: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el valor del atributo articuloActivo
     * @param valor Valor por el cual se va establecer el atributo articuloActivo
    */
    establecerArticuloActivo: (valor: boolean) => {
        set({ articuloActivo: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece un modal de confirmación
     * @param valor El valor por asignar a la propiedad.
     * @param articulo La información de la fila selecionanda en la tabla
    */
    establecerModalConfirmacionAbierto: (valor: boolean, articulo?: MArticulo) => {

        if (articulo && articulo.id) {
            set({ articuloId: articulo.id });
        }
        set({ modalConfirmacionAbierto: valor });
    },
}

));
