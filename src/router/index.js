import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{ path: '', component: Home2 }, {
      path: 'comment', component: () => import('../views/conmen')
    }, { path: 'material', component: () => import('../views/material') }, // 文章列表
    { path: 'articles', component: () => import('../views/articles') },
    { path: 'publish', component: () => import('../views/publish') }, // 发布文章
    { path: 'publish/:articleId', component: () => import('../views/publish') }, // 修改文章
    { path: 'account', component: () => import('../views/account') }// 账户信息
    ]

  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
