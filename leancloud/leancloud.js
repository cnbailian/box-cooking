// lean-cloud 插件
import AV from 'leancloud-storage'

module.exports = function(Vue, options)
{
  const appId = 'elR6fJcxD9naWm6FH7IDuEKN-gzGzoHsz'
  const appKey = '0VRq8PgueqvYQioustY2Cw3I'
  const className = 'ssj'
  const name = 'box'
  AV.init({ appId, appKey })
  // 传递name
  Vue.prototype.name = name
  // 构建对象
  Vue.prototype.box = AV.Object.extend(className)
  // 构建文件对象
  Vue.prototype.file = function(name, url){
    return AV.File.withURL(name, url)
  }
  // 构建更新对象
  Vue.prototype.boxUpdate = function(objectId){
    return AV.Object.createWithoutData(className, objectId)
  }
  // 查询
  Vue.prototype.query = function (){
    var query = new AV.Query(className)
    return query
  }
}
