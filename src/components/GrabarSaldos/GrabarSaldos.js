import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { validarFechas2 } from "../../helpers/metodos";
import { alert } from "../../helpers/metodos";
import url from "../../helpers/url";
import { Modal, Form, Button } from "react-bootstrap";

export default function GrabarSaldos(props) {
  //props
  const {
    saldo,
    type,
    setState,
    dataPos,
    data,
    fechaFija,
    handleCloseSaldoModal,
    showSaldoModal,
  } = props;

  //usestate de inputs del formulario
  const [fecha, setFecha] = useState();
  const [descripcion, setDescripcion] = useState();
  const [debe, setDebe] = useState();
  const [haber, setHaber] = useState();
  const [form, setForm] = useState();

  //useeffect para inicializar valor de inputs del formulario
  useEffect(() => {
    const setValues = () => {
      setForm({
        fecha,
        descripcion,
        debe,
        haber,
      });
    };
    setValues();
  }, [fecha, descripcion, debe, haber, type, saldo]);

  //useeffect para definir si corresponde saldo deudor o saldo acreedor
  useEffect(() => {
    const setTotals = () => {
      if (data && dataPos) {
        const d = data[data.length - 1]?.debe;
        const h = data[data.length - 1]?.haber;

        if (d > h) {
          const result = d - h;

          setDescripcion("SALDO DEUDOR");
          setDebe(result);
          setHaber(0);
        } else {
          const result = h - d;

          setDescripcion("SALDO ACREEDOR");
          setHaber(result);
          setDebe(0);
        }
      }
    };

    setTotals();
  }, [data, dataPos]);

  //otras variables
  const MySwal = withReactContent(Swal);

  //metodo para grabar en BD los saldos
  const grabarSaldos = async (e) => {
    e.preventDefault();

    if (fecha?.length > 0) {
      if (data[data.length - 1]?.descripcion !== "Totales") {
        await MySwal.fire({
          title: <strong>ERROR</strong>,
          html: (
            <i>
              Para grabar un registro de Saldos, antes debe haber un registro de
              Totales
            </i>
          ),
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#d33",
          confirmButtonText: `Ok`,
        });
      } else {
        if (!validarFechas2(fecha, fechaFija)) {
          alert(
            "error",
            "No puede agregar registros con fecha anterior a la fecha del último registro grabado"
          );
        } else {
          await MySwal.fire({
            title: <strong>ADVERTENCIA</strong>,
            html: (
              <i>
                Está seguro de que desea grabar un nuevo registro de Saldos?
              </i>
            ),
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Grabar`,
          }).then(async (value) => {
            if (value.isConfirmed) {
              const row = await axios.post(url.rows, form);

              if (row) {
                await axios.put(url.position, { fecha: fecha });
                setState(true);
              }

              alert("success", "Datos guardados correctamente");
            } else {
              alert("error", "ERROR. Los datos no se guardaron");
            }
          });
        }
      }
    } else {
      alert("error", "ERROR. Los datos no se guardaron");
    }
  };

  return (
    <>
      <Modal show={showSaldoModal} onHide={handleCloseSaldoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Grabar saldos en la BD - Seleccione Fecha</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFecha(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => grabarSaldos(e)}
            >
              Agregar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
