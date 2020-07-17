// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
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
export default new VueRouter({
  mode: 'history',
  routes
})