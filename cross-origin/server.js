// webpack 本身内置了一个node的框架 express, 我们这里使用它创建一个服务来演示跨域问题的解决方案


let express = require('express');

let app = express() ;




/* 服务端和客户端共用一个端口解决跨域 */
let webpack  = require('webpack') // 引入webpack模块

// 中间件
let middle = require('webpack-dev-middleware')


let config = require('./webpack.config.js') // 引入配置文件


let complier = webpack(config) // 经webpack处理配置文件后返回一个编译文件

app.use(middle(complier)) // 当服务启动时候，会把webpack也一起启动

// 此时将devServer的 port 端口选项改为 3000，让前后端都是使用同一个端口


// 在命令行中执行 node server.js 就可以了吧 











app.get('/api/user',(req,res) => { // 当请求/api/user 时候就会执行回调函数
	res.json({name: 'robert'})
})

app.listen(3000) //服务器监听3000端口






