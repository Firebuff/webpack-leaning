/*
	在引进jQuery时候，webpack会分析 jquery里面有没有依赖，
	但是我们已经明确知道jQuery没有其他的依赖，但是webpack还是去分析，这样会导致打包耗时过长

	我们可以在webpack配置文件中去配置noParse选项来告诉webpack不要对jq进行分析依赖，
	这样可以减少打包耗时

 */

import jquery from 'jquery';


/*
	moment 这个插件支持很多语言，使用时候会把所有的语言包加载进来造成打包体积过大，
	但是我们只是使用一种语言，不需要引入其他语言，
	此时我们使用一个插件忽略这些不要的语言文件，webpack自带的插件

	new webpack.IgnorePlugin(/\.\/locale/,'/moment/')
	
	在引进moment时候就忽略掉 ./locale这个文件(moment当前路径下的locale文件)

	此时文件体积大大减小


 */

import moment from 'moment'

moment.locale('zh-cn') //切换语言， 忽略掉后再次切换语言已经无法生效，因为语言文件包已经被忽略掉没有打包进来

let r = moment().endOf('day').fromNow();

console.log(r)