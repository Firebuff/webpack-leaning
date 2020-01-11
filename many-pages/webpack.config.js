let path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin'); //引入模板生成插件


module.exports = { 

	/* 单页面时候 入口只有一个，写成一个字符串的形式； 打包多页面时候，因为入口是多个，要写成对象的形式 */

	// entry: './src/index.js',  // 单页面的写法
	
	entry: {
		home: './src/index.js', // home页面使用 index.js
		others: './src/other.js' // other页面使用 other.js
	},

	/* 

		单页面时候的输出配置由于只有一个页面，所有的js 都会打包到一个bundle.js；
		多页面时候，要把各个 js 打包 为单独的 js，此时需要设为： filename: '[name].js',
		name表示对应的各个js文件的名字, 后面还可以跟一些哈希值，如：
		filename: '[name].[hash:6]js',
	
	*/
	
	/*output: {
		filename: 'bundle.js', 
		path: path.resolve(__dirname,'dist') //单页面时候的打包
	},*/

	output: {
		filename: '[name].js',  // 打包后的js 的 名字为上面入口的属性名，而不是上面入口对应的文件名，比如这次会打包成 home.js, others.js这两个文件
		path: path.resolve(__dirname,'dist') //多页面时候的打包, dist 目录下会出现两个 js 文件
	},
	mode: 'development', //打包模式

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',  // 将不同HTML文件打包到输出目录下
			filename: 'home.html' ,
			chunks: ['home'],  //表示将哪个入口的文件打包后的文件引入到这个html文件中；如果不设置这个属性，会将所有入口的文件引入到改HTML中
		}),

		new HtmlWebpackPlugin({
			template: './src/other.html',
			filename: 'other.html',
			chunks: ['others','home'], //可以指定引入哪些入口的文件
		})
	]
}