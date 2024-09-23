import { create } from 'zustand';
import { servicioLogIn } from '../login/Servicios/servicioLogin';
import { SSesion } from './Solicitudes/sSesion';
import { Usuario } from '../../Modelos/Usuario/mUsuario';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 19/09/2024
 * Descripción: Define los atributos de la página de LogIn.
 */
type LoginState = {
  usuario?: Usuario;
  credenciales?: SSesion;
  nombreUsuario: string,
  contraseniaUsuario: string,
  usuarioAutenticado: boolean
  token: string | null;
  estadoAutenticacion: 'no-autenticado' | 'autenticando' | 'autenticado' | 'error';
  mensajeError: string | null;
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 19/09/2024
 * Descripción: Define las acciones de la página de LogIn.
 */
type LoginActions = {

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 19/09/2024
   * Descripción: Establece el valor del usuario.
  */
  establecerUsuario: (usuario: string) => void;

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 19/09/2024
   * Descripción: Establece el valor del contrasena.
  */
  establecerContrasena: (contrasena: string) => void;
  
  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Define el metodo que inicia sesion.
   * @param credenciales Valor de las credenciales del usuario.
  */
  iniciarSesion: (credenciales:SSesion) => Promise<void>;

}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 19/09/2024
 * Descripción: Constante que define el estado inicial de la página de LogIn.
 */
const estadoInicial: LoginState = {
  credenciales: { username: "", contrasenia: "" },
  token: null,
  estadoAutenticacion: 'no-autenticado',
  mensajeError: null,
  nombreUsuario: "",
  contraseniaUsuario: "",
  usuarioAutenticado: false
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 19/09/2024
 * Descripción: Objeto constante que define los atributos y acciones de la página de Login.
 */
export const useLoginStore = create<LoginState & LoginActions>((set) => ({
  ...estadoInicial,

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 19/09/2024
   * Descripción: Establece el valor del usuario.
  */
  establecerUsuario: (nombreUsuario: string) => {
    set({ nombreUsuario });
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 19/09/2024
   * Descripción: Establece el valor del contrasena.
  */
  establecerContrasena: (contraseniaUsuario: string) => {
    set({ contraseniaUsuario });
  },

  /**
   * Autor: Jirgort McCarty Vasquez
   * Fecha: 20/09/2024
   * Descripción: Define el metodo que inicia sesion.
   * @param credenciales Valor de las credenciales del usuario.
  */
  iniciarSesion: async (credenciales:SSesion) => {
    set({ estadoAutenticacion: 'autenticando' });

    try {
      const respuesta = await servicioLogIn.autenticarUsuario(credenciales);
      
      if (respuesta.respuestaExitosa) {
        set({ usuario: respuesta.dato, estadoAutenticacion: 'autenticado', mensajeError: null });
      } else {
        set({ estadoAutenticacion: 'error', mensajeError: 'Credenciales incorrectas' });
      }

    } catch (error) {
      set({ estadoAutenticacion: 'error', mensajeError: 'Error en la autenticación' });
    }
  },
}));

