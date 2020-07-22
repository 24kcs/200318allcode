// 引入axios
import axios from 'axios'
// 引入NProgress对象
import NProgress from 'nprogress'
// 引入NProgress样式文件
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'
// 设置基础路径和超时时间
const ajax = axios.create({
  baseURL: '/api', // 基础路径
  timeOut: 20000 // 超时时间
})
// 请求拦截器
ajax.interceptors.request.use(config => {
  // 显示进度条
  NProgress.start()
  // 请求头中存储用户的临时id数据
  config.headers['userTempId'] = store.state.user.userTempId
  // 获取token信息
  const token = store.state.user.userInfo.token
  // 判断token是否存在
  if(token){
    // 在请求头中携带token
    config.headers['token']=token
  }
  // 直接返回请求配置对象
  return config
})
// 响应拦截器
ajax.interceptors.response.use(response => {
  // 隐藏进度条
  NProgress.done()
  return response.data
}, error => {
  // 隐藏进度条
  NProgress.done()
  alert('请求错误:' + error.message || '未知错误')
  // 中断Promise链,具体请求就不再处理了
  // return new Promise(() => { })
  // 返回的就是失败的Promise,具体的请求可以再处理
  return Promise.reject(error)
})
// 暴露
export default ajax