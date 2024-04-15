import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "rodal/lib/rodal.css";
import { GlobalContext } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalContext>
    <>
      <ToastContainer />
      <App />
    </>
  </GlobalContext>
);
