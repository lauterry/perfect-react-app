function isWebTarget(caller) {
	return Boolean(caller && caller.target === "web");
}

module.exports = api => {
	// api.cache(true);

	const web = api.caller(isWebTarget);

	const presets = [
		[
			"@babel/preset-env",
			{
				targets: ["last 3 versions", "not dead", "not < 1%"],
				useBuiltIns: "usage",
			},
		],
		"@babel/preset-react",
	];

	const plugins = [
		["@loadable/babel-plugin"],
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-syntax-dynamic-import",
	];

	if (!web) {
		plugins.push(["dynamic-import-node", {"noInterop": true}]);
	}

	return {
		presets,
		plugins,
	};
};
