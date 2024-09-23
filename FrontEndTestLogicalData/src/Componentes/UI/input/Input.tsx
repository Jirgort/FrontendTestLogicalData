import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box, FormHelperText, OutlinedInput } from '@mui/material';
import { JSXElementConstructor, ReactElement, useState } from 'react';
import React from 'react';
import { IMask } from 'react-imask';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface para los parámetros del componente InputTexto.
 */
interface InputProps {
    id?: string,
    texto: string,
    valor?: string,
    icono: ReactElement<any, string | JSXElementConstructor<any>>,
    tipo?: string,
    requerido?: boolean,
    deshabilitado?: boolean,
    soloLectura?: boolean,
    error?: boolean,
    mostrarError?: boolean,
    helperText?: string,
    fullWidth?: boolean,
    style?: React.CSSProperties,
    /**
     * Indica el máximo de caracteres permitidos en el input. Si el parámetero "mascara" es igual a
     * "number", indica el número máximo permitido. Se ignora, si el parámetro "regex" tiene valor.
     */
    max?: number,
    /**
     * Si el parámetero "mascara" es igual a "number", indica el número mínimo permitido, sino se
     * ignora.
     */
    min?: number,
    /**
     * Indica la mascara que se aplicará al input. Se ignora si el parámetro "regex" tiene valor.
     */
    mascara?: string,
    /**
     * Indica la expresión regular que debe cumplir el campo. Este parámetro prevalece sobre
     * "mascara" y "max".
     */
    regex?: string,
    /**
     * Indica si la expresión regular se debe evaluar solo cuando el campo pierde el foco, de lo
     * contrario lo hace cada vez que se escriba sobre él.
     */
    regexOnBlur?: boolean,
    onChange: (valor: string) => void
}
  
/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Un input de texto estándar.
 * @returns El componente React.
 */
export const Input = (props: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [cargaInicial, establecerCargaInicial] = useState(true);

    const regex = props.regex ? RegExp(props.regex) : undefined;

    const optsMascara = () => {
        if (!props.mascara || props.regex){
            return undefined;
        } else if (props.mascara === "number") {
            if (props.max && props.min) {
                return {mask: Number, max: props.max, min: props.min};
            } else if (props.max) {
                return {mask: Number, max: props.max};
            } else if (props.min) {
                return {mask: Number, min: props.min};
            } else {
                return {mask: Number};
            }
        } else {
            return {mask: props.mascara!};
        }
    };
    
    const imask = props.mascara && !props.regex ? IMask.createMask(optsMascara()) : undefined;

    const inputProps = () => {
        if (!props.max || props.mascara || props.regex) {
            return undefined;
        } else {
            return {maxLength: props.max};
        }
    };
    
    return (
        <Box style={props.style} sx={{ display: 'block' }}>
            {React.cloneElement(props.icono, { sx: { color: 'action.active'}, style: { marginLeft: 16, position: "relative", top: 16 } })}
            <FormControl style={{marginLeft: -40}} variant="outlined" fullWidth={props.fullWidth}>
                <InputLabel
                    htmlFor={props.id}
                    style={{marginLeft: (props.valor === "" && isFocused) || props.valor !== "" ? 0 : 40}}>
                        {props.texto}
                </InputLabel>
                <OutlinedInput
                    id={props.id}
                    label={props.texto}
                    value={props.valor}
                    type={props.tipo}
                    error={cargaInicial && !props.mostrarError ? false : props.error}
                    disabled={props.deshabilitado ? props.deshabilitado : false}
                    readOnly={props.soloLectura ? props.soloLectura : false}
                    required={props.requerido ? props.requerido : false}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {

                            if (regex && !props.regexOnBlur){
                                if (event.target.value.trim() === "" || regex.test(event.target.value)){
                                    props.onChange(event.target.value);
                                }
                            } else if (imask) {
                                imask.resolve(event.target.value);
                                props.onChange(imask.value);
                            } else {
                                props.onChange(event.target.value);
                            }
                        }
                    }
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        establecerCargaInicial(false);
                        if (regex && props.regexOnBlur && !regex.test(props.valor ?? "")) {
                            props.onChange("");
                        }
                    }}
                    style={{paddingLeft: 40}}
                    aria-describedby={`${props.id}-helper-text`}
                    inputProps={inputProps()}
                />
                <FormHelperText id={`${props.id}-helper-text`}>
                    {cargaInicial && !props.mostrarError ? undefined : props.helperText}
                </FormHelperText>
            </FormControl>
        </Box>
    );
}