import { toast } from "react-toastify";

//metodo para mostrar la fecha en formato DD/MM/AAAA
const formatoFecha = (fecha) => {
  const day = fecha.substr(8, 2);
  const month = fecha.substr(5, 2);
  const year = fecha.substr(0, 4);

  const fullDate = `${day}/${month}/${year}`;
  return fullDate;
};

//metodo para comparar nueva fecha con la grabada en la BD
//antes de grabar las rows de totales y saldos
const validarFechas2 = (f1, f2) => {
  const day1 = f1.substr(8, 2);
  const month1 = f1.substr(5, 2);
  const year1 = f1.substr(0, 4);

  const day2 = f2.substr(8, 2);
  const month2 = f2.substr(5, 2);
  const year2 = f2.substr(0, 4);

  let fecha1 = new Date(year1, month1 - 1, day1);
  let fecha2 = new Date(year2, month2 - 1, day2);

  if (fecha1 >= fecha2) {
    return true;
  } else {
    return false;
  }
};

//metodo para mostrar alertas de react-toastify
const alert = (type, text) => {
  const propiedades = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  if (type === "error") {
    toast.error(text, propiedades);
  } else {
    toast.success(text, propiedades);
  }
};

//metodo para mostrar un numero con separador de miles
const separadorMiles = (dato) => {
  const number = dato;

  const newNumber = new Intl.NumberFormat("de-DE").format(number);

  return newNumber;
};

export { formatoFecha, validarFechas2, alert, separadorMiles };
