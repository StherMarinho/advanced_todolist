//responsabilidade: envolver toda aplicação.
import React from "react";

import { RouterProvider } from "react-router-dom";

import router from "./routes/router";

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
};