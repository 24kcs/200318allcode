import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 引入element-ui组件库
import ElementUI from 'element-ui'
// 引入element-ui组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// 复习和测试的
// import './test/es-module/test2'
// import './test/es-module/test4'
// 引入全局的样式
import '@/styles/index.scss' // global css
// 引入APp组件
import App from './App'
// 引入vuex
import store from './store'
// 引入路由器
import router from './router'
// 图标字体
import '@/icons' // icon
import '@/permission' // permission control

import { hasBtnPermission } from './utils/permission'
// 导入所有的模块
import * as API from '@/api'
import HintButton from '@/components/HintButton'
// import CategorySelector from '@/components/CategorySelector'

// 引入的三级分类组件
import CategorySelector from '@/views/product/CategorySelector/CategorySelector'
// 注册全局组件
Vue.component('HintButton', HintButton)
// 注册全局组件
Vue.component('CategorySelector', CategorySelector)

Vue.prototype.$hasBP = hasBtnPermission
// 所有的组件的实例对象都可以直接通过$API直接调用api接口函数来进行使用(this.$API.login.xxx())
Vue.prototype.$API = API // 将包含所有接口请求函数的对象让所有组件可见

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
