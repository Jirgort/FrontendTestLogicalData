import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridValidRowModel,
} from '@mui/x-data-grid';

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Interface para los parámetros del componente Tabla.
 */
interface TablaProps {
  id?: string;
  titulo: string;
  columnas: GridColDef[];
  registros: GridValidRowModel[];
  cargando?: boolean;
  customDatosId?: GridRowIdGetter;
  registrosPorPaginaOpciones?: number[];
  modeloPaginacion?: {
    paginaActual: number;
    registrosPorPaginaSeleccionado: number;
  };
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 20/09/2024
 * Descripción: Tabla estándar para mostrar información e interactuar con los datos.
 * @returns El componente de la tabla con sus herramientas.
 */
export const Tabla = (props: TablaProps) => {
  return (
    <DataGrid
    sx={{ borderColor:"black",'& .MuiDataGrid-cell:hover': {
      color: 'primary.main'},border:2,}}
      rows={props.registros}
      columns={props.columnas}
      loading={props.cargando}
      initialState={{
        pagination: {
          paginationModel: props.modeloPaginacion
            ? {
                page: props.modeloPaginacion.paginaActual,
                pageSize: props.modeloPaginacion.registrosPorPaginaSeleccionado,
              }
            : { page: 0, pageSize: 25 },
        },
      }}
      pageSizeOptions={
        props.registrosPorPaginaOpciones
          ? props.registrosPorPaginaOpciones
          : [25, 50, 100]
      }
      getRowId={props.customDatosId}
    
      
    />
  );
};
