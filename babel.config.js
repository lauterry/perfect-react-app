module.exports = api => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: ["last 3 versions", "not dead", "not < 1%"],
        useBuiltIns: "usage"
      }
    ],
    "@babel/preset-react"
  ];

  const plugins = [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ];

  return {
    presets,
    plugins
  };
};
