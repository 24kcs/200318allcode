// 引入Vue
import Vue from 'vue'
// 引入路由器插件对象
import VueRouter from 'vue-router'
// 引入Add组件
import Add from '../pages/Add.vue'
// 引入ShowMsg组件
import ShowMsg from '../pages/ShowMsg.vue'
// 声明使用插件
Vue.use(VueRouter)
// 实例化路由器对象,并暴露出去
export default new VueRouter({
  mode: 'hash',
  routes: [
    // 注册路由对象
    {
      path: '/add',  // 地址
      component: Add,  // 组件
      children: [  // 当前的Add这个路由对象中的子路由对象的配置
        // 路由对象
        {
          path: '/add/showmsg/:text', // : 占位的意思,text用来存储要传递的参数
          component: ShowMsg
        }
      ]
    },
    // 重定向的设置
    {
      path:'/',
      redirect:'/add' // 重新定向一个新的地址
    }

  ]
})