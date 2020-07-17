// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 设置浏览器的控制台中默认的提示信息是否显示
Vue.config.productionTip = false
// 实例化Vue
new Vue({
  render: h => h(App),
}).$mount('#app')
/**
 * .$mount('#app') 相当于在脚手架2中el:'#app'是一样的
 *
 * render: h => h(App),
 *
 *
 *
 */
// render原来的基本写法
// render:function(createElement){
//   return createElement(App)
// }
// render:(createElement)=>{
//   return createElement(App)
// }
// render:(h)=>{
//   return h(App)
// }
// render:h=>h(App)