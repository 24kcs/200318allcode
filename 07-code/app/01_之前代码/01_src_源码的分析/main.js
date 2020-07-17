// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 设置浏览器的控制台中是否显示默认的提示信息
Vue.config.productionTip = false
// eslint 语法检查的注释
/* eslint-disable no-new */
new Vue({ // 实例化Vue
  // el---->element---->获取index.html文件中的id为app的div 容器
  el: '#app',
  // 注册组件
  components: { App },
  // 使用App组件模版
  template: '<App/>'
})
