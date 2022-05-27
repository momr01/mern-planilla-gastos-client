import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validarFechas2 } from "../../helpers/metodos";
import { alert } from "../../helpers/metodos";
import url from "../../helpers/url";
import { Modal, Form, Button } from "react-bootstrap";

export default function GrabarTotales(props) {
  //props
  const {
    fecha,
    setFecha,
    data,
    formTotales,
    setFormTotales,
    tdebe,
    thaber,
    fechaFija,
    setState,
    showTotalesModal,
    handleCloseTotalesModal,
  } = props;

  //sweetalert2
  const MySwal = withReactContent(Swal);

  //metodo para grabar los totales en la BD
  const grabarTotales = async (e) => {
    e.preventDefault();

    const setValues = () => {
      setFormTotales({
        fecha,
        descripcion: "Totales",
        debe: tdebe,
        haber: thaber,
      });
    };

    setValues();

    if (
      data[data.length - 1]?.descripcion === "Totales" ||
      data[data.length - 1]?.descripcion.includes("SALDO")
    ) {
      alert(
        "error",
        "El último registro es de Totales. Antes de continuar, debe guardar los saldos"
      );
    } else {
      if (formTotales) {
        if (validarFechas2(formTotales?.fecha, fechaFija)) {
          await MySwal.fire({
            title: <strong>ADVERTENCIA</strong>,
            html: (
              <i>
                Está seguro de que desea grabar un nuevo registro de Totales?
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
              const row = await axios.post(url.rows, formTotales);

              if (row) {
                await axios.put(url.position, {
                  fecha: fecha,
                  position: data.length + 1,
                });

                setState(true);
              }

              alert("success", "Se guardaron los cambios");
            } else {
              alert("error", "ERROR. No se guardaron los cambios");
            }
          });
        } else {
          alert(
            "error",
            "ERROR. La fecha del nuevo registro debe ser correlativa con la última registrada"
          );
        }
      }
    }
  };

  return (
    <>
      <Modal show={showTotalesModal} onHide={handleCloseTotalesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Grabar totales en la BD - Seleccione Fecha</Modal.Title>
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
              onClick={(e) => grabarTotales(e)}
            >
              Agregar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
