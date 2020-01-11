
let path = require('path')

let HtmlWebpackPlugin = require('html-webpack-plugin') // 引入插件 

let webpack = require('webpack')





module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname,'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),

		//自定义变量到全局，比如说开发时是localhost，上线是要切换成服务器的域名http://www.xxx.com, 此时我们可以定义一个值用来判断该使用哪个
		new webpack.DefinePlugin({ 

			// 'dev' 会视作一个变量 dev， 而是字符串 'dev'; 如果想要变成字符串可以这样用 "'dev'"，但是这样写太low了，
			// 可以这样 JSON.tringify('dev'); 但是如果是布尔值的，可以直接写 'true'或者'false', 会变 true或者false
			
			// DEV: 'dev' 
			DEV: JSON.stringify('dev'), // 打印结果是 字符串 dev
			FL: 'true', // 打印结果是 布尔类型值 true

			RESULT: JSON.stringify('1+1'), //打印结果是 1+1
			RESULT01: '1+1' // 打印结果是 2
		}),
	],
	devServer: {
		// port: 8080,
		port: 3000,
		open: true,

		// 使用http-proxy 实现代理
		
		// proxy: {
		// 	// '/api': 'http://localhost:3000', // 凡是以 /api 开头的请求都到 http://localhost:3000 上去拿数据, 当要重写路径时候要写成对象的形式
			
			
		// 	// 当要重写路径时候要写成对象的形式
			
		// 	'/api': {

		// 		target: 'http://localhost:3000',

		// 		pathRewrite: { // 请求路径重写
		// 			'^/api': '',

		// 			/* 
		// 			 	将所有以 '/api' 开头的请求的开头设置为 空字符 '' ，
		// 			 	也就是去掉/api，/api/user的请求改写为 /user, 那么此时代理后发出的请求就是 http://localhost:3000/user
		// 				http://localhost:8080/api/user => 代理后 http://localhost:3000/user
		// 			*/
					
		// 	}
		// 	}
		// },
		

		/*//在没有服务器的前提下，前端可以这样来模拟数据
		
		before (app) { // 使用webpack的express 来创建服务
			app.get('/api/users',(req,res) => { // 当请求/api/users 时候就会执行回调函数
				res.json({name: 'webpack'})
			})
		}*/


		/*	
			能不能服务端和客户端共用一个端口？ 
			也就是dev-server 本地开发服务端口 和 服务器的端口都是localhost:8080 什么的，
			这样就可以解决跨域问题

			在服务器中配置，
		*/
	},

	resolve : { // 解析第三方模块，如果不设置resolve选项，会遵循common.js 的查找方式

		modules: [path.resolve('node_modules')], // 缩小查找第三方包的查找范围，专门到指定的目录下查找
		/*alias: {

			// 使用别名，当使用import 'bootstrap' 时候就默认引用 bootstrap/dist/css/bootstrap.css 这个文件
			// 而不是 会引用 bootstrap 文件下pakage.json 里面 main属性值得里面的文件
			bootstrap: 'bootstrap/dist/css/bootstrap.css' , 
		},*/

		// 查找文件的时候，先按package.json 文件里面的 style字段说明的路径查找，找不到再按main字段说明的路径找
		// mainFields: ['style','main'],
		// mainFiles: [], // 指定入口文件的名字，默认是index.js
		
		/* 
			我们引入一个文件的时候经常不写后缀名，比如引入 index.js 这样 import 'index'

			引入vue文件省略.vue后缀

			为什么可以这样写呢？ 因为我们配置了extensions选项，

			当 import 'index'时候，先去目录下找 index.js文件,如果没有找到，找index.css, 再没有找到就继续找 index.json,如此类推

		*/
	extensions: ['.js','.css','.json'], // 

	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	}


}