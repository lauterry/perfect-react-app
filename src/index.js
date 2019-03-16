import React from "react";
import {render} from "react-dom";
import App from "./App";
import {Router} from "react-router-dom";
import {loadableReady} from "@loadable/component";
import getHistory from "./configureHistory";

loadableReady(() => {
	render(
		<Router history={getHistory()}>
			<App/>
		</Router>,
		document.getElementById("perfectstay")
	);
});

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
