import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.config.dev.js";

const app = express();
const DIST_DIR = path.join(__dirname);
const HTML_FILE = path.join(DIST_DIR, "index.html");
const compiler = webpack(config);

app.use(express.static(DIST_DIR));

app.use(
	webpackDevMiddleware(compiler, {
		reload: true,
		noInfo: true,
		publicPath: config.output.publicPath,
	})
);

app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res) => {
	compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
		if (err) {
			return next(err);
		}
		res.set("content-type", "text/html");
		res.send(result);
		res.end();
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
	console.log("Press Ctrl+C to quit.");
});
