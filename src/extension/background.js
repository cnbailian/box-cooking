import Vue from 'vue'

Vue.use(require('../../leancloud/leancloud'))

chrome.contextMenus.create({
  id:'Box',
  type: 'normal',
  title: 'Save To Box',
  onclick: function(){
    $.get(url, data);
  },
  contexts: ['all']
})

window.onmouseup = function(e){
  console.log(e)
}
// console.log();
// console.log(Vue.prototype.name)
