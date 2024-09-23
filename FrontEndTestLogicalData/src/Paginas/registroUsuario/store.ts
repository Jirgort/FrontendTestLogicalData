
import { create } from "zustand";
import { servicioRegistrar } from "./Servicios/servicioRegistrar";
import { SRegistrarUsuario } from "./Solicitudes/sRegistrarUsuario";
import * as Textos from "../../Cosntantes/textos";
import { MRegistroUsuario } from "../../Modelos/Usuario/mRegistroUsuario";
/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Se definen los atributos de la página de registro de usuario
*/
type PaginaRegistroState = {
    estadoCargaRegistros: "sin-cargar" | "cargando" | "error" | "cargado",
    tipoMensaje: "error" | "correcto" | "alerta",
    modalAgregarEditarAbierto: boolean,
    modalMensajesAbierto: boolean,
    msjModal: string,
    mostrarErrorCampos: boolean,
    nombre: string,
    apellido: string,
    username: string,
    contrasenia: string,
    modalConfirmacionAbierto: boolean,
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Se define las acciones de la página de registro de usuario.
*/
type PaginaRegistroActions = {

   
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
     * Descripción: Establece el nombre del usuario.
     * @param valor El valor por asignar a la propiedad usuario.
   */
    establecerNombre: (valor: string) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el apellido del usuario.
     * @param valor El valor por asignar a la propiedad apellido.
    */
    establecerApellido: (valor: string) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el contrasenia de usuario.
     * @param valor El valor por asignar a la propiedad contrasenia.
    */
    establecerContrasenia: (valor: string) => void

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el username de usuario.
     * @param valor El valor por asignar a la propiedad username.
    */
    establecerUsername: (valor: string) => void


    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de agregar un usuario al sistema.
    */
    guardarUsuario: () => Promise<void>

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece un modal de confirmación
     * @param valor El valor por asignar a la propiedad.
     * @param usuario La información de la fila selecionanda en la tabla
    */
    establecerModalConfirmacionAbierto: (valor: boolean, usuario?: MRegistroUsuario) => void
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Define el estado inicial de la página.
*/
const estadoInicial: PaginaRegistroState = {
    modalMensajesAbierto: false,
    estadoCargaRegistros: "sin-cargar",
    tipoMensaje: "alerta",
    modalAgregarEditarAbierto: false,
    mostrarErrorCampos: false,
    msjModal: '',
    nombre: "",
    apellido: "",
    username: "",
    contrasenia: "",
    modalConfirmacionAbierto: false,
   
}

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 20/09/2024
 * Descripción: Objeto constante que define los atributos y acciones de la página de Registro.
*/
export const usePaginaRegistros = create<PaginaRegistroState & PaginaRegistroActions>((set, get) => ({
    ...estadoInicial,

  

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Ejecuta la acción de agregar un usuario al sistema.
    */
    guardarUsuario: async () => {
        const { apellido, nombre, username, contrasenia,estadoCargaRegistros } = get();
       
        if(estadoCargaRegistros !== "cargando"){

            if (nombre.trim() === '' || nombre.trim() === '' || username.trim() === '') {
                set({ mostrarErrorCampos: true })
            } else {

                const solicitud: SRegistrarUsuario = {
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    username: username.trim(),
                    contrasenia:contrasenia,
                }

                set({ estadoCargaRegistros: "cargando" });

                const respuesta = await servicioRegistrar.agregarUsuario(solicitud);

                if (respuesta.respuestaExitosa) {

                    set({
                        modalAgregarEditarAbierto: false,
                        tipoMensaje: "correcto",
                        msjModal: Textos.Usuario_AGREGADO_CORRECTAMENTE,
                        modalMensajesAbierto: true,
                        estadoCargaRegistros: "sin-cargar",
                        mostrarErrorCampos: false,
                        apellido: '',
                        nombre: '',
                        username: '',
                        contrasenia: '',
                      
                    })
                } else {

                    set({
                        modalAgregarEditarAbierto: true,
                        msjModal: respuesta.mensaje,
                        tipoMensaje: "error",
                        modalMensajesAbierto: true,
                        estadoCargaRegistros: "sin-cargar",
                    });
                }
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
     * Descripción: Establece el nombre del usuario.
     * @param valor El valor por asignar a la propiedad nombre.
    */
    establecerNombre: (valor: string) => {
        set({ nombre: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el apellido del usuario.
     * @param valor El valor por asignar a la propiedad apellido.
    */
    establecerApellido: (valor: string) => {
        set({ apellido: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el username de usuario.
     * @param valor El valor por asignar a la propiedad username.
    */
    establecerUsername: (valor: string) => {
        set({ username: valor });
    },

    /**
     * Autor: Jirgort McCarty Vasquez
     * Fecha: 20/09/2024
     * Descripción: Establece el contrasenia del usuario.
     * @param valor El valor por asignar a la propiedad contrasenia.
    */
    establecerContrasenia: (valor: string) => {
        set({ contrasenia: valor });

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
     * Descripción: Establece un modal de confirmación
     * @param valor El valor por asignar a la propiedad.
     * @param usuario La información de la fila selecionanda en la tabla
    */
    establecerModalConfirmacionAbierto: (valor: boolean) => {

        set({ modalConfirmacionAbierto: valor });
    },
}

));
