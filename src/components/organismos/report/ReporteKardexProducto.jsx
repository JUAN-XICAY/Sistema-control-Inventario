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
import {
  useEmpresaStore,
  useKardexStore,
  useProductosStore,
} from "../../../index";
import { useQuery } from "@tanstack/react-query";

function ReporteKardexProducto() {
  const { mostrarkardex } = useKardexStore();
  const { dataempresa } = useEmpresaStore();

  const { data } = useQuery({
    queryKey: ["reporte kardex", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarkardex({ _id_empresa: dataempresa?.id }),
    enabled: !!dataempresa?.id != null,
  });

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
      fontSize: 12, //
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
      fontSize: 14, //
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
  });

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.fecha}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.codigointerno}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.detalle}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.cantidad}
      </Text>
    </View>
  );
  return (
    <Container>
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de Kardex Productos">
          <Page style={styles.body} size="A4" orientation="landscape">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Reporte de Kardex Productos
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Fecha y hora del reporte: {formattedDate}
                </Text>
                <View>
                  {renderTableRow(
                    {
                      fecha: "Fecha",
                      descripcion: "Producto",
                      codigointerno: "Codigo Interno",
                      detalle: "Movimiento",
                      cantidad: "Cantidad",
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
}`;
export default ReporteKardexProducto;
