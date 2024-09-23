import Button from '@mui/material/Button';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface para los parámetros del componente BotonPrimario.
 */
interface BotonPrimarioProps {
    id?: string,
    texto: string,
    icono?: React.ReactNode,
    deshabilitado?: boolean,
    tipo?: "button" | "reset" | "submit"
    style?: React.CSSProperties,
    onClick?: () => void
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Botón primario, se debe usar como la acción principal en una página, sección o formulario.
 * @returns El componente React.
 */
export const BotonPrimario = (props: BotonPrimarioProps) => {
    return (
        <Button
            id={props.id}
            variant="contained"
            type={props.tipo}
            style={props.style}
            startIcon={props.icono}
            onClick={props.onClick}
            disabled={props.deshabilitado ? props.deshabilitado : false}>
            { props.texto }
        </Button>
    );
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface para los parámetros del componente BotonSecundario.
 */
interface BotonSecundarioProps {
    id?: string,
    texto: string,
    icono?: React.ReactNode,
    deshabilitado?: boolean,
    style?: React.CSSProperties,
    onClick?: () => void
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Botón secundario, se debe usar como la acción secundaria en una página, sección o formulario.
 * @returns El componente React.
 */
export const BotonSecundario = (props: BotonSecundarioProps) => {
    return (
        <Button
            id={props.id}    
            variant="contained"
            style={props.style}
            startIcon={props.icono}
            color="secondary"
            onClick={props.onClick}
            disabled={props.deshabilitado ? props.deshabilitado : false}>
            { props.texto }
        </Button>
    );
}



