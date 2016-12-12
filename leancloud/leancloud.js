// lean-cloud 插件
import AV from 'leancloud-storage'

module.exports = function(Vue)
{
  const appId = 'elR6fJcxD9naWm6FH7IDuEKN-gzGzoHsz'
  const appKey = '0VRq8PgueqvYQioustY2Cw3I'
  // leancloud class
  const className = {
    'main': 'box',
    'tag' : 'tags'
  }
  // you name 只查询所属于此名字的内容
  const name = 'box'
  AV.init({ appId, appKey })

  // 传递name
  Vue.prototype.name = name
  // 构建对象
  Vue.prototype.box = AV.Object.extend(className.main)
  // 构建tag对象
  Vue.prototype.tagObj = AV.Object.extend(className.tag)
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
    return query
  }
}
