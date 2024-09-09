import styled from "styled-components";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { FormatearNumeroDinero, useEmpresaStore, useProductosStore } from "../../../index";
import { useQuery } from "@tanstack/react-query";

function StockInventarioValoradoVenta() {
  const { reportInventarioValoradoVenta } = useProductosStore();
  const { dataempresa } = useEmpresaStore();

  const { data } = useQuery({
    queryKey: ["reporte stock valorado Venta", { _id_empresa: dataempresa?.id }],
    queryFn: () => reportInventarioValoradoVenta({ _id_empresa: dataempresa?.id }),
    enabled: !!dataempresa,
  });

  //Calcular el total general
  const totalGeneral = data?.reduce((acc, item) => acc + item.total, 0) || 0;

  const styles = StyleSheet.create({
    page: { flexDirection: "row", position: "relative" },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    table: { width: "100%", margin: "auto", marginTop: 10 },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      alignItems: "stretch",
      height: 24,
      borderLeftColor: "#000",
      borderLeft: 1,
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",
    //   fontFamily: "Inconsolata",
      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
      fontSize: 12,//
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
    //   fontFamily: "Inconsolata",
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      fontSize: 14,//
    },
  });

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.codigointerno}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.stock}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {FormatearNumeroDinero(rowData.precioventa)}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {FormatearNumeroDinero(rowData.total)}
      </Text>
    </View>
  );
  return (
    <Container>
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de Inventario - Valorado Precio de Venta">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Inventario Valorado - Precio de Ventas
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Total: {FormatearNumeroDinero(totalGeneral)}
                </Text>
                <Text style={{fontSize: 14,}}>Fecha y hora del reporte: {formattedDate}</Text>
                <View>
                  {renderTableRow(
                    {
                      descripcion: "Producto",
                      codigointerno: "Código interno",
                      stock: "Stock",
                      precioventa: "Precio de Venta",
                      total: "Total"
                    },
                    true
                  )}
                  {data?.map((item) => renderTableRow(item))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      
    </Container>
  );
}

const Container = styled.div`
width: 100%;
height: 90vh;
.pdfviewer{
  width: 100%;
  height: 100%;
}

`;
export default StockInventarioValoradoVenta;
