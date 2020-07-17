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
    component: Register
  },
  // Login路由注册
  {
    path: '/login',
    component: Login
  },
  // Search路由注册
  {
    path: '/search',
    component: Search
  },
  // 路由的重定向设置
  {
    path: '/',
    redirect: '/'
  }
]