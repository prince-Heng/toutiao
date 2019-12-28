import layoutAside from '../home/layout-aside.vue'
import layoutHeader from '../home/layout-header.vue'
import BreadCrumb from '../conmen/bread-crumb.vue'
import coverImage from '../publish/cover-images.vue'
import { quillEditor } from 'vue-quill-editor'// quill编辑器的组件对象
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)// 注册全局组件
    Vue.component('layout-header', layoutHeader)// 注册全局组件
    Vue.component('bread-crumb', BreadCrumb)// 全局注册面包屑组件  每个组件都可以使用
    Vue.component('quill-editor', quillEditor)// 注册一个全局的富文本编辑器
    Vue.component('cover-image', coverImage)
  }
}
