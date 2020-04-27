const workbox = require("workbox-webpack-plugin");
const html = require("html-webpack-plugin");
const path = require("path");
const css = require("mini-css-extract-plugin");

module.exports = {
  entry: "./public/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        test: /\.css$/,
        use: [
          {
            loader: css.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return (
                  path.relative(path.dirname(resourcePath), context) +
                  "/public/styles.css"
                );
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new html({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new css({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      template: "./public/styles.css",
      filename: "styles.css",
      ignoreOrder: false,
    }),
    new workbox.GenerateSW({
      swDest: "service-worker.js",
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
};
