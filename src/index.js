import _ from 'lodash';
import './assets/style/style.css';
// import Avatar from './assets/images/avatar.jpg';
import printMe from './print.js';

function component() {
  let element = document.createElement('div');
  
  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // 加载css
  element.classList.add('hello');

  //加载 images 图像
  var myAvatar = new Image();
  myAvatar.src = Avatar;
  element.appendChild(myAvatar);

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