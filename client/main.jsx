import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { App } from "/imports/ui/App";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);

  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  
  );
});
