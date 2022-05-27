import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SeePdf from "../pages/SeePdf";

//helpers
import routes from "../helpers/routes";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route exact path={routes.home} element={<HomePage />} />
        <Route exact path={routes.pdf} element={<SeePdf />} />
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
