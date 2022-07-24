 const path = require("path");
 const { CleanWebpackPlugin } = require("clean-webpack-plugin");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 module.exports = {
   mode: "production",
   entry: {
     index: "./src/examples/mult-page/src/index.js",
     about: "./src/examples/mult-page/src/about.js",
    
   },
   output: {
     filename: "[name].bundle.js",
     // filename: "[name].[contenthash].js",
     path: path.resolve(__dirname, "dist"),
   },
   plugins: [
     new CleanWebpackPlugin(),

    //更多HtmlWebpackPlugin配置。请参考文档 https://github.com/jantimon/html-webpack-plugin#options
     new HtmlWebpackPlugin({
       title: "index ",
       filename: 'index.html',
       template: './src/examples/mult-page/src/index.html',
       //表示index.html页面引入index.js
       chunks: ['index']
     }),
     new HtmlWebpackPlugin({
      title: "about ",
      filename: 'about.html',
      template: './src/examples/mult-page/src/index.html',
      chunks: ['about']
    }),
   ],
   module: {
     rules: [],
   },
 };
 