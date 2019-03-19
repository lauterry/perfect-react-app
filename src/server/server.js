import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import ReactDOMServer from "react-dom/server";
import config from "../../webpack.config.dev.js";
import {StaticRouter} from "react-router";
import App from "../App";
import React from "react";
import {ChunkExtractor} from "@loadable/server";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {IntlProvider} from 'react-intl';
import {matchPath} from "react-router-dom";
import ListContainer from "../ListContainer";
import {getProducts} from "../actions";

const statsFile = path.join(__dirname, "loadable-stats.json");

const app = express();
const DIST_DIR = path.join(__dirname);
const compiler = webpack(config);

app.use(express.static(DIST_DIR));

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	})
);

app.use(webpackHotMiddleware(compiler));

app.use("/:shop?", (req, res, next) => {
	const {shop} = req.params;
	req.shop = shop;
	next();
});

app.get("*", (req, res) => {
	const shop = req.shop;
	const lang = shop.slice(0, 2);
	const context = {};

	const routes = [
		{
			path: `/${shop}/list`,
			component: ListContainer,
			loadData: getProducts
		}
	];

	// inside a request
	const promises = [];
	// use `some` to imitate `<Switch>` behavior of selecting only
	// the first to match

	const store = createStore(reducers, {shop}, applyMiddleware(thunk));

	routes.some(route => {
		const match = matchPath(req.path, route);
		if (match) promises.push(store.dispatch(route.loadData()));
		return match;
	});

	Promise.all(promises).then(() => {
		import(/* webpackChunkName: "messages" */ `../i18n/${lang}.json`).then((messages) => {
			const InitialComponent = (
				<Provider store={store}>
					<IntlProvider
						locale={lang}
						messages={messages}
					>
						<StaticRouter basename={`/${shop}`} location={req.url} context={context}>
							<App/>
						</StaticRouter>
					</IntlProvider>
				</Provider>
			);

			const extractor = new ChunkExtractor({statsFile});
			const jsx = extractor.collectChunks(InitialComponent);

			const componentHTML = ReactDOMServer.renderToString(jsx);

			const scriptTags = extractor.getScriptTags();
			const linkTags = extractor.getLinkTags();
			const styleTags = extractor.getStyleTags();

			const htmlString = `
	<!DOCTYPE html>
	<html lang="${lang}">
	<head>
		<meta charset="utf-8">
			<meta name="apple-mobile-web-app-capable" content="yes">
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
					${linkTags}
					${styleTags}
	</head>
	<body>
	<div id="perfectstay">
		<div>${componentHTML}</div>
	</div>
	${scriptTags}
	<script type="application/javascript">
			window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
	</script>
	</body>
	</html>
`;

			if (context.url) {
				res.writeHead(302, {
					Location: context.url,
				});
				res.end();
			} else {
				res.set({
					"Content-Type": "text/html",
					"Cache-Control": "public, max-age=0, s-maxage=600",
				});

				res.send(htmlString);
				res.end();
			}
		});
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
	console.log("Press Ctrl+C to quit.");
});
