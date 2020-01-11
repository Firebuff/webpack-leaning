/*
	生产环境的配置
 */

let { smart } =  require('webpack-merge'); // 引入插件

let base = require('./webpack.config.js') //引入共用配置

module.exports = smart(base,{ // base是共用的配置
	mode: 'production', //将mode选项从 webpack.config.js 中拆分出来，然后在合并到一起， （其他选项也可以拆分）
})



// 然后执行 npm run build -- --config webpack.prod.js, 这样就是使用开发环境 （传参时候，要在build后面加两个-)