const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "development",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	target: "node",
	devtool: "source-map",
	node: {
		__dirname: false, // if you don't put this is, __dirname
		__filename: false, // and __filename return blank or /
	},
	externals: [nodeExternals()],
	entry: {
		server: path.join(__dirname, "src/server/server.js"),
	},
};
