/* eslint-disable */

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production", // or "development"
  entry: "./src/ts/index.ts",
  output: {
    path: __dirname + "/docs/",
    filename: "cmn/js/clock.js"
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: "ts-loader"
      }, {
        loader: "eslint-loader",
        options: {
          configFile: "./package.json"
        }
      }]
    }, {
      test: /\.pug$/,
      use: "pug-loader"
    }, {
      test: /\.scss/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 2
          }
        }, {
          loader: "sass-loader"
        }
      ]
    }]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
    })
  ]
};
