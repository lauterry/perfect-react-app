import React from "react";
import {render} from "react-dom";
import {loadableReady} from "@loadable/component";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {Router} from "react-router-dom";
import getHistory from "./configureHistory";
import {Provider} from "react-redux";
import App from "./App";

const store = createStore(reducers, applyMiddleware(thunk));

loadableReady(() => {
	render(<Provider store={store}>
		<Router history={getHistory()}>
			<App/>
		</Router>
	</Provider>, document.getElementById("perfectstay"));
});

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
