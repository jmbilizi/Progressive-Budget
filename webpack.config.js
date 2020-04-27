const workbox = require("workbox-webpack-plugin");
const html = require("html-webpack-plugin");
const path = require("path");
const css = require("mini-css-extract-plugin");
const WebpackPwaManifest = require("webpack-manifest-plugin");

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
    new WebpackPwaManifest({
      // the name of the generated manifest file
      filename: "manifest.json",

      // we aren't using webpack to generate our html so we
      // set inject to false
      inject: false,

      // set fingerprints to `false` to make the names of the generated
      // files predictable making it easier to refer to them in our code
      fingerprints: false,

      name: "budget-app",
      short_name: "budget",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      start_url: "https://pwa-budget.herokuapp.com/",
      display: "standalone",

      icons: [
        {
          src: path.resolve(__dirname, "/public/icons/icon-512x512.png"),
          // the plugin will generate an image for each size
          // included in the size array
          size: [72, 96, 128, 144, 152, 192, 384, 512],
        },
      ],
    }),
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
