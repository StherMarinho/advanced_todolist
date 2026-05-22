//responsabilidade: envolver toda aplicação.
import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router";
import { theme } from "./theme/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};