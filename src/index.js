import "index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "App";
import { Loader } from "components/core";
import { AppContextProvider } from "contexts";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Suspense>,
  document.getElementById("root")
);
