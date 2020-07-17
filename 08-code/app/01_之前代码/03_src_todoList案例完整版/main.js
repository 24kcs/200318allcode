// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
// 设置浏览器的控制台不提示默认信息
Vue.config.productionTip = false
// $bus就是Vue的实例对象
// 事件总线对象
// $bus 随便起名---尽可能要有意义
Vue.prototype.$bus =new Vue()
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
