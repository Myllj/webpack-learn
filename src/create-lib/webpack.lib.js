
//演示-创建 library https://v4.webpack.docschina.org/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: "./src/create-lib/my-lib/index.js",
  },
  output: {
    // filename: "[name].bundle.js",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hellow666",
    }),
  ],
  module: {
    rules: [
      
    ],
  },
};
