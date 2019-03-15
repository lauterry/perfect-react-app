import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import ReactDOMServer from "react-dom/server";
import config from "../../webpack.config.dev.js";
import {StaticRouter} from "react-router";
import App from "../App";
import React from 'react';
import { ChunkExtractor } from '@loadable/server';
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

app.get("*", (req, res) => {

	const context = {};

	const InitialComponent = (
		<StaticRouter location={req.url} context={context}>
			<App/>
		</StaticRouter>
	);

	const extractor = new ChunkExtractor({ statsFile })
	const jsx = extractor.collectChunks(InitialComponent)

	const componentHTML = ReactDOMServer.renderToString(jsx);

	const scriptTags = extractor.getScriptTags();
	console.log(scriptTags);
	const linkTags = extractor.getLinkTags();
	console.log(linkTags);
	const styleTags = extractor.getStyleTags();
	console.log(styleTags);

	const htmlString = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	</head>
	<body>
		<div id="perfectstay">
			<div>${componentHTML}</div>
		</div>
		<script async src="./main.js"></script>
	</body>
</html>`;

	if (context.url) {
		res.writeHead(302, {
			Location: context.url
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
	console.log("Press Ctrl+C to quit.");
});
