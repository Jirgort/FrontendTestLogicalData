import { useOrdenes } from "../Catalogo/store";
import { Box, Container, MenuItem, Dialog, Grid, Select, Typography, FormControl, InputLabel, TextField, Button } from "@mui/material";
import * as Textos from '../../Cosntantes/textos';
import * as Iconos from '@mui/icons-material';
import { useEffect } from 'react';
import { Tabla } from '../../Componentes/Tabla/Tabla';
import { FacturaPDF } from '../../Componentes/Factura/FacturaPDF';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { ModalAlerta } from '../../Componentes/Modales/Modales';
import { PDFViewer } from '@react-pdf/renderer';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Componente de gestión de Articulos
 * @returns Componente de la página de Articulos.
 */
export const PaginaCatalogo = () => {
  const articulos = useOrdenes(state => state.articulos);
  const codigo = useOrdenes(state => state.codigo);
  const nombre = useOrdenes((state) => state.nombre);
  const IVA = useOrdenes((state) => state.IVA);
  const items = useOrdenes((state) => state.items);
  const estadoCargando = useOrdenes((state) => state.estadoCargando);
  const totalFactura = useOrdenes((state) => state.totalFactura);
  const modalAbierto = useOrdenes((state) => state.modalMensajesAbierto);
  const tipoMensaje = useOrdenes((state) => state.tipoMensaje);
  const msjModal = useOrdenes((state) => state.msjModal);
  const modalComprobanteAbierto = useOrdenes((state) => state.modalComprobanteAbierto);

  const establecerCodigo = useOrdenes(state => state.establecerCodigo);
  const reiniciarEstado = useOrdenes((state) => state.reiniciarEstado);
  const obtenerArticulos = useOrdenes((state) => state.obtenerArticulos);
  const establecerCantidad = useOrdenes((state) => state.establecerCantidad);
  const agregarItem = useOrdenes((state) => state.agregarItem);
  const eliminarItem = useOrdenes((state) => state.eliminarItem);
  const agregarOrden = useOrdenes((state) => state.agregarOrden);
  const establecerModalMensajesAbierto = useOrdenes((state) => state.establecerModalMensajesAbierto);
  const establecerModalComprobante = useOrdenes((state) => state.establecerModalComprobante);
  useEffect(() => {
    reiniciarEstado();
  }, [reiniciarEstado]);

  useEffect(() => {
    obtenerArticulos();
  }, [obtenerArticulos]);


  const columns: GridColDef[] = [
    {
      field: 'codigo',
      headerName: Textos.CODIGO,
      flex: 1,
      minWidth: 200,
      renderCell(params: any) {
        return articulos.find((prod) => prod.id === params.row.articuloId)
          ?.codigo;
      },
    },
    {
      field: 'nombre',
      headerName: Textos.NOMBRE,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        return articulos.find((prod) => prod.id === params.row.articuloId)
          ?.nombre;
      },
    },
    {
      field: 'precio',
      headerName: Textos.PRECIO,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        return articulos.find((prod) => prod.id === params.row.d)
          ?.precio;
      },
    },
    {
      field: 'iva',
      headerName: Textos.IVA,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        let itemCantidad = items.find(
          (item) => item.articuloId === params.row.articuloId
        )?.cantidad;

        let iva = articulos.find(
          (prod) => prod.id === params.row.articuloId
        )?.iva;

        if (itemCantidad) {
          return iva
            ? (params.row.precio * IVA * params.row.cantidad).toFixed(3)
            : 0;
        }
      },
    },
    {
      field: 'cantidad',
      headerName: Textos.CANTIDAD,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'total',
      headerName: Textos.TOTAL,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        let prodCantidad = items.find(
          (item) => item.articuloId === params.row.articuloId
        )?.cantidad;

        let iva = articulos.find(
          (prod) => prod.id === params.row.articuloId
        )?.iva;

        if (prodCantidad) {
          let total = Number(params.row.precio) * prodCantidad;
          return iva ? (total + total * IVA).toFixed(3) : total;
        }
      },
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: (p: any) => [
        <GridActionsCellItem
          icon={<Iconos.Delete />}
          label={Textos.BORRAR}
          onClick={() => {
            eliminarItem(p.row.articuloId);
          }}
        />,
      ],
    },
  ];

  const fecha = new Date().toLocaleDateString();

  return (
    <Container>
      <Grid container item xs={12} justifyContent="space-between" spacing={2}>
        <Grid container item xs={12} justifyContent="space-between">
          <Grid item>
            <Typography component="h1" variant="h4">
              {Textos.ORDEN_ARTICULOS}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <FormControl fullWidth>

            <InputLabel id="cod">{Textos.CODIGO}</InputLabel>
            <Select
              id='cod'
              sx={{ minWidth: 250, marginBottom:2}}
              value={codigo}
              label={Textos.CODIGO}
              onChange={(e) => establecerCodigo(e.target.value)}
            >
              {articulos.map((prod) => (
                <MenuItem key={prod.id} value={prod.codigo}>
                  {prod.codigo}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            required={true}
            label='Artículo'
            value={nombre}
          ></TextField>
        </Grid>

        <Grid item>
          <TextField
            required={true}
            type='number'
            label='Cantidad'
            onChange={(e) =>
              {
                const value = Number(e.target.value);
                if (value >= 0) {
                  establecerCantidad(value);
                }
              }
            }
          ></TextField>
        </Grid>
        <Grid item alignSelf='center'>
          <Button
            startIcon={<Iconos.Add />}
            color='primary'
            variant='contained'
            type='submit'
            onClick={() => agregarItem()}
          >
            <Typography>{Textos.AGREGAR}</Typography>
          </Button>
        </Grid>


      </Grid>
      <Grid style={{ display: 'grid', height: 460 }} item xs={12}>
        <Tabla
          titulo={Textos.ORDEN_ARTICULOS}
          columnas={columns}
          registros={items}
          cargando={estadoCargando === 'cargando'}
          customDatosId={(items) => items.articuloId}
        ></Tabla>
      </Grid>
      <Grid container item xs={12} justifyContent="space-between" spacing={2}>
        <Grid container item xs={12} justifyContent="space-between">
          <Grid item>
            <Button
              startIcon={<Iconos.ProductionQuantityLimits/>}
              style={{marginTop: 10}}
              color='warning'
              variant='contained'
              type='submit'
              onClick={() => agregarOrden()}
            >
              <Typography >{Textos.FACTURAR}</Typography>
            </Button>
          </Grid>

          <Grid item >
            <Typography variant="h4">
              {Textos.TOTAL}: {totalFactura}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <ModalAlerta
        abierto={modalAbierto}
        tipo={tipoMensaje}
        mensaje={msjModal}
        onClose={() => establecerModalMensajesAbierto(false)}
      ></ModalAlerta>
      <Dialog
        open={modalComprobanteAbierto}
        onClose={() => establecerModalComprobante(false)}
        maxWidth="lg"
        fullWidth={true}
        PaperProps={{
          style: {
            height: '80vh', 
            overflow: 'hidden', 
          },
        }}
      >
        <Box sx={{ height: '80vh', width: '100%' }}>

          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <FacturaPDF articulos={articulos} items={items}  fecha={fecha} totalFactura={totalFactura} />

          </PDFViewer>

        </Box>

      </Dialog>
    </Container>

  );
};

export default PaginaCatalogo;
