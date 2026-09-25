import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { syncPendingActivities } from "./offline/syncService";

window.addEventListener(
  "online",
  async () => {

    console.log(
      "Internet connection restored."
    );

    await syncPendingActivities();

  }
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);