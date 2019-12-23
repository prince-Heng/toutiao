import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置默认接口地址
// 请求拦截器  请求之后，到达后台之前，对token注入到config
axios.interceptors.request.use(function (config) {
//   请求成功
  // config时要发送请求的所有配置信息
  let token = window.localStorage.getItem('user-token')// 获取token
  //   将token设置到headers里，因为所有的token格式都是统一的
  config.headers.Authorization = `Bearer ${token}`
  //   console.log(config)

  return config
}, function () {
  // 请求失败

})
// 请求之后得到的数据中可能会含有超出安全范围的数据。这个数据是axios自动调用JSON.parse()方法转化
// 现在 使用自定义的方式来转换数据
axios.defaults.transformResponse = [function (data) {
  // data 是响应回数据 字符串
  return data ? JSONBig.parse(data) : {} // 解决js处理大数字失真问题
}]
// 响应拦截  响应数据回来 到达then之前
axios.interceptors.response.use(function (response) {
// 响应成功
  return response.data ? response.data : {}
}, function (error) {
  // 失败执行
  // 根据请求反馈的错误信息做相对处理
  let status = error.response.status// 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求错误'
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    case 401:
    //   message = 'token过期或未出'
      window.localStorage.removeItem('user-token')// 删除过期的token
      router.push('/login')// 跳转到登录页
      break
    case 507:
      message = '服务器数据库异常'
      break
    default: break
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)
})
export default axios
