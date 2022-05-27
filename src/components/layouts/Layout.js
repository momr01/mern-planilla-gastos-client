import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer";
import { body } from "../../helpers/styles";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />

      <div style={body}>{children}</div>

      <Footer />
    </>
  );
}
