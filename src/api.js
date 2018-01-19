import axios from 'axios'
import Bus from './bus.js'

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 显示
  Bus.$emit('loadingState', true)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 隐藏
  Bus.$emit('loadingState', false)
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios

let base = process.env.API_ROOT
console.log(base)

export const logo = params => { return axios.post(`${base}/api/logo`, params).then(res => res.data) }
