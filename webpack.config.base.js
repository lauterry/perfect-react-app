const path = require("path");

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
						caller: { target: "web" },
					},
				}
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
};
