// 类型
module.exports = function(Vue)
{
  const type = [
    {
      value: 'img',
      name: '图像'
    },
    {
      value: 'text',
      name: '文本'
    },
    {
      value: 'link',
      name: '网页'
    }
  ]
  Vue.prototype.typeList = type
}
