import React from "react";
import { Container } from "react-bootstrap";
import { notfound, containerNotfound } from "../helpers/styles";

export default function NotFoundPage() {
  return (
    <Container style={containerNotfound}>
      <div style={notfound}>NO EXISTE LA PÁGINA</div>
    </Container>
  );
}
