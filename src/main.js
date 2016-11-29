import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/Table.vue'
import Form from './components/Form.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

// leancloud
Vue.use(require('../leancloud/leancloud'))

// 路由
const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    children: [
      { path: '/main', component: Main },
      { path: '/table', component: Table, name: 'Table' },
      { path: '/form', component: Form, name: 'Form' }
    ]
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
})

router.replace('/table')
