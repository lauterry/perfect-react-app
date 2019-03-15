const path = require("path");
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].js",
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						caller: {target: "web"},
					},
				}
			},
		],
	},
	plugins: [
		new LoadablePlugin(),
	]
};
