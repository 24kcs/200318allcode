// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 声明使用插件
Vue.use(VueRouter)
// 实例化路由器对象,并暴露出去
export default new VueRouter({
  mode:'history',
  routes
})