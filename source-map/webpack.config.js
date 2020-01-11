let path = require('path')

let HtmlWebpackPlugin = require('html-webpack-plugin');

/*
	webpack的小插件

	1. clean-webpack-plugin 打包时先删除已经存在的 dist 目录，防止文件覆盖

	2. copy-webpack-plugin  报一些没有引用的文件也输出到打包目录下

	2. banner-plugin 在打包后的js代码前面加上一些注释提示, 是 webpack 自带的一个插件

 */

let { CleanWebpackPlugin } = require('clean-webpack-plugin')

let CopyWebpackPlugin  = require('copy-webpack-plugin')

let webpack = require('webpack');













module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'homings.js',
		path: path.resolve(__dirname,'dist')
	},
	mode: 'production',

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'home.html'
		}),
		new CleanWebpackPlugin(), // 打包过程中，将不再使用原来已经打包的资源，原有资源将自动删除掉

		new CopyWebpackPlugin([
			{
				from: './src/doc', // 要复制的是哪个文件，只会复制doc文件下的文件不会复制doc这个文件夹，如果要加上这个文件夹，可以在to里面配置'./doc'
				to: './doc' //复制到哪里去, ./ 表示的是dist这个根目录
			}
		]),

		new webpack.BannerPlugin('我是一些提示信息'), //在打包后的js代码前面加上一些注释提示, 是 webpack 自带的一个插件
	],

	/*
		1. 使用sour-cemap 会单独生成一个sourcemap文件，程序出错时会显示出错代码的列和行

		2. 使用 eval-source-map, 不会生成文件，但是可以显示出错的行与列

		3. 使用 cheap-module-source-map, 不会产生列，但是是一个单独的映射文件

		4. 使用 cheap-module-eval-source-map, 不会生成文件，集成在打包后的文件中，也不会产生列
	 */



	// devtool: 'source-map', //增加映射文件，当出错时，可以找到出错的地方，方便我们调试源代码
	// devtool: 'eval-source-map', //增加映射文件，当出错时，可以找到出错的地方，方便我们调试源代码
	// devtool: 'cheap-module-source-map', //产生后可以保存起来
	devtool: 'cheap-module-eval-source-map', 




	/*  每次我们更新代码后都要npx webpack 才能打包，
		
		问题：我们能不能每次更新代码后能不能自动 执行打包动作呢？

		回答： 我们可以使用 watch 来实现

	*/

	/*watch: true, // 监听我们的文件，每当我们修改代码后就会自动打包出实体文件

	watchOptions: { // 监听的参数
		poll: 1000, // 多少时间检查 一下是否有文件已经修改，单位是毫秒
		aggregateTimeout: 500,  //保存文件后多少毫秒执行打包

		ignored: /node_modules/ // 不要监听的目录，哪些文件不需要监听
	}*/
}