// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
// 引入路由器对象----如果目录中的文件是index.js , 在引入该文件的时候,index.js都可以省略
import router from './router'
// 设置浏览器的控制台不提示默认信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册路由器
  router
})
