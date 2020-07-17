// 引入Vue
import Vue from 'vue'
// 引入App 组件
import App from './App.vue'
// 设置浏览器中默认的提示显示不显示
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
