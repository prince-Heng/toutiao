import layoutAside from '../home/layout-aside.vue'
import layoutHeader from '../home/layout-header.vue'
import BreadCrumb from '../conmen/bread-crumb.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', BreadCrumb)// 全局注册面包屑组件  每个组件都可以使用
  }
}
