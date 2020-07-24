// 引入Home组件,
import Home from '@/pages/Home'
// 引入Register组件
import Register from '@/pages/Register'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Detail组件
import Detail from '@/pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入ShopCart组件
import ShopCart from '@/pages/ShopCart'
// 引入Trade组件----结算
import Trade from '@/pages/Trade'
// 引入Pay组件----支付
import Pay from '@/pages/Pay'
// 引入PaySuccess组件----支付成功
import PaySuccess from '@/pages/PaySuccess'
// 引入Center组件-----个人中心---我的订单
import Center from '@/pages/Center'
// 引入MyOrder组件
import MyOrder from '@/pages/Center/MyOrder'
// 引入GroupBuy组件
// import GroupBuy from '@/pages/Center/GroupBuy'

// 优化:------>路由的懒加载()
const GroupBuy = () => import('@/pages/Center/GroupBuy')
// 引入store
// import store from '@/store'
// 注册路由,并暴露出去
export default [
  // 注册路由
  // -----结算组件路由
  {
    path: '/trade',
    component: Trade,
    // 4.只能从shopcart(购物车)界面才能够进入到trade(结算)界面
    beforeEnter: (to, from, next) => {
      // 跳转过来的地址是从购物车地址来的
      if (from.path === '/shopcart') {
        next() // 放行
      } else {
        next('/shopcart') //
      }
    }
  },
  // -----支付组件路由
  {
    path: '/pay',
    component: Pay,
    // 路由传参是可以使用props的方式
    props: route => ({ orderId: route.query.orderId }),
    // 5.只能从trade(结算)界面才能够进入到pay(支付)界面
    beforeEnter: (to, from, next) => {
      // 跳转过来的地址是从结算地址来的
      if (from.path === '/trade') {
        next() // 放行
      } else {
        next('/trade') //
      }
    }
  },
  // -----支付成功组件路由
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 6.只能从pay(支付)界面才能够进入到paysuccess(支付成功)界面
    beforeEnter: (to, from, next) => {
      // 跳转过来的地址是从支付地址来的
      if (from.path === '/pay') {
        next() // 放行
      } else {
        next('/pay') //
      }
    }
  },
  // -----个人中心组件路由
  {
    path: '/center',
    component: Center,
    children: [
      // 我的订单的路由注册
      {
        path: '/center/myorder',
        component: MyOrder
      },
      // 团购的路由注册
      {
        path: '/center/groupbuy',
        component: GroupBuy
      },
      // 重新定向
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  // Home路由注册
  {
    path: '/',
    component: Home
  },
  // Register路由注册
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true // 是否隐藏底部,默认是隐藏
    }
  },
  // Login路由注册
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true // 是否隐藏底部,默认是隐藏
    },
    // 路由独享守卫---->前置守卫
    // 2.只能在没有登录的情况下,才可以查看登录界面
    // beforeEnter: (to, from, next) => {
    //   // 判断是否登录
    //   if(store.state.user.userInfo.name){
    //     // 登录---->已经登录了--->直接去/首页
    //     next('/')
    //   }else{
    //     // 没有登录
    //     next()
    //   }
    // }
  },
  // Search路由注册
  {
    // params的方式进行传参
    path: '/search/:keyword?', // ? 代表的是params的参数可有可无(有没有参数都可以进行跳转)
    // query的方式进行传参
    // path: '/search',
    component: Search,
    name: 'search'
  },
  // Detail路由组件
  {
    path: '/detail/:skuId',
    component: Detail,
    name: 'detail'
  },
  // AddCartSuccess路由组件----添加购物车成功组件
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    // 路由独享前置守卫
    //  3.只有携带了skuId/skuNum/skuInfo对象的数据才能够查看addcartsuccess界面
    beforeEnter: (to, from, next) => {
      // 获取skuId和skuNum
      const { skuId, skuNum } = to.query
      // 获取skuInfo数据
      const skuInfo = JSON.parse(sessionStorage.getItem('SKU_INFO_KEY'))
      // 任何地址想要进入到/addcartsuccess地址中的时候,先判断,需要的数据是否存在
      if (skuId && skuNum && skuInfo) {
        next() // 放行
      } else {
        // 从哪里来就给我回哪里去
        next(from.path)
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  // 路由的重定向设置
  {
    path: '/',
    redirect: '/'
  }
]