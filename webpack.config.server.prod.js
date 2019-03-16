const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "production",
	entry: {
		server: path.join(__dirname, "src/server/server.js"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].js",
		libraryTarget: "commonjs2",
	},
	target: "node",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						caller: { target: "node" },
					},
				},
				include: [path.join(__dirname, "src")],
			},
			{
				test: /\.scss$/,
				use: ["css-loader", "sass-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["css-loader"],
				exclude: /node_modules/,
			},
		],
	},
	node: {
		__dirname: false, // if you don't put this is, __dirname
		__filename: false, // and __filename return blank or /
	},
	externals: [nodeExternals()],
};
