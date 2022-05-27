import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer } from "react-toastify";
import { divForm, form, divButtonsPDF } from "../helpers/styles";
import MainForm from "../components/MainForm";
import { validarFechas2, alert } from "../helpers/metodos";
import MainTable from "../components/MainTable";
import GrabarTotales from "../components/GrabarTotales/GrabarTotales";
import url from "../helpers/url";
import { Link } from "react-router-dom";
import routes from "../helpers/routes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../components/PDF";

export default function HomePage() {
  /**              USESTATES                       */
  //useestate para obtener y recargar datos de la tabla
  const [data, setData] = useState();
  const [state, setState] = useState(true);

  //usestate para los inputs del formulario principal
  const [fecha, setFecha] = useState();
  const [descripcion, setDescripcion] = useState();
  const [debe, setDebe] = useState(0);
  const [haber, setHaber] = useState(0);
  const [formData, setFormData] = useState();

  //usestate para mostrar y grabar el saldo en forma dinamica
  const [habilitarSaldo, setHabilitarSaldo] = useState(false);
  const [showSaldo, setShowSaldo] = useState(false);
  const [saldoD, setSaldoD] = useState({
    state: false,
    value: null,
  });
  const [saldoA, setSaldoA] = useState({
    state: false,
    value: null,
  });
  const [formTotales, setFormTotales] = useState();

  //usestate para obtener los totales antes del saldo
  const [tdebe, setTdebe] = useState(0);
  const [thaber, setThaber] = useState(0);

  //usestate para obtener la ultima fecha registrada en la BD
  const [fechaFija, setFechaFija] = useState();

  //usestate para obtener la ultima posicion registrada en la BD
  //para saber desde qué row deben calcularse los totales
  const [dataPos, setDataPos] = useState();

  //usestate para manejar el modal de Saldos
  const [showSaldoModal, setShowSaldoModal] = useState(false);
  const handleCloseSaldoModal = () => setShowSaldoModal(false);
  const handleShowSaldoModal = () => setShowSaldoModal(true);

  //usestate para manejar el modal de Totales
  const [showTotalesModal, setShowTotalesModal] = useState(false);
  const handleCloseTotalesModal = () => setShowTotalesModal(false);
  const handleShowTotalesModal = () => setShowTotalesModal(true);

  ///////////////////////////////////////////////////////////////////////

  /**                USEEFFECTS                            */

  //useeffect para inicializar inputs de formulario principal
  useEffect(() => {
    const setValues = () => {
      setFormData({
        fecha,
        descripcion,
        debe,
        haber,
      });
    };
    setValues();
  }, [fecha, descripcion, debe, haber]);

  //useeffect para inicializar inputs de formulario modal de totales
  useEffect(() => {
    const setValuesForm2 = () => {
      setFormTotales({
        fecha,
        descripcion: "Totales",
        debe: tdebe,
        haber: thaber,
      });
    };

    setValuesForm2();
  }, [fecha, tdebe, thaber]);

  //useeffect para obtener datos de BD y la posicion
  //tambien para calcular los totales
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(url.rows);

      if (data?.data && state) {
        setData(data.data);
      }
    };

    const getPosition = async () => {
      const pos = await axios.get(url.position);

      if (pos?.data) {
        setDataPos(pos.data.position);
        setFechaFija(pos.data.fecha);
      }
    };

    getData();
    getPosition();

    sumarDebe();
    sumarHaber();

    setState(false);
    setShowSaldo(true);

    if (showSaldo) {
      setShowSaldo(false);

      setHabilitarSaldo(true);
    }
  }, [data, state, dataPos]);

  ///////////////////////////////////////////////////////////////////////

  /**                OTRAS VARIABLES                                */

  //sweetalert2
  const MySwal = withReactContent(Swal);

  //obtener total del debe
  const sumarDebe = () => {
    let total = 0;

    data?.forEach((key, index) => {
      if (index >= dataPos) {
        total += key.debe;
      }
    });

    setTdebe(total);
  };

  //obtener total del haber
  const sumarHaber = () => {
    let total = 0;

    data?.forEach((key, index) => {
      if (index >= dataPos) {
        total += key.haber;
      }
    });

    setThaber(total);
  };

  /////////////////////////////////////////////////////////////////////

  //metodo para tratar los datos que son enviados desde el formulario principal
  const sendData = async (e) => {
    e.preventDefault();

    if (data[data.length - 1]?.descripcion === "Totales") {
      alert("error", "Debe grabar los saldos antes de continuar");
    } else {
      if (
        fecha?.length > 0 &&
        descripcion?.length > 0 &&
        debe?.length > 0 &&
        haber?.length > 0
      ) {
        if (validarFechas2(fecha, fechaFija)) {
          await MySwal.fire({
            title: <strong>ADVERTENCIA</strong>,
            html: <i>Está seguro de que desea grabar un nuevo registro?</i>,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Grabar`,
          }).then(async (value) => {
            if (value.isConfirmed) {
              const guardarRow = await axios.post(url.rows, formData);

              if (guardarRow) {
                await axios.put(url.position, { fecha: fecha });
                setState(true);
              }

              alert("success", "CORRECTO! Se guardaron los cambios");
            } else {
              alert("error", "ERROR. No se guardaron los cambios");
            }
          });
        } else {
          await MySwal.fire({
            title: <strong>ERROR</strong>,
            html: (
              <i>
                La fecha ingresada debe ser correlativa con la del último
                registro
              </i>
            ),
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#d33",
            confirmButtonText: `Entendido`,
          });
        }
      } else {
        console.log("falta");
      }
    }
  };

  //metodo para mostrar mensaje al pasar cursor sobre boton de agregar
  //registro de totales
  const showMessageT = () => {
    document.getElementById("divMessage").style.display = "block";

    document.getElementById("divMessage").textContent =
      "Agregar nuevo registro de Totales";
  };

  //metodo para ocultar mensaje
  const hideMessage = () => {
    document.getElementById("divMessage").style.display = "none";
  };

  return (
    <>
      <Container>
        <MainForm
          divForm={divForm}
          form={form}
          setFecha={setFecha}
          setDescripcion={setDescripcion}
          setDebe={setDebe}
          setHaber={setHaber}
          sendData={sendData}
        />

        <MainTable
          data={data}
          tdebe={tdebe}
          thaber={thaber}
          habilitarSaldo={habilitarSaldo}
          showMessageT={showMessageT}
          hideMessage={hideMessage}
          handleShowSaldoModal={handleShowSaldoModal}
          saldoA={saldoA}
          saldoD={saldoD}
          setSaldoA={setSaldoA}
          setSaldoD={setSaldoD}
          setState={setState}
          dataPos={dataPos}
          fechaFija={fechaFija}
          showSaldoModal={showSaldoModal}
          handleCloseSaldoModal={handleCloseSaldoModal}
          showTotalesModal={showTotalesModal}
          handleCloseTotalesModal={handleCloseTotalesModal}
          handleShowTotalesModal={handleShowTotalesModal}
        />

        <GrabarTotales
          showTotalesModal={showTotalesModal}
          handleCloseTotalesModal={handleCloseTotalesModal}
          fecha={fecha}
          setFecha={setFecha}
          data={data}
          formTotales={formTotales}
          setFormTotales={setFormTotales}
          tdebe={tdebe}
          thaber={thaber}
          fechaFija={fechaFija}
          setState={setState}
        />

        <div style={divButtonsPDF}>
          <Button as={Link} to={routes.pdf}>
            Ver PDF
          </Button>

          {data && (
            <PDFDownloadLink
              document={<PDF data={data} />}
              fileName="planilla-gastos.pdf"
            >
              <Button variant='success'>Descargar PDF</Button>
            </PDFDownloadLink>
          )}
        </div>
      </Container>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
