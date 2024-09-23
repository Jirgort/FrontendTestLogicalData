import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Select as MUISelect } from '@mui/material/';
import { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import { JSXElementConstructor, ReactElement, useState } from 'react';
import React from 'react';
import * as Textos from '../../../Cosntantes/textos';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface para los parámetros del componente LabelCheckbox.
 */
interface SelectProps {
    id: string,
    texto: string,
    valor: string,
    icono: ReactElement<any, string | JSXElementConstructor<any>>,
    requerido?: boolean,
    deshabilitado?: boolean,
    soloLectura?: boolean,
    error?: boolean,
    mostrarError?: boolean,
    helperText?: string,
    fullWidth?: boolean,
    style?: React.CSSProperties,
    textoOpcionPorDefecto?: string,
    opciones: {texto: string, valor?: string}[]
    onChange: (valor?: string) => void
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Select estándar con un label.
 * @returns El componente React.
 */
export const Select = (props: SelectProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [cargaInicial, establecerCargaInicial] = useState(true);

    return (
        <Box style={props.style} sx={{ display: 'block' }}>
            {React.cloneElement(props.icono, { sx: { color: 'action.active'}, style: { marginLeft: 16, position: "relative", top: 16 } })}
            <FormControl style={{marginLeft: -40}} fullWidth={props.fullWidth}>
                <InputLabel
                    id={`${props.id}-label`}
                    style={{marginLeft: (props.valor === "" && isFocused) || props.valor !== "" ? 0 : 40}}
                    disabled={props.deshabilitado ? props.deshabilitado : false}
                    required={props.requerido ? props.requerido : false}
                    error={props.error ? props.error : false}>
                        {props.texto}
                </InputLabel>
                <MUISelect
                    labelId={`${props.id}-label`}
                    id={props.id}
                    disabled={props.deshabilitado ? props.deshabilitado : false}
                    readOnly={props.soloLectura}
                    required={props.requerido ? props.requerido : false}
                    error={cargaInicial && !props.mostrarError ? false : props.error}
                    value={props.valor}
                    label={props.texto}
                    style={{paddingLeft: 40}}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => { setIsFocused(false); establecerCargaInicial(false); }}
                    onChange={(event: SelectChangeEvent) => { props.onChange(event.target.value); } }
                    aria-describedby={`${props.id}-helper-text`}>
                    {
                        !props.requerido && (
                            <MenuItem key="" value={undefined}>
                                {props.textoOpcionPorDefecto ?? Textos.NINGUNO_A}
                            </MenuItem>
                        )
                    }
                    {
                        props.opciones.map(x => <MenuItem key={x.valor ?? ""} value={x.valor}>{x.texto}</MenuItem>)
                    }
                </MUISelect>
                <FormHelperText id={`${props.id}-helper-text`}>
                    {cargaInicial && !props.mostrarError ? undefined : props.helperText}
                </FormHelperText>
            </FormControl>
        </Box>
    );
}