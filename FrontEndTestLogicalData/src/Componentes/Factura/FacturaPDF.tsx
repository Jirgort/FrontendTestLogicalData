import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { SItem } from "../../Paginas/Catalogo/Solicitudes/SItem";
import { MArticulo } from '../../Modelos/Articulo/mArticulo';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    textAlign: 'center',
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    textAlign: 'center',
  },
  total: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'right',
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  smallTable: {
    display: 'flex',
    width: '30%',
    marginBottom: 1,
    marginLeft: 'auto',
    marginRight: '50',

  },
  smallTableRow: {
    flexDirection: 'row',
  },
  smallTableColHeader: {
    width: '33.33%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 2,
    borderWidth: 1,
  },
  smallTableCol: {
    width: '33.33%',
    textAlign: 'center',
    fontSize: 8,
    padding: 2,
    borderColor: '#000',
    borderWidth: 1,

  },
  tableColD: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    padding: 5,
    textAlign: 'left',
    borderWidth: 1,
  },
  tableD: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,

  },
  totalTable: {
    display: 'flex',
    width: '40%',
    marginLeft: 'auto',
    marginRight: 0,
    marginTop: 10,
    borderColor: '#000',
  },
  totalTableRow: {
    flexDirection: 'row',
  },
  totalTableColHeader: {
    width: '50%',
    textAlign: 'right',
    fontWeight: 'bold',
    borderStyle: 'solid',
    paddingRight: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
  },
  totalTableCol: {
    width: '50%',
    textAlign: 'center',
    borderWidth: 1,
  },
});

interface FacturaPDFProps {
  articulos: MArticulo[];
  items: SItem[];
  fecha: string; 
  totalFactura: number
}

/**
 * Autor: Jirgort McCarty V
 * Fecha: 21/09/2024
 * Descripción: Componente Factura para mostrar información.
 * @returns El componente de la factura con sus herramientas.
 */
export const FacturaPDF: React.FC<FacturaPDFProps> = ({ articulos, items, fecha, totalFactura }) => {

  const calcularTotal = () =>
    items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  const [mes, dia, año] = fecha.split("/");
  const nombreUsuario = localStorage.getItem('nombre')
  const apellidoUsuario = localStorage.getItem('apellido')
  const iva = 0.13

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text>Lider en soluciones tecnológicas
            {"\n"}Frente a la Facultad de Derecho de la UCR, San Pedro de Montes de Oca.
            {"\n"}Tel: +506 4052-2780
            {"\n"}Email: mercadeo@ld.co.cr
            {"\n"}www.ld.co.cr
            {"\n"}Tel: +506 4052-2780
          </Text>
          <Image style={styles.logo} src="../../../public/LogoF.jpg" />
        </View>

        <Text style={styles.title}>Factura</Text>
        <View style={styles.smallTable}>
          <View style={styles.smallTableRow}>
            <Text style={styles.smallTableColHeader}>Día</Text>
            <Text style={styles.smallTableColHeader}>Mes</Text>
            <Text style={styles.smallTableColHeader}>Año</Text>
          </View>
          <View style={styles.smallTableRow}>
            <Text style={styles.smallTableCol}>{mes}</Text>
            <Text style={styles.smallTableCol}>{dia}</Text>
            <Text style={styles.smallTableCol}>{año}</Text>
          </View>
        </View>

        <View style={styles.tableD}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Información del cliente</Text>
            <Text style={styles.tableColHeader}>Detalles</Text>

          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColD}>
              Nombre: {nombreUsuario}
              {"\n"}
              Apellido: {apellidoUsuario}
            </Text>
            <Text style={styles.tableColD}>
              San José, Costa Rica
              {"\n"}
              Termino de pago: Electronica
              {"\n"}
              Agente de venta: Logical Data
            </Text>
          </View>
        </View>


        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Código</Text>
            <Text style={styles.tableColHeader}>Nombre</Text>
            <Text style={styles.tableColHeader}>Precio unitario</Text>
            <Text style={styles.tableColHeader}>Precio IVA</Text>
            <Text style={styles.tableColHeader}>Cantidad</Text>
            <Text style={styles.tableColHeader}>Total</Text>
          </View>

          {items.map((item) => (
            <View style={styles.tableRow} key={item.articuloId}>
              <Text style={styles.tableCol}>{articulos.find((prod) => prod.id === item.articuloId)?.codigo}</Text>
              <Text style={styles.tableCol}>{articulos.find((prod) => prod.id === item.articuloId)?.nombre}</Text>
              <Text style={styles.tableCol}> CRC {item.precio}</Text>
              <Text style={styles.tableCol}> CRC {articulos.find((prod) => prod.id === item.articuloId)?.iva ? item.precio * iva : 0}</Text>

              <Text style={styles.tableCol}>{item.cantidad}</Text>

              <Text style={styles.tableCol}> CRC {articulos.find((prod) => prod.iva === true) ? (item.cantidad * item.precio) + (item.cantidad * item.precio) * iva : (item.cantidad * item.precio)}</Text>
            </View>
          ))}
        </View>


        <View style={styles.totalTable}>
          <View style={styles.totalTableRow}>
            <Text style={styles.totalTableColHeader}>Subtotal:</Text>
            <Text style={styles.totalTableCol}>CRC {calcularTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.totalTableRow}>
            <Text style={styles.totalTableColHeader}>Impuestos:</Text>
            <Text style={styles.totalTableCol}>CRC {items.reduce((totalIva, item) => {
              const producto = articulos.find((prod) => prod.id === item.articuloId);
              if (producto?.iva) {
                return totalIva + (item.precio * iva) * item.cantidad;
              }
              return totalIva;
            }, 0)}</Text>
          </View>
          <View style={styles.totalTableRow}>
            <Text style={styles.totalTableColHeader}>Total:</Text>
            <Text style={styles.totalTableCol}>CRC {totalFactura.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};