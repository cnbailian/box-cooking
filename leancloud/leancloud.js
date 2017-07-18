// lean-cloud 插件
import AV from 'leancloud-storage'

export default function(Vue)
{

	const appId = localStorage.appId ? localStorage.appId : 'yTYdIM9YSQBo3qLLeK3ytgMS-gzGzoHsz'
	const appKey = localStorage.appKey ? localStorage.appKey : 'vJuqS2GpE7h5Kp2eBd2h2My6'
	// leancloud class
	const className = {
		'main': 'box',
		'tag' : 'tags',
		'summary' : 'summary'
	}
	// you name 只查询所属于此名字的内容
	const name = localStorage.name ? localStorage.name : 'box'
	AV.init({ appId, appKey })

	// 传递name
	Vue.prototype.name = name
	// 构建对象
	Vue.prototype.box = AV.Object.extend(className.main)
	// 构建tag对象
	Vue.prototype.tagObj = AV.Object.extend(className.tag)
	// 构建summary对象
	Vue.prototype.summary = AV.Object.extend(className.summary)
	// 构建文件对象
	Vue.prototype.file = function(name, obj){
		return new AV.File(name, obj)
	}
	// 构建网络文件对象
	Vue.prototype.networkFile = function(name, url){
		return AV.File.withURL(name, url)
	}
	// 构建更新对象
	Vue.prototype.updateObj = function(name, objectId){
		return AV.Object.createWithoutData(className[name], objectId)
	}
	// 查询
	Vue.prototype.query = function (parameter){
		var query = new AV.Query(className[parameter])
		query.equalTo('name', name)
		query.descending('createdAt')
		return query
	}
}
