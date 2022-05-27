import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { h4MainForm } from "../../helpers/styles";

export default function MainForm(props) {
  //props
  const {
    divForm,
    form,
    setFecha,
    setDescripcion,
    setDebe,
    setHaber,
    sendData,
  } = props;

  return (
    <div style={divForm}>
      <Form style={form}>
        <h4 style={h4MainForm}>Agregar nuevos movimientos:</h4>
        <Form.Group className="mb-3">
          <Form.Label>Fecha:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setFecha(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca la descripción..."
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Row>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Debe:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Importe en Debe"
              onChange={(e) => setDebe(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Haber:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Importe en Haber"
              onChange={(e) => setHaber(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="No soy un robot" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e) => sendData(e)}>
          Agregar
        </Button>
      </Form>
    </div>
  );
}
