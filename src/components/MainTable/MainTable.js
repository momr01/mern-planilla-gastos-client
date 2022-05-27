import React from "react";
import { Table, Button } from "react-bootstrap";
import {
  divTable,
  tableTitle,
  table,
  rowWithButton,
  buttonMessageTotales,
} from "../../helpers/styles";
import { FileAddOutlined } from "@ant-design/icons";
import { formatoFecha } from "../../helpers/metodos";
import Loading from "../Loading";
import Saldo from "../Saldo";

export default function MainTable(props) {
  //props
  const {
    data,
    tdebe,
    thaber,
    habilitarSaldo,
    showMessageT,
    hideMessage,
    handleShowTotalesModal,
    saldoA,
    saldoD,
    setSaldoA,
    setSaldoD,
    setState,
    dataPos,
    fechaFija,
    showSaldoModal,
    handleCloseSaldoModal,
    handleShowSaldoModal,
  } = props;
  return (
    <div style={divTable}>
      <h4 style={tableTitle}>Libro Diario</h4>
      <Table striped bordered hover style={table}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Debe</th>
            <th>Haber</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((key, index) => (
            <tr
              style={{
                backgroundColor:
                  key.descripcion.includes("SALDO") ||
                  key.descripcion === "Totales"
                    ? "#90D383"
                    : "#fff",
              }}
              key={index}
            >
              <td>{formatoFecha(key.fecha)}</td>
              <td>{key.descripcion}</td>
              <td>{key.debe}</td>
              <td>{key.haber}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="2">Totales</td>
            <td>{tdebe}</td>
            <td>{thaber}</td>
            <td style={rowWithButton}>
              <Button
                onMouseOver={showMessageT}
                onMouseOut={hideMessage}
                onClick={handleShowTotalesModal}
              >
                <FileAddOutlined />
              </Button>
            </td>
          </tr>

          {habilitarSaldo ? (
            <Saldo
              saldoD={saldoD}
              saldoA={saldoA}
              setSaldoA={setSaldoA}
              setSaldoD={setSaldoD}
              tdebe={tdebe}
              thaber={thaber}
              setState={setState}
              dataPos={dataPos}
              data={data}
              fechaFija={fechaFija}
              hideMessage={hideMessage}
              showSaldoModal={showSaldoModal}
              handleCloseSaldoModal={handleCloseSaldoModal}
              handleShowSaldoModal={handleShowSaldoModal}
            />
          ) : (
            <Loading />
          )}
        </tbody>
      </Table>
      <p id="divMessage" style={buttonMessageTotales}></p>
    </div>
  );
}
