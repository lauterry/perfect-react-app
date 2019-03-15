const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			excludeChunks: ["server"],
		}),
	],
};
