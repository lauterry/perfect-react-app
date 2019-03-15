import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

render(
	<Router history={createBrowserHistory()}>
		<App />
	</Router>,
	document.getElementById("app")
);

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
