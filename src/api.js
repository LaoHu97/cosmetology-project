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
  setTimeout(function () {
    Bus.$emit('loadingState', false)
  }, 200)
  if (response.data.status !== 200) {
    Bus.$emit('alertState', true)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Bus.$emit('loadingState', false)
  Bus.$emit('alertState', true)
  return Promise.reject(error)
})

export default axios

let base = process.env.API_ROOT

export const initMemProduct = params => { return axios.post(`${base}/pay/activity/initMemProduct`, params).then(res => res.data) }

export const prepayInfo = params => { return axios.post(`${base}/pay/activity/prepayInfo`, params).then(res => res.data) }

export const updateInviter = params => { return axios.post(`${base}/pay/activity/updateInviter`, params).then(res => res.data) }

export const queryPckDetail = params => { return axios.post(`${base}/pay/activity/queryPckDetail`, params).then(res => res.data) }

export const getMerIntroductionById = params => { return axios.post(`${base}/pay/weixin/activity/getMerIntroductionById`, params).then(res => res.data) }
