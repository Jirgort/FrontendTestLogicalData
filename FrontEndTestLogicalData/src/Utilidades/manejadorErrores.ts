import { AxiosError } from "axios";

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Indica si el error proporcionado es un error de tipo AxiosError y tiene un
 * mensaje en su respuesta
 * @param error El error por evaluar
 * 
 * @returns Booleano indicando si es error axios con mensaje válido.
 */
export const esErrorAxiosConMensaje = (error: any) => {

    return error instanceof AxiosError
        && error.response
        && typeof error.response.data === "string"
        && error.response.data !== "";
};
