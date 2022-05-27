/**           Formulario Principal - HomePage.js                      */
//styles de contenedor del formulario
const divForm = {
  border: "1px solid #000",
  display: "flex",
  justifyContent: "center",
  marginTop: "30px",
  marginBottom: "50px",
  paddingTop: "25px",
  paddingBottom: "30px",
};

//styles de formulario
const form = {
  width: "90%",
};

//styles del titulo del formulario principal, en archivo MainForm.js
const h4MainForm = {
  marginBottom: "30px",
  textAlign: "center",
};

/**                    Tabla de rows - MainTable.js            */
//styles de div contenedor de la tabla
const divTable = {
  border: "1px solid #000",
  marginBottom: "50px",
  position: "relative",
};

//styles de la tabla
const table = {
  maxWidth: "95%",
  marginTop: "50px",
  marginLeft: "10px",
  marginRight: "10px",
  marginBottom: "100px",
};

//styles del titulo de la tabla
const tableTitle = {
  marginTop: "25px",
  textAlign: "center",
};

//styles de div contenedor de mensajes hover de los botones de agregar
//saldos y totales
const rowWithButton = {
  position: "relative",
};

//styles de mensajes hover de los botones de agregar saldos y totales
const buttonMessageTotales = {
  display: "none",
  width: "100px",
  position: "absolute",
  backgroundColor: "#fff",
  border: "1px solid #000",
  fontSize: "10px",
  fontStyle: "italic",
  textAlign: "center",
  padding: "5px",
};

/**                               Footer                          */

//styles del footer principal
const footer = {
  backgroundColor: "#000",
  height: "30px",
};

/**                                Body                           */

//styles del body principal
const body = {
  height: "calc(100vh - 87.43px)",
  overflow: "scroll",
};

/**        Pagina de no encontrados - NotFoundPage.js             */

//styles del contenedor del mensaje de página no encontrada
const containerNotfound = {
  display: "flex",
  justifyContent: "center",
};

//styles del mensaje de página no encontrada
const notfound = {
  border: "1px solid #000",
  width: "500px",
  textAlign: "center",
  marginTop: "250px",
  fontSize: "30px",
  fontStyle: "italic",
};

//styles del contenedor de los botones para ver y descargar PDF
const divButtonsPDF = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingBottom: '30px',
  marginBottom: '15px'

}

export {
  divForm,
  containerNotfound,
  form,
  notfound,
  divTable,
  table,
  footer,
  body,
  tableTitle,
  buttonMessageTotales,
  rowWithButton,
  h4MainForm,
  divButtonsPDF
};
