// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 设置浏览器的控制台的默认提示信息是否显示
Vue.config.productionTip = false
// 实例化Vue
new Vue({
  render:h=>h(App),
  // 注册路由器对象
  router
}).$mount('#app')