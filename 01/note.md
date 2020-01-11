## webpack 的安装
1. 安装本地的webpack
	1. webpack webpack-cli -D

## webpack可以进行 0 配置
1. 默认打包的文件目录是 **src**, 入口文件是 **index.js**
2. 执行 npx webpack 命令就可以打包
3. 支持node的模块打包
	+ a.js导出 
		```
			module.exports = 'exoprting';
		```
	+ index.js 引入
		```
			let str  = require('./a.js');
			console.log(str)
		```
	+ 最终打包成一个文件

## 除了 0 配置外，我们还可以手动配置webpack手动创建
1. 在根目录手动创建名字为的 webpack.config.js 的默认文件
	```
	// webpack 是用node.js写出来的，可以使用node的写法

	let path = require('path') //引入node 的核心模块

	//common.js的模块化的语法
	module.exports = {
		mode: 'development', // 模式： 默认两种production 和 development
		entry: './src/index.js', // 入口文件
		output: {
			filename: 'bundle.js',
			// 打包后的文件的路径（必须是一个绝对路径）path_resolve就是将test解析成为一个绝对路径
			path: path_resolve(__dirname,'test'), 
	}
	```
2. 也可以改变webpack.config.js 的文件名可以在名命令行中执行以下命令 --config + 自定义的文件名
	+ npx webpack --config webpack.config.my.js

3. 在命令行执行 --config xxxx 这些自定义的操作繁琐了，也不方便操作。为简化操作，我们可以在package.json文件中 添加一个scripts json对象来配置相关的自定义操作（也就是配置脚本）
	
	```
	"scripts": {
   		"build": "webpack --config webpack.config.selfdefined.js"
  	}
	 ```
	当在命令行中执行 npm run build 就会相当于执行 webpack --config webpack.config.selfdefined.js 这个命令，只不过是配置scripts时候可以省略npx

## 使用webpack-dev-server 可以帮我们在本地创建一个服务器，不用每次都打包完成后都要打开文件查看修改后的效果，他是打包到内存中，在本地是找不到文件的
1. 安装 yarn add webpack-dev-server -D 
2. 执行 npx webpack-dev-server（也可以在package.json文件的script脚本中配置）
3. 此时，所创建的服务器是以本项目的根目录 作为服务器的根目录的
4. 我们可以在webpack配置文件中修改本地服务器（开发服务器）的根目录，让他把打包后的文件的目录作为本地服务器的根目录