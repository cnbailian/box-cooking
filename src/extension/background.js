import Vue from 'vue'

Vue.use(require('../../leancloud/leancloud'))

chrome.contextMenus.create({
  id:'Box',
  type: 'normal',
  title: 'Save To Box',
  onclick: add,
  contexts: ['all']
})

chrome.contextMenus.create({
  id:'Box1',
  type: 'normal',
  title: '管理页面',
  onclick: function(info) {
    return chrome.tabs.create({
      url: 'index.html'
    })
  },
  contexts: ['browser_action']
})

var data = {
  'type': 'link',
  'content': ''
}
function add(){
  var box = new Vue.prototype.box;
  box.set('name',Vue.prototype.name)
  box.set('type',data.type)
  box.set('content',data.content)
  if (data.type == 'img') {
    var fileName = data.content.replace(/^.*[\\\/]/, '')
    var file = Vue.prototype.file(fileName, data.content)
    file.save().then(function(file) {
      box.set('content', file.url())
    }, function(error) {
      console.error(error)
    })
  }
  box.save().then(function (todo) {
  }, function (error) {
    console.error(error)
  })
}

/*与content之间通讯*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	data = message;
})
