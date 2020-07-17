// 引入Home组件,
import Home from '@/pages/Home'
// 引入Register组件
import Register from '@/pages/Register'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Search组件
import Search from '@/pages/Search'
// 注册路由,并暴露出去
export default [
  // 注册路由
  // Home路由注册
  {
    path: '/',
    component: Home
  },
  // Register路由注册
  {
    path: '/register',
    component: Register,
    meta:{
      isHideFooter:true // 是否隐藏底部,默认是隐藏
    }
  },
  // Login路由注册
  {
    path: '/login',
    component: Login,
    meta:{
      isHideFooter:true // 是否隐藏底部,默认是隐藏
    }
  },
  // Search路由注册
  {
    // params的方式进行传参
     path: '/search/:keyword?', // ? 代表的是params的参数可有可无(有没有参数都可以进行跳转)
    // query的方式进行传参
    // path: '/search',
    component: Search,
    name:'search'
  },
  // 路由的重定向设置
  {
    path: '/',
    redirect: '/'
  }
]