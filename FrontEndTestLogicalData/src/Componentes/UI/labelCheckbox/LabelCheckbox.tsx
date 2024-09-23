import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface para los parámetros del componente LabelCheckbox.
 */
interface LabelCheckboxProps {
    id?: string,
    texto: string,
    checked?: boolean,
    requerido?: boolean,
    deshabilitado?: boolean,
    onChange?: (valor: boolean) => void
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Checkbox estándar con un label.
 * @returns El componente React.
 */
export const LabelCheckbox = (props: LabelCheckboxProps) => {
    return (
        <FormControlLabel
            disabled={props.deshabilitado ? props.deshabilitado : false}
            required={props.requerido ? props.requerido : false}
            control={
                <Checkbox
                    id={props.id}
                    checked={props.checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { if (props.onChange) props.onChange(event.target.checked); }}
                />
            }
            label={props.texto} />
    );
}