import React from "react";
import { render } from "react-dom";
import App from "./App";

render(<App />, document.getElementById("app"));

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
