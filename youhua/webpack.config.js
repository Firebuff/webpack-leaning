let path = require('path')

let webpack = require('webpack')

let HtmlWebpackPlugin = require('html-webpack-plugin')

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
		}),
		new webpack.IgnorePlugin(/\.\/locale/, /moment/) //忽略掉某些不需要的文件
	],
	module: {
		noParse: /jquery/, // 不要去分析jQuery的依赖库

		/*优化项除了noPase， 我们还可使用exclude 和 include， 两个用一个就OK了 */

		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.js$/, // es6转换

				exclude: /node_modules/, // 排除node_modules文件夹，不要去转换这个文件里面的文件

				include: path.resolve('src'), //包括，只转换src目录下的文件

				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	devServer: {
		port:3000,
		contentBase: './dist',
		open: true
	},
	mode: 'development',
}