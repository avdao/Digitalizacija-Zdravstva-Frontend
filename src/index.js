import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "react-modal-hook";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <BrowserRouter>
    <ModalProvider>
    <App />
    </ModalProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();