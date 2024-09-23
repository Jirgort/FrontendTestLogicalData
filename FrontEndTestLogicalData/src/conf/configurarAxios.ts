import axios from "axios";

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Configura el objeto axios a usar en las peticiones HTTP.
 */
const servicioApi = axios.create({
    baseURL: document.getElementById("urlApi")?.getAttribute("content") ?? "/"
});

export default servicioApi;