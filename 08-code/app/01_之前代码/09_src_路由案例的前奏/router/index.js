// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入组件
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
// 声明使用插件
Vue.use(VueRouter)
// 暴露当前的路由器对象
export default new VueRouter({
  mode: 'history', // hash----->浏览器的地址栏中有#  ,history---->地址栏中没有#, 默认是带#
  // 注册路由:地址和组件的关系
  routes: [
    // 每个路由都是一个对象(内部有:地址和组件)----路由组件了
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
    // 配置重新定向
    {
      path:'/' , // 根路径，当浏览器的地址栏中访问/路径的时候,自动的跳转到/about这个地址
      redirect:'/about' // 重新定向到/bout的这个地址
    }
  ]
})