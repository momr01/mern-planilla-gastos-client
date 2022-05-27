import React from "react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="loading">
      <Spin size="large" />
      <br />
      <h5>Cargando...</h5>
    </div>
  );
}
