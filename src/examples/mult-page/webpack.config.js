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
     new HtmlWebpackPlugin({
       title: "index ",
       filename: 'index.html',
       template: './src/examples/mult-page/src/index.html',
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
 