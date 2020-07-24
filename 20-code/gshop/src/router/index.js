// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 引入store
import store from '@/store'
// 路由跳转中的push和replace方法内部需要有默认的成功的空回调或者是失败的空回调
// 重写(重新定义)路由器的push和replace方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重新设置,指定成功的默认空回调函数
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}
// 重新设置,指定失败的默认空回调函数
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}

// 声明使用插件
Vue.use(VueRouter)
// 实例化路由器对象,并暴露出去
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// 全局前置路由守卫
// 1.只有在登录的情况下,才能够查看:结算(/trade)/支付(pay)/个人中心(/center)的界面
router.beforeEach((to, from, next) => {
  // to--->目标路由,to.path---->目标路由地址
  // 要进行检测的路由地址
  const checkPath = ['/trade','/pay','/center']
  // 目标路由地址
  const targetPath = to.path
  // console.log(to.path) // /center/myorder
  // 判断检测的路由地址中是否有 目标路由地址
  // if(checkPath.indexOf(targetPath)!==-1){
  if(checkPath.find(path=>(targetPath.indexOf(path)===0))){
    // 判断当前有没有登录
    if(store.state.user.userInfo.name){
      // 登录
      next()
    }else{
      // 没有登录,给我去登录-----
      // 把目标的路由的地址,取出来,存起来,登录成功后跳转的时候,把目标地址拿出来,设置一下跳转的地址
      next('/login?redirect='+targetPath)
    }
  }else{
    next() // 放行
  }
})




// 全局前置路由守卫
// router.beforeEach((to, from, next) => {
//   // to---->route对象---->路由信息对象----->目标路由
//   // from ----->route对象---->即将要离开的路由对象---->将要离开的路由
//   // next()----->函数---->放行---->继续向后执行吧
//   // next()---->放行
//   // next(path)---->强制跳转到某个地址
//   // 不执行next()方法,就不做任何的跳转,等着
//   // 登录界面---->注册界面
//   // login---->from
//   // register---->to
//   // next()

//   // 小例子:请求的如果不是/login地址,则跳转到/login,否则放行
//   // if(to.path==='/login'){
//   //   next() // 放行
//   // }else{
//   //   next('/login') // 强制跳转到login界面
//   // }

// })



// 直接暴露出去
export default router

