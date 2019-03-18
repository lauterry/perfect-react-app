const { resolve } = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
	entry: resolve(__dirname, "index.js"),
	target: "node",
	output: {
		path: resolve(__dirname, "../build/server-e2e"),
		filename: "index.js",
		libraryTarget: "commonjs2",
	},
	plugins: [
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				process.env.NODE_ENV === "production" ? "production" : "development"
			),
		}),
		new UglifyJSPlugin(),
	],
};
