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
import {addLocaleData, IntlProvider} from 'react-intl';

const store = createStore(reducers, applyMiddleware(thunk));
const initialState = window.__INITIAL_STATE__;
const shop = initialState.shop;
const lang = shop.slice(0, 2);

loadableReady(() => {
	import(/* webpackChunkName: "locale" */ `react-intl/locale-data/${lang}`).then((locale) => {
		addLocaleData([...locale.default]);

		import(/* webpackChunkName: "messages" */ `./i18n/${lang}.json`).then((messages) => {
			render(<Provider store={store}>
				<IntlProvider
					locale={lang}
					messages={messages.default}
				>
					<Router history={getHistory(shop)}>
						<App/>
					</Router>
				</IntlProvider>
			</Provider>, document.getElementById("perfectstay"));
		});
	});
});

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
