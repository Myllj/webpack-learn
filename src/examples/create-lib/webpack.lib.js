/**
 * 这是一个例子：
 * 演示-创建 library https://v4.webpack.docschina.org/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library
 * 
 * 注意：
 * 1、运行该文件，可以回到根目录执行npm run build:lib命令，为什么不cd /src/examples/create-lib，在该文件夹里直接像根目录一样配置npm script然后再npm run build呢？
 * 可以这么做，但是需要在该文件夹下再安装webpack,才能找到webpack命令，演示例子为了方便，所以不这么做，都统一到根目录的配置npm script
 * 
 * 2、在根目录下执行npm run build:lib时，entry入口app: "./src/index.js"时,该./路径是从根路径开始检索的，所以要改成app: "./src/examples/create-lib/src/index.js",
 */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// console.log("path.resolve():", path.resolve(__dirname, "..", "..", "dist"));
module.exports = {
  mode: "production",
  // devtool: "source-map",
  entry: {
    // app: "./src/index.js",

    app: "./src/examples/create-lib/src/index.js",
   
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
