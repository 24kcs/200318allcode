// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
import { Button } from 'mint-ui'
// 注册成全局组件,任何组件中都可以直接使用该组件
Vue.component(Button.name, Button)
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// 声明使用插件
// Vue.use(MintUI)
// 设置浏览器的控制台不提示默认信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
