import axios from 'axios'
// 请求拦截器  请求之后，到达后台之前，对token注入到config
axios.interceptors.request.use(function (config) {
//   请求成功
  // config时要发送请求的所有配置信息
  let token = window.localStorage.getItem('user-token')// 获取token
  //   将token设置到headers里，因为所有的token格式都是统一的
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  // 请求失败
  return Promise.reject(error)
})
// 响应拦截  响应数据回来 到达then之前
axios.interceptors.response.use(function (response) {
// 响应成功
  return response.data ? response.data : {}
}, function () {
  // 失败执行
})
export default axios
