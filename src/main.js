import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'// 引入elementUi
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入默认的css样式
import Component from './components/home'
import './promission'
import axios from './utils/request'

Vue.prototype.$axios = axios // 将axios赋值给全局的属性，任何位置都可以使用
Vue.config.productionTip = false
Vue.use(ElementUI)// 手动全局注册
Vue.use(Component)// 手动全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
