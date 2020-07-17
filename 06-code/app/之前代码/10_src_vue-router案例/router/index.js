// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入组件
import routes from './routes.js'
// 声明使用路由器
Vue.use(VueRouter)
// 实例化路由器,并暴露出去
export default new VueRouter({
  mode:'history' , // 浏览器的地址栏中不带#
  routes // 注册路由(可以注册很多很多的路由,每个路由都是一个路由对象,每个对象中都应该配置地址和组件,形成了映射关系,路由组件)
})