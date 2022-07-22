# webpack学习
[官网](https://webpack.js.org/)



## 项目描述
> 这是一个跟着webpack官网指南从零搭建webpack的自用demo项目 
>备注：已大概跟着wepack4版本官网指南走了一遍，其他不清楚配置、api、webpack等请继续查阅官网


## 起步
```
安装
npm install webpack webpack-cli --save-dev

创建一个 bundle，演示基本配置
安装依赖
npm install --save lodash

运行
npx webpack

```

```
//src/index.js

//import './style.css';
import _ from 'lodash';


function component() {
  let element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

### 使用一个配置文件
```
//新建webpack.config.js
const path = require('path');
module.exports={
    entry:{
        index:'./src/index.js',
    },
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}

//运行
npx webpack --config webpack.config.js

npm scripts简化命令
//在package.json中script中添加配置,根目录下有webpack.config.js，，默认就使用从配置配件
"build": "webpack"
```


## 管理资源

[参考官网：](https://v4.webpack.docschina.org/guides/asset-management/)

### 加载css
```
//安装
npm install --save-dev style-loader css-loader

//webpack.config.js添加配置
  module: {
   rules: [
     {
       test: /\.css$/,
       use: [
         'style-loader',
         'css-loader'
       ]
     }
   ]
 }

//在src下添加style.css
.hello {
 color: red;
}

//在src/index.js
import './style.css';

element.classList.add('hello');
```

### 加载 images 图像
```
//安装
npm install --save-dev file-loader


//添加配置
{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
}

//找一张图片放到src目录下，

//index.js中
import Avatar from './avatar.png';


var myAvatar = new Image();
myAvatar.src = Avatar;
element.appendChild(myAvatar);

//同样在style.css中
background: url('./icon.png');
```

## 管理输出
[参考官网：](https://v4.webpack.docschina.org/guides/output-management/#预先准备)
### 预先准备
```
//首先，调整一下我们的项目,在src下新增print.js
export default function printMe() {
  console.log('I get called from print.js!');
}

//src/index.js
import printMe from './print.js';

var btn = document.createElement('button');
btn.innerHTML = '点击这里，然后查看 console！';
btn.onclick = printMe;

element.appendChild(btn);

//dist/index.html
<title>管理输出</title>
<script src="./print.bundle.js"></script>

<script src="./app.bundle.js"></script>

//webpack.config.js
 entry: {
     app: './src/index.js',
     print: './src/print.js'
   },

output: {
filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
}

```

### 设置 HtmlWebpackPlugin
```
//安装
npm install --save-dev html-webpack-plugin

//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

 plugins: [
     new HtmlWebpackPlugin({
       title: '管理输出'
     })
   ],
```

### 清理 /dist 文件夹
```
//安装
npm install --save-dev clean-webpack-plugin

//webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');

 plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '管理输出'
      })
],
```

### 踩坑: 
+ 报错：TypeError: CleanWebpackPlugin is not a constructor

```
//之前写法:
const CleanWebpackPlugin = require('clean-webpack-plugin')

//现在新版本的clean-webpack-plugin引入已经改为
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```


## 开发环境

[参考：](https://v4.webpack.docschina.org/guides/development/#使用-webpack-dev-server)

### 使用 webpack-dev-server

```
//安装
npm install --save-dev webpack-dev-server

//我们添加一个可以直接运行 dev server 的 script
"start": "webpack-dev-server --open",

//运行
npm run start

```

### 踩坑：
+ 报错：Error: Cannot find module 'webpack-cli/bin/config-yargs'

```
出错原因：发现是因为webpack-cli的新版本对webpack-dev-server版本的不兼容
解决:降低webpack-cli的版本为 "^3.3.12"
npm i webpack-cli@3.3.12 -D
```


## 模块热替换(参考：https://v4.webpack.docschina.org/guides/hot-module-replacement/ )
--


## tree shaking(參考：https://v4.webpack.docschina.org/guides/tree-shaking/#添加一个通用模块)
--


## 生产环境
[参考：](https://v4.webpack.docschina.org/guides/production/)
```
//安装
npm install --save-dev webpack-merge

//在src下新建webpack.common.js、webpack.dev.js、webpack.prod.js，删除webpack.config.js

//webpack.common.js
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Production",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      //   {
      //       test: /\.(png|svg|jpg|gif)$/,
      //       use: [
      //         'file-loader'
      //       ]
      //   }
    ],
  },
};


//webpack.dev.js
 const {merge} = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
     hot: true
   }
 });

//webpack.prod.js
 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'production',
   devtool: 'source-map'
 });

//package.json在配置npm scripts 
"start": "webpack-dev-server --open --config webpack.dev.js",
"build": "webpack --config webpack.prod.js"

//要注意，任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的：例如src/index.js
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }

```

## 代码分离
[参考：](https://v4.webpack.docschina.org/guides/code-splitting/#入口起点-entry-points-)

```
 entry: {
    app: "./src/index.js",
     // another: './src/another-module.js'//演示代码分离时放开
  },


   // 代码分离-防止重复，SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的 entry chunk 中
  // 演示时，请放开注释
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //     }
  //   }
  ```
