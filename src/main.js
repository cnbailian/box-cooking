import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Home from './components/Home.vue'
import Table from './components/Table.vue'
import Type from './components/Type.vue'
import Img from './components/Img.vue'
import Text from './components/Text.vue'
import Link from './components/Link.vue'
import Tag from './components/Tag.vue'
import Summary from './components/Summary.vue'
import Write from './components/Write.vue'
import Article from './components/Article.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

// leancloud
Vue.use(require('../leancloud/leancloud'))
Vue.use(require('../leancloud/type'))

// 路由
const routes = [
	{
		path: '/',
		component: Home,
		name: 'Home',
		children: [
			{ path: '/', component: Table, name: '列表' },
			{ path: '/type', component: Type, name: '分类' },
			{ path: '/img', component: Img, name: '图像' },
			{ path: '/text', component: Text, name: '文本' },
			{ path: '/link', component: Link, name: '网页' },
			{ path: '/tag', component: Tag, name: '标签' },
			{ path: '/tag/:name', component: Table, name: '筛选列表' },
			{ path: '/summary', component: Summary, name: '总结' },
			{ path: '/summary/write', component: Write, name: '写总结' },
			{ path: '/summary/edit/:id', component: Write, name: '编辑' },
			{ path: '/summary/article/:id', component: Article, name: '文章' },
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

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
