const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
	mode: "development",
	entry: {
		main: ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./src/index.js"],
	},
	devtool: "source-map",
	plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
});
