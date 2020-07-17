// 引入组件,并注册成路由组件对象
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
// 引入组件
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
// 引入组件
import MessageDetail from '../pages/MessageDetail.vue'
// 暴露路由对象数组
export default [
  // 路由对象
  {
    path: '/about', // 地址
    component: About // 组件
  },
  // 路由对象
  {
    path: '/home',
    component: Home,
    // 子路由组件
    children: [
      {
        path: '/home/news',
        component: News
      }, {
        path: '/home/message',
        component: Message,
        children: [
          {
            path: '/home/message/detail/:id', // 地址 地址是可以和组件的名字不一致的, :id 占位
            component: MessageDetail, // 路由组件
            props: (route) => ({ id: route.params.id })
          }
        ]
      }, {
        path: '/home',
        redirect: '/home/news'
      }
    ]
  },
  // 设置路由的重定向
  {
    path: '/',
    redirect: '/about'
  }
]