//演示-创建 library https://v4.webpack.docschina.org/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("path.resolve():", path.resolve(__dirname, "..", "..", "dist"));
module.exports = {
  mode: "production",
  // devtool: "source-map",
  entry: {
    app: "./src/create-lib/src/index.js",
  },
  output: {
    // filename: "[name].bundle.js",
    // filename: "[name].[contenthash].js",
    filename: "library.js",
    path: path.resolve(__dirname, "dist"),//当前目录
    // path: path.resolve(__dirname, "..", "..", "dist"), //去往根目录wp-official-guide
    library: 'root',//暴露 library，root=》通过script标签引入该library时，全局变量root就是挂载该库
    libraryTarget: 'umd'//通用的打包形式，打包后的库，可以通过AMD、CommonJS 、ESmodule引入

  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "This is library ",
    }),
  ],
  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    },
  },
  module: {
    rules: [],
  },
};
