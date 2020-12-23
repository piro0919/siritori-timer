import { StrictMode } from "react";
import { hydrate, render } from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "ress";
import Containers from "containers";
import "./styles/global.scss";
import { BrowserRouter as Router } from "react-router-dom";
import "rc-slider/assets/index.css";

const rootElement = document.getElementById("root");
const element = (
  <StrictMode>
    <Router>
      <Containers />
    </Router>
  </StrictMode>
);

if (rootElement && rootElement.hasChildNodes()) {
  hydrate(element, rootElement);
} else {
  render(element, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
