import { Container, Grid, Typography } from '@mui/material';
import { Tabla } from '../../Componentes/Tabla/Tabla';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { usePaginaArticulos } from './store';
import { useEffect } from 'react';
import * as Iconos from '@mui/icons-material';
import { BotonPrimario, BotonSecundario } from '../../Componentes/UI/botones/Botones';
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogTitle } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { Input } from '../../Componentes/UI/input/Input';
import { ModalConfirmacion, ModalAlerta } from '../../Componentes/Modales/Modales';
import * as Textos from '../../Cosntantes/textos';
import * as FormatosLimitesCampos from "../../Cosntantes/limitesCampos";
import { LabelCheckbox } from '../../Componentes/UI/labelCheckbox/LabelCheckbox';

/**
 * Autor: Jirgort McCarty Vasquez
 * Fecha: 21/09/2024
 * Descripción: Componente que construye la página de articulos
 * @returns Retorna la página que gestiona los articulos
*/
export  const PaginaInventario = () => {
  const articulos = usePaginaArticulos((state) => state.articulos);
  const estadoCargaArticulos = usePaginaArticulos((state) => state.estadoCargaArticulos);
  const listarArticulos = usePaginaArticulos((state) => state.listarArticulos);
  const reiniciarEstado = usePaginaArticulos((state) => state.reiniciarEstado);
  const establecerModalAgregarEditarAbierto = usePaginaArticulos((state) => state.establecerModalAgregarEditarAbierto);

  const modalMensajesAbierto = usePaginaArticulos(state => state.modalMensajesAbierto);
  const modalAgregarEditarAbierto = usePaginaArticulos(state => state.modalAgregarEditarAbierto);
  const mostrarErrorCampos = usePaginaArticulos(state => state.mostrarErrorCampos);
  const esEdicion = usePaginaArticulos(state => state.esEdicion);
  const modalConfirmacionAbierto = usePaginaArticulos(state => state.modalConfirmacionAbierto);
  const msjModal = usePaginaArticulos(state => state.msjModal);
  const tipoMensaje = usePaginaArticulos(state => state.tipoMensaje);

  const establecerModalConfirmacionAbierto = usePaginaArticulos(state => state.establecerModalConfirmacionAbierto);
  const establecerModalMensajesAbierto = usePaginaArticulos(state => state.establecerModalMensajesAbierto);

  const establecerCodigo = usePaginaArticulos(state => state.establecerCodigo);
  const establecerNombre = usePaginaArticulos(state => state.establecerNombre);
  const establecerPrecio = usePaginaArticulos(state => state.establecerPrecio);
  const establecerIVA = usePaginaArticulos(state => state.establecerIVA);

  const codigo = usePaginaArticulos(state => state.codigo);
  const nombre = usePaginaArticulos(state => state.nombre);
  const precio = usePaginaArticulos(state => state.precio);
  const articuloId = usePaginaArticulos(state => state.articuloId);
  const iva = usePaginaArticulos(state => state.iva);


  const establecerAgregarEditar = usePaginaArticulos(state => state.establecerAgregarEditar)
  const guardarArticulo = usePaginaArticulos(state => state.guardarArticulo)
  const borrarArticulo = usePaginaArticulos(state => state.borrarArticulo)

  useEffect(() => {
    reiniciarEstado();
  }, [reiniciarEstado]);

  useEffect(() => {
    listarArticulos();
  }, [listarArticulos]);

  const IVA: number = 0.13;
  const columns: GridColDef[] = [
    { field: 'codigo', headerName: Textos.CODIGO, flex: 1, minWidth: 100 },
    { field: 'nombre', headerName: Textos.NOMBRE, flex: 1, minWidth: 100 },
    { field: 'precio', headerName: Textos.PRECIO, flex: 1, minWidth: 100 },
    {
      field: 'iva', headerName: Textos.IVA, flex: 1, minWidth: 100, renderCell(params) {

        return params.row.iva ? parseInt(params.row.precio) * IVA : 0;
      }
    },
    {
      field: 'total', headerName: Textos.TOTAL, flex: 1, minWidth: 100, renderCell(params) {

        return params.row.iva ? parseInt(params.row.precio) * IVA + parseInt(params.row.precio) :params.row.precio;
      }
    },
    {
      field: 'actions',
      headerName:"Acciones",
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: (p) => [
        <GridActionsCellItem
          icon={<Iconos.Edit />}
          label={Textos.EDITAR}
          onClick={() => establecerAgregarEditar(Textos.EDITAR, p.row)}
        />,
        <GridActionsCellItem icon={<Iconos.Delete />} label={Textos.BORRAR} onClick={() => establecerModalConfirmacionAbierto(true, p.row)} />,
      ],
    },
  ];

  return (
      <Container>
        <Grid container item xs={12} justifyContent="space-between" spacing={2}>
          <Grid container item xs={12} justifyContent="space-between">
            <Grid item>
              <Typography component="h1" variant="h4">
                {Textos.GESTION_ARTICULOS}
              </Typography>
            </Grid>

            <Grid item alignSelf="center">
              <BotonPrimario
                texto={Textos.AGREGAR}
                icono={<Iconos.Add />}
                onClick={() => { establecerAgregarEditar(Textos.AGREGAR) }}
              />
            </Grid>
          </Grid>
          <Dialog open={modalAgregarEditarAbierto} maxWidth="md" onClose={() => establecerModalAgregarEditarAbierto(false)}>
            <DialogTitle>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {esEdicion ? Textos.EDITAR : Textos.AGREGAR} {Textos.ARTICULO}
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Box
                noValidate
                component='form'
                onSubmit={(e) => {
                  e.preventDefault();
                  guardarArticulo();
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 2
                }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={15}>
                    <Input
                      texto={Textos.CODIGO}
                      valor={codigo}
                      icono={<Iconos.Info />}
                      fullWidth
                      requerido
                      error={codigo === ""}
                      mostrarError={mostrarErrorCampos}
                      helperText={codigo === "" ? Textos.CAMPO_REQUERIDO : ""}
                      max={FormatosLimitesCampos.EXTENSION_CAMPO_CORTO}
                      onChange={establecerCodigo} />
                  </Grid>
                  <Grid item xs={12} sm={15}>
                    <Input
                      texto={Textos.NOMBRE}
                      valor={nombre}
                      icono={<Iconos.Info />}
                      fullWidth
                      requerido
                      error={nombre === ""}
                      mostrarError={mostrarErrorCampos}
                      helperText={nombre === "" ? Textos.CAMPO_REQUERIDO : ""}
                      max={FormatosLimitesCampos.EXTENSION_CAMPO_CORTO}
                      onChange={establecerNombre} />
                  </Grid>
                  
                  <Grid item xs={12} sm={15}>
                    <Input
                      texto={Textos.PRECIO}
                      valor={precio}
                      icono={<Iconos.Info />}
                      fullWidth
                      requerido
                      error={precio === ""}
                      mostrarError={mostrarErrorCampos}
                      helperText={precio === "" ? Textos.CAMPO_REQUERIDO : ""}
                      max={FormatosLimitesCampos.NUMERO_MAXIMO_ENTERO}
                      min={0}
                      onChange={establecerPrecio}
                      mascara="number" />
                  </Grid>
                  
                  
                    <Grid item xs={12} >
                      <LabelCheckbox
                        texto={Textos.APLICA_IVA}
                        requerido={true}
                        deshabilitado={false}
                        checked={iva}
                        onChange={establecerIVA} />
                    </Grid>
                  
                </Grid>
                <BotonPrimario
                  id='botonSubmitAgregarEditar'
                  tipo='submit'
                  style={{ display: "none" }}
                  texto={Textos.GUARDAR}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Grid container spacing={2} justifyContent={"center"} style={{ marginBottom: 4 }}>
                <Grid item>
                  <BotonSecundario
                    style={{ width: "100%" }}
                    texto={Textos.CANCELAR}
                    icono={<Iconos.Cancel />}
                    onClick={() => { establecerAgregarEditar(Textos.CANCELAR) }} />
                </Grid>
                <Grid item>
                  <BotonPrimario
                    tipo="submit"
                    style={{ width: "100%" }}
                    texto={Textos.GUARDAR}
                    icono={<Iconos.Save />}
                    onClick={() => document.getElementById('botonSubmitAgregarEditar')?.click()} />
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
          <Grid style={{ display: "grid", height: 460 }} item xs={12}>
            <Tabla
              titulo={Textos.LISTADO_ARTICULOS}
              columnas={columns}
              registros={articulos}
              cargando={estadoCargaArticulos === "cargando"}
              customDatosId={(row)=> row.id}
            />
          </Grid>
          <ModalConfirmacion
            abierto={modalConfirmacionAbierto}
            mensaje={Textos.ESTA_ACCION_NO_PUEDE_DESHACER}
            titulo={Textos.DESEA_BORRAR_ARTICULO_PREGUNTA}
            onConfirmacion={() => { borrarArticulo(articuloId) }}
            onCancelacion={() => establecerModalConfirmacionAbierto(false)} />
          <ModalAlerta
            abierto={modalMensajesAbierto}
            tipo={tipoMensaje}
            mensaje={msjModal}
            onClose={() => establecerModalMensajesAbierto(false)} />
        </Grid>
      </Container>
  );
};
export default PaginaInventario;