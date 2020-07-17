// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
// 引入VueResource
import VueResource from 'vue-resource'
// 声明使用插件
Vue.use(VueResource)
// 设置浏览器的控制台不提示默认信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
