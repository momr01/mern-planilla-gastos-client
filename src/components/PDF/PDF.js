import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import Loading from "../Loading";
import { formatoFecha, separadorMiles } from "../../helpers/metodos";

export default function PDF(props) {
  //props
  const { data } = props;

  //estilos de archivo pdf
  const styles = StyleSheet.create({
    page: {
      paddingTop: "30px",
      paddingBottom: "50px",
    },
    mainTitle: {
      textAlign: "center",
      padding: "20px",
    },
    section: {
      margin: 10,
      padding: 10,
      fontSize: "12px",
    },
    tablaEncabezados: {
      flexDirection: "row",
      alignItems: "center",
      fontSize: "14px",
      fontStyle: "italic",
      color: "#fff",
      backgroundColor: "#000",
    },
    tablaRows: {
      flexDirection: "row",
      alignItems: "center",
      fontSize: "12px",
    },
    tablaRowsTotales: {
      flexDirection: "row",
      alignItems: "center",
      fontSize: "12px",
      backgroundColor: "red",
      color: "#fff",
      fontWeight: "bold",
    },
    divTable: {
      margin: 10,
      padding: 10,
    },
    celdasFechaNumeros: {
      width: "15%",
      border: "1px solid #000",
      textAlign: "center",
      height: "25px",
      paddingTop: "5px",
    },
    celdaDetalle: {
      width: "55%",
      border: "1px solid #000",
      textAlign: "center",
      height: "25px",
      paddingTop: "5px",
    },
  });

  return (
    <>
      {data ? (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.mainTitle}>Planilla de Gastos</Text>
            <View style={styles.section}>
              <Text>Año/s 2022</Text>
            </View>

            <View style={styles.section}>
              <Text>
                "ROJAS LEÓN EDIE Y MONTAÑA MARCELINA DEL CARMEN" P/ SUCESIÓN -
                Expediente nº 252133 Planilla de gastos 2016-2020
              </Text>
            </View>

            <View style={styles.divTable}>
              <View style={styles.tablaEncabezados}>
                <Text style={styles.celdasFechaNumeros}>Fecha</Text>
                <Text style={styles.celdaDetalle}>Detalle</Text>
                <Text style={styles.celdasFechaNumeros}>Debe</Text>
                <Text style={styles.celdasFechaNumeros}>Haber</Text>
              </View>

              {data.map((value, index) => (
                <View
                  style={
                    value.descripcion === "Totales" ||
                    value.descripcion.includes("SALDO")
                      ? styles.tablaRowsTotales
                      : styles.tablaRows
                  }
                  key={index}
                >
                  <Text style={styles.celdasFechaNumeros}>
                    {formatoFecha(value.fecha)}
                  </Text>
                  <Text style={styles.celdaDetalle}>{value.descripcion}</Text>
                  <Text style={styles.celdasFechaNumeros}>
                    {separadorMiles(value.debe)}
                  </Text>
                  <Text style={styles.celdasFechaNumeros}>
                    {separadorMiles(value.haber)}
                  </Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      ) : (
        <Loading />
      )}
    </>
  );
}
