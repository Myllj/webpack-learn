import _ from 'lodash';
import './assets/style/style.css';
// import Avatar from './assets/images/avatar.jpg';
import printMe from './print.js';

/**
 * 演示引用一个自己打包的library时，放开注释
 * 首先-在根目录执行npm run build2打包src/examples/create-lib下的库
 * 然后-在根目录执行npm run start或npm run build1查看该library使用ESmodule引入效果
 * 备注：1、可以通过src/examples/create-lib/index.html查看通过script标签的引入效果
 * 2、可以通过cd src/create-lib目录下npm run build2生成dist后，通过npm public发布该包，后续再在其他项目import
 */
// import {numToWord} from './create-lib/dist/library'
// console.log('numToWord8888',numToWord(2));

function component() {
  let element = document.createElement('div');
  
  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // 加载css
  element.classList.add('hello');

  //加载 images 图像
  // var myAvatar = new Image();
  // myAvatar.src = Avatar;
  // element.appendChild(myAvatar);

  var btn = document.createElement('button');
  btn.innerHTML = '点击这里，然后查看 console！';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

//要注意，任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的：例如src/index.js
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}