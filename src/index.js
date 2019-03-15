import React from "react";
import {render} from "react-dom";
import App from "./App";
import {Router} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {loadableReady} from "@loadable/component";

loadableReady(() => {
	render(
		<Router history={createBrowserHistory()}>
			<App/>
		</Router>,
		document.getElementById("perfectstay")
	);
});

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
