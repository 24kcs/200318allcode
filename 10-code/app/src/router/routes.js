// 引入Home组件
import Home from '../pages/Home.vue'
// 引入About组件
import About from '../pages/About.vue'
// 定义路由的数组,并暴露出去
export default [
  // 注册路由
  {
    path: '/home',
    component: Home
  },
  // {
  //   path: '/about',
  //   component: About
  // }
  // params的方式传参
  // {
  //   path: '/about/:id', // : 表示的是占位 id 用来存储参数数据的
  //   component: About
  // }
  // query的方式传参
  // {
  //   path: '/about', 
  //   component: About
  // }
  // meata的方式传参
  // {
  //   path: '/about',
  //   component: About,
  //   meta: {
  //     showMsg: true
  //   }
  // }

  // params的传参方式,使用props的布尔模式进行解耦及传参
  // {
  //   path:'/about/:id',
  //   component:About,
  //   props:true
  // }
  // query的传参方式,使用props的对象模式进行解耦及传参
  // {
  //   path:'/about',
  //   component:About,
  //   props:{
  //     age:45,
  //     msg:'哈哈,真开心'
  //   }
  // }
  // query的传参方式,使用props的函数模式进行解耦及传参
  {
    path: '/about',
    component: About,
    props: route => ({ txt: '真开心' + route.path })
  }
]