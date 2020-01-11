/* 全局变量 */

/* 
	import $ from 'jquery';

	console.log($) // 可以打印出fn函数

	console.log(window.$) //输出undefined，因为webpack没有挂载在window对象下，它把jq 打包成了闭包的形式

*/




/* 如何让jq 暴露为全局变量？ 我们可以使用 expose-loader （内联loader）  来使用jq暴露为全局变量 */

// loader可以分为 pre loader： 前面执行的loader，normal loader： 普通loader， 内联loader



// 使用暴露全局的内联loader 将变量暴露到全局： expose-loader， yarn add expose-loader -D

// import $ from 'expose-loader?$!jquery'; //把jq暴露为$ 挂载在window下

// console.log('jq:' + window.$) //这样可以打印出来了，



/* 我们也可以在module里面的rules里面配置 */

// import $ from 'jquery';
// console.log('jq 打印:' + window.$)



/* 也可以在每个模块中注入$ 对象 */

// console.log('jq 打印的:' + $)



/* 
	如果在HTML 中通过 src 导入了jq， 然后再用 import $ from 'jquery' 这种方式引入，会再打包一层的
	此时我们可以在webpack.config.js中配置，不让他打包

	externals: {
		jquery: "$"
	}

*/

/*import $ from 'jquery'

console.log('jq 打印===:' + $)*/






/* 暴露全局变量的方法: 

	1. 使用expose-loader 暴露到window上

	2. new webpack.ProvidePlugin({
    		$: 'jquery'
    	}) 给每个模块 注入一个$

	3. 引入不打包
*/ 





/*
	图片打包处理的情况：
	1. 在js中创建图片来引入
	2. 在css中 backgroun('url') 引入
	3. <img src="" /> 方式引入
	
 */


// 在js中创建图片来引入

import img from './test.jpg'; // 把图片引入，返回的结果是一个新的图片的地址

console.log(img) // 会报错，需要使用一个合适的loader来处理： file-loader，他会把图片生成到打包后的文件里，吧生成图片的名字返回来

// 也可以用 url-loader 来代替file-loader，他提供的功能更多，可以将图片转成base64


let image = new Image();

image.src = img;

// image.src = './test.jpg'; // 这样引用image.src 的值就一个字符串，就没有图片的资源引入进来

document.body.appendChild(image)


//  在css中 backgroun('url') 引入, 这个css-loader 已经帮我们处理好了
 

// <img src="" /> 方式引入, 需要使用html-loader















let str  = require('./a.js');

console.log(str)
require('./index.css')
require('./index.less')

let a = () => {
	console.log('hello');
}

a();

class A {
	a = 1;
}



