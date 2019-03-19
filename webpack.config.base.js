const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require("@loadable/webpack-plugin");
const webpack = require("webpack");

const brand = process.env.BRAND || 'af';

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "[name]-[hash].js",
		chunkFilename: "[name]-[chunkhash].js",
	},
	target: "web",
	resolve: {
		modules: [path.resolve(__dirname, 'src'),  'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.woff|eot|svg|otf|ttf|woff2$/,
				loader: "url-loader", // fonts needs to be in a font folder
				options: {
					limit: 1000,
					name: "font/[name].[ext]",
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						caller: {target: "web"},
					},
				},
			},
		],
	},
	plugins: [new CopyPlugin([
		{from: 'static', to: 'static'},
	]), new LoadablePlugin(), new webpack.NormalModuleReplacementPlugin(/(.*)@brand(\.*)/, function(resource) {
		resource.request = resource.request.replace(/@brand/, `brands/${brand}`);
	})],
};
