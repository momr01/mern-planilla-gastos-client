import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { buttonMessageTotales } from "../../helpers/styles";
import { IssuesCloseOutlined } from "@ant-design/icons";
import GrabarSaldos from "../GrabarSaldos";

export default function Saldo(props) {
  //props
  const {
    saldoD,
    saldoA,
    data,
    setSaldoA,
    setSaldoD,
    tdebe,
    thaber,
    setState,
    dataPos,
    fechaFija,
    hideMessage,
    showSaldoModal,
    handleCloseSaldoModal,
    handleShowSaldoModal,
  } = props;

  //useeffect para definir valor de saldo deudor o saldo acreedor
  useEffect(() => {
    const defineSaldo = () => {
      if (tdebe > thaber) {
        let total = tdebe - thaber;
        setSaldoD({
          state: true,
          value: total,
        });

        setSaldoA({
          state: false,
          value: null,
        });
      } else {
        let total = thaber - tdebe;
        setSaldoA({
          state: true,
          value: total,
        });
        setSaldoD({
          state: false,
          value: null,
        });
      }
    };
    defineSaldo();
  }, [tdebe, thaber]);

  //metodo para mostrar mensaje al pasar mouse sobre boton de agregar row
  //de saldos
  const showMessageS = () => {
    document.getElementById("divMessage").style.display = "block";

    document.getElementById("divMessage").textContent =
      "Agregar nuevo registro de Saldos";
  };

  return (
    <>
      {saldoD.state ? (
        <>
          <tr>
            <td colSpan="2">Saldo Deudor</td>
            <td>{saldoD.value}</td>
            <td></td>
            <td>
              <Button
                variant="success"
                onMouseOver={showMessageS}
                onMouseOut={hideMessage}
                onClick={handleShowSaldoModal}
              >
                <IssuesCloseOutlined />
              </Button>
              <p id="divMessage" style={buttonMessageTotales}></p>
            </td>
          </tr>

          <GrabarSaldos
            showSaldoModal={showSaldoModal}
            handleCloseSaldoModal={handleCloseSaldoModal}
            handleShowSaldoModal={handleShowSaldoModal}
            saldo={saldoD.value}
            type="deudor"
            setState={setState}
            dataPos={dataPos}
            data={data}
            fechaFija={fechaFija}
          />
        </>
      ) : (
        <>
          <tr>
            <td colSpan="2">Saldo Acreedor</td>
            <td></td>
            <td>{saldoA.value}</td>
            <td>
              <Button
                variant="success"
                onMouseOver={showMessageS}
                onMouseOut={hideMessage}
                onClick={handleShowSaldoModal}
              >
                <IssuesCloseOutlined />
              </Button>
              <p id="divMessage" style={buttonMessageTotales}></p>
            </td>
          </tr>

          <GrabarSaldos
            showSaldoModal={showSaldoModal}
            handleCloseSaldoModal={handleCloseSaldoModal}
            handleShowSaldoModal={handleShowSaldoModal}
            saldo={saldoA.value}
            type="acreedor"
            setState={setState}
            dataPos={dataPos}
            data={data}
            fechaFija={fechaFija}
          />
        </>
      )}
    </>
  );
}
