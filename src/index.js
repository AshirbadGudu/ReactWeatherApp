import "index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "App";
import { Loader } from "components/core";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
