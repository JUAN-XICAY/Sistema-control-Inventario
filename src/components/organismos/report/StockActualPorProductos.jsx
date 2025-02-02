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
  Buscador,
  ListaGenerica,
  useEmpresaStore,
  useProductosStore,
} from "../../../index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function StockActualPorProductos() {
  const [stateListaproductos, setstateListaProductos] = useState(false);
  const {
    buscarproductos,
    setBuscador,
    buscador: buscadorproductos,
    selectproductos,
    reportStockXproducto,
    productosItemSelect,
  } = useProductosStore();
  const { dataempresa } = useEmpresaStore();

  const { data } = useQuery({
    queryKey: [
      "reporte stock por producto",
      { id_empresa: dataempresa?.id, id: productosItemSelect?.id },
    ],
    queryFn: () =>
      reportStockXproducto({
        id_empresa: dataempresa?.id,
        id: productosItemSelect.id,
      }),
    enabled: !!dataempresa,
  });

  //Buscador

  const { data: dataproductosbuscador } = useQuery({
    queryKey: [
      "buscar productos",
      { id_empresa: dataempresa.id, descripcion: buscadorproductos },
    ],
    queryFn: () =>
      buscarproductos({
        _id_empresa: dataempresa.id,
        buscador: buscadorproductos,
      }),
    enabled: dataempresa.id != null,
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
    </View>
  );
  return (
    <Container>
      <Buscador
        funcion={() => setstateListaProductos(!stateListaproductos)}
        setBuscador={setBuscador}
      />
      {stateListaproductos && (
        <ListaGenerica
          scroll="scroll"
          bottom={"450px"}
          funcion={(p) => {
            selectproductos(p);
            setBuscador("");
          }}
          setState={() => setstateListaProductos(!stateListaproductos)}
          data={dataproductosbuscador}
        />
      )}

      <PDFViewer className="pdfviewer">
        <Document title="Reporte de Stock Actual por Producto">
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
                  Stock actual por Producto
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Fecha y hora del reporte: {formattedDate}
                </Text>
                <View>
                  {renderTableRow(
                    {
                      descripcion: "Producto",
                      codigointerno: "Código interno",
                      stock: "Stock",
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;
export default StockActualPorProductos;
