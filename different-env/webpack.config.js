let path = require('path')

let HtmlWebpackPlugin = require('html-webpack-plugin')


/*
	仅仅通过定义环境变量来区分 生产环境使用哪些配置，开发环境又使用哪些配置是不够的，
	此时我们可以 创建多个js文件，然后将 不同的环境配置 写到不同的js文件里面，
	共用的配置放到webpack.config.js中，

	然后将这些文件合并起来

	此时我们要用到一个插件 webpack-merge 来进行合并

 */





module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'home.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	},
	devServer: {
		port:3000,
		contentBase: './dist',
		open: true
	},
	mode: 'development'
}