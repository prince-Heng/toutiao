// 处理路由拦截器  导航守卫   本质---更改优化路由
import router from '../router'
// 全局的请求守卫，在发送请求后，到达后台前。
// 每个路由在发生改变前都触发
router.beforeEach(function (to, from, next) {
  // 判断范围
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    // 判断   ： 有token过，无token不过
    if (token) {
      next()// 放行
    } else {
      next('/login')// 强制跳转登录页
    }
  } else {
    next()// 放行
  }
})
