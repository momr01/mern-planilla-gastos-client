import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../helpers/url";
import { PDFViewer } from "@react-pdf/renderer";
import Loading from "../components/Loading";
import PDF from "../components/PDF";

export default function SeePdf() {
  //usestate para guardar datos de BD
  const [data, setData] = useState();

  //useeffect para obtener data de base de datos
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(url.rows);

      if (data?.data) {
        setData(data.data);
      }
    };

    getData();
  }, []);

  return (
    <>
      {data ? (
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PDF data={data} />
        </PDFViewer>
      ) : (
        <Loading />
      )}
    </>
  );
}
