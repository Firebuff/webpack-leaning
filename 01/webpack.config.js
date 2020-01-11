// webpack 是用node.js写出来的，可以使用node的写法


// 插件都是类， 需要new创建实例

let path = require('path') //引入node 的核心模块
// console.log(path.resolve(__dirname,'test')) //输出为 E:\webpack\01\test




/* 如何将项目下的html 文件也打包输出？ 我们可以使用 html-webpack-plugin 这个插件 */

//安装命令是 yarn add html-webpack-plugin -D
let HtmlWebpackPlugin = require('html-webpack-plugin') // 引入插件 




/* 抽离css 文件的插件 mini-css-extract-plugin */

// 安装命令 yarn add mini-css-extract-plugin -D

let MiniExtractCssPlugin = require('mini-css-extract-plugin')
//使用该插件需要进行一些配置才能将css 压缩，使用插件  optimize-css-assets-webpack-plugin
//使用该插件必须要要使用一个将js压缩的插件，否则js不会被压缩(生产环境),详看npm该插件的用法

let  OptimizeCss = require('optimize-css-assets-webpack-plugin'); // 压缩css
let TerserJSPlugin = require('terser-webpack-plugin'); // 压缩js




/* 自动给样式加上去前缀 如 webkit-xx 的， 我们要用到一个包 autoprefixer，使用这个包要用到 postcss-loader 这个loader来处理*/

// 安装命令 yarn add autoprefixer postcss-loader -D
// 使用postcss-loader 需要在根目录下配置 postcss.config.js 文件
 

/*  
	js 语法的转换 比如说 es6 转成 es5 
	此时，我们需要用 到 babel-loader @babel/core @babel/preset-env  这几个东西
	安装命令 yarn add babel-loader @babel/core @babel/preset-env -D

*/




/* 也可以在每个模块中注入jq $ 对象 */

let webpack = require('webpack')




//common.js的模块化的语法
module.exports = {

	//添加优化项
	
	optimization: {
		minimizer: [
			new TerserJSPlugin({}),
		 	new OptimizeCss({}) // 生产环境下会压缩css
		],
	},

    // 使用本地开发服务器 安装命令 yarn add webpack-dev-server -D
    
    devServer: { //开发服务器配置
        port: 3000, //配置端口
        progress: true, //打包时候是否显示进度条
        contentBase: './test', //服务器的根目录
        open: true, //是否自动打开浏览器
        compress: true, // 是否启动压缩
    },
    mode: 'production', // 模式： 默认两种production 和 development, 生产环境下js会被压缩得很小
    entry: './src/index.js', // 入口文件
    output: {
        // filename: 'bundle.js', //打包后的文件名
        
        /*打包后的文件名, 可以在文件名中加入一个哈希，使每次生成的文件的名字不同，防止有缓存, 冒号后面跟上数字可以指定哈希的长度*/
        filename: 'bundle.[hash:3].js',

        // 打包后的文件的路径（必须是一个绝对路径）path_resolve就是将test解析成为一个绝对路径
        path: path.resolve(__dirname,'test'),

        /* 给所有引用的资源都加上一个公共的域名，如
            <img src="http://yourwebsite.com/img/xxx.png" 
            <script src="http://yourwebsite.com/img/xxx.js></script>
            这样当部署在 CDN 服务器上面的时候方便很多

            注意： 如果只是给某些引用的资源加上公共路径，可以在处理该资源的loader里面设置
        */
        // publicPath: 'http://www.yourwebsite.com', 

    },

    //使用插件, 是一个数组，放着webpack所有的插件
    plugins: [ 

    	// 用new 创建一个实例
    	new HtmlWebpackPlugin({
    		template: './src/index.html', //模板 html 的路径
    		filename: 'index.html', //模板 html 打包后的文件名
    		minify:{
    			removeAttributeQuotes: true, //删除html中的双引号
    			// collapseWhitespace: true, //折叠空白
    		},
    		hash:true //让生成的文件的名字带有一个哈希(html引入的js文件)
    	}),

    	new MiniExtractCssPlugin({
    		filename: 'css/main.css', // 抽离出的css 的文件名是什么，前面还可以加一个输出路径，说明打包输出到哪个目录下
    	}),

    	/*//也可以在每个模块中注入jq $ 对象, 暴露全局对象
    	new webpack.ProvidePlugin({
    		$: 'jquery'
    	})*/
    ],



    //使用模块，里面放置一些loader，将源代码转化成一个模块
    module: {
    	//规则
    	rules: [
    		/* 
    			loader的特点是单一性，如果只需要用一个loader来处理，则可以使用 use: 'xxxx', 
    			如果要使用多个loader，可以使用数组的形式 use： ['xxx', 'xxx'], 数组的元素也可以是对象
				loader 执行的先后顺序是 从数组的后面到前面，也就是从右到左
				从下到上执行

    		 */
    		
    		// 安装命令： yarn add css-loader style-loader less-loader  less -D 
    		
    		// 使用 css-loader 来处理解析 @import 这些语法
    		// 使用 style-loader 来将css文件插入到html文件的header 标签中
    		// 使用 less-loader 来 处理 less 文件 ，使用 less-loader 要安装less，它要调用less进行转换
    		
    		// 处理 scss 要使用 sass-loader 来 处理 scss 文件 ，使用 sass-loader 要安装 node-sass
    		
    		// 类似的还有 stylus stylus-loader
    		
    		{
    			test: /\.css$/, //正则匹配需要处理的文件
    			use: [
	    			{
	    				loader: 'style-loader',
	    				options: {
	    				    insert: 'head'
	    				}
	    			}, 
	    			'css-loader',
	    			'postcss-loader', //自动添加前缀
    			]
    		},

    		//添加一个规则来处理 less 文件
    		{
    			test: /\.less$/, //正则匹配需要处理的文件
    			use: [
	    			/*{
	    				loader: 'style-loader',
	    				options: {
	    				    insert: 'head'
	    				}
	    			}, */
	    			MiniExtractCssPlugin.loader,  //less 文件转换完毕后，把他抽离出一个单独的css 文件用link标签引入， 而不是使用style-loader 把放在style标签中
	    			'css-loader', // 处理@import 等语法， 解析路径
	    			'postcss-loader', //自动添加前缀
	    			'less-loader' // 把 less 转换成 css
    			]
    		},

    		//添加一个规则将 es6 等高级语法转换成 es5
    		{
    			test: /\.js$/,
    			use: {
    				loader: 'babel-loader',
    				options: {
    					presets: [
    						'@babel/preset-env' // 里面包含了将es6转成es5 的模块，他会调用里面的模块进行处理
    					],
    					plugins: [
    						'@babel/plugin-proposal-class-properties' // 转换提案里面的语法
    					]
    				}
    			}
    		},

    		/*//把jq暴露到全局
    		{
    			test: require.resolve('jquery'), // 当引入jq时候就使用这个loader处理
    			use: 'expose-loader?$'
    		},*/

    		// 配置file-loader处理图片文件
    		{
    			test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader', // 不用file-loader，使用url-loader可以压缩图片，转成base64形式
                    options: {
                        esModule: false,
                        limit: 200*200, //如果图片尺寸小于或者等200*200时，转成base64，否则转成文件的形式
                        outputPath: '/img', // 将所有图片都打包输出放到一个文件夹下
                        publicPath: 'http://www.yourwebsite.com',  // 单独给图片加上一个 路径
                    }
                }
    		},
            {
                test:/\.(html|htm)$/,
                use: {
                    loader: 'html-loader',
                }
            }
    	]
    }

}