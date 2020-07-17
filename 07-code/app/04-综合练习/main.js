// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
// 设置浏览器的控制台不提示默认信息
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
