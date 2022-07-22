const {merge} = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
    /* 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要,
    默认情况下，将使用当前工作目录作为提供内容的目录。将其设置为 false 以禁用 contentBase。 */
    //  contentBase: './dist',
     hot: true,//开启热更新
     port:8001,
     host: '127.0.0.1',
    //  host: '0.0.0.0',
    // https: true,
    proxy: {
      '/home': {
        target: 'http://localhost:3000',
        /**此时访问：http://127.0.0.1:8001/home-》可以查看下面/test.html内容
         * bypass官网：https://v4.webpack.docschina.org/configuration/dev-server/#devserver-proxy
         * 掘金文章：https://juejin.cn/post/6850418120436383758
         */
        bypass: function(req, res, proxyOptions) {
            console.log('proxy...',req.headers);
            console.log('Skipping proxy for browser request.');

            /* 官网示例，例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做： */
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('inner...');
              return '/test.html';
            }
        }
      }
    }
   }
 });
