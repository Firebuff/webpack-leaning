//文件导出一个模块， 模块里面放置一些插件告诉postcss-loader使用哪些插件
module.exports = {
	plugins: [
		require('autoprefixer'),
	]
}