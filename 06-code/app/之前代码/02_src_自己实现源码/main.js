// 引入Vue,所有的组件都是基于Vue的
import Vue from 'vue'
// 引入App组件,.vue后缀名可以省略
import App from './App'
// 设置浏览器的控制台中不提示默认信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 注册组件
  components: { App },
  // 使用App组件模版
  template: '<App/>'
})
