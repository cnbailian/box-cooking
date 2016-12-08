import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

// leancloud
Vue.use(require('../../leancloud/leancloud'))
Vue.use(require('../../leancloud/type'))

new Vue({
  el: '#app',
  render: h => h(App)
})
