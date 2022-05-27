import React from "react";
import { Navbar, Container } from "react-bootstrap";
import routes from "../../helpers/routes";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <Navbar
        className="navigation"
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
      >
        <Container>
          <Navbar.Brand as={NavLink} to={routes.home}>
            Inicio
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
