

 /*

 	此时本地的地址是 http://localhost:8080，如果请求 http://localhost:3000/api/user 会出现跨域问题

 	所以请求地址不能写 http://localhost:3000/api/user，因为如果写了浏览器会判断是跨域请求，不会发送请求，

 	因此要用 http://localhost:8080/api/user去请求，这样不会因为跨域而导致浏览器不发起请求，使请求正常发出

 	后面使用代理 发出这样的 http://localhost:3000/api/user，从而解决跨域问题

 	如何解决这个跨域问题？

 	我们可以使用代理，具体设置看配置文件

 	代理要用到一个 http-proxy模块




 	到这里可以看出跨不跨域实际上是由客户端(浏览器)来告诉服务器的

 	这也就为实现跨域访问提供了实现的基础

 	通过一些方法设置代理，在请求发送(接收)之前加入中间层，

 	将不同的域名转换成相同的

 	就解决了跨域的问题

 	依旧以上面的栗子：

 	客户端发送请求时

 	不直接到服务器

 	而是先到代理的中间层

 	在这里将 localhost:8080 的这个域名装换为 www.nj1c.com，

 	再将请求发送到服务器

 	这样在服务器端收到的请求就是使用的www.nj1c.com域名

 	同理，当服务器返回数据的时候，也是先到代理的中间层

 	将 www.nj1c.com 转换成 localhost:8080；
 
 */


 /* resovle */
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap'


import './style'










fetch('api/user').then( (res) => {
	console.log(res)
	return res.json()
	
}).then( (res) => {
	console.log(res)
})


/*
fetch('api/users').then( (res) => {
	console.log(res)
	return res.json()
	
}).then( (res) => {
	console.log(res)
})*/



// 暴露全局变量 也就是环境变量

console.log(DEV)
console.log(FL)
console.log(typeof FL)
console.log(RESULT)


