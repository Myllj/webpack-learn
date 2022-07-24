const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
    another: './src/another-module.js'//演示代码分离时放开
  },
  output: {
    // filename: "[name].bundle.js",
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      //引用图片时放开
      {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
      }
    ],
  },

  // 代码分离-防止重复，SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的 entry chunk 中
  // 演示时，请放开注释
  optimization: {
    splitChunks: {
      chunks: 'all'
      }
    }
};