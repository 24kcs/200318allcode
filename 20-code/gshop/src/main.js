// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 引入store
import store from './store'
// 引入TypeNav组件,并定义成全局的公共组件
import TypeNav from './components/TypeNav'
// 引入mock
import './mock'
// 引入Carousel组件,并定义成全局公共组件
import Carousel from './components/Carousel'
// 引入swiper的样式
import 'swiper/css/swiper.css'
// 引入Pagination分页组件
import Pagination from '@/components/Pagination'
// 引入表单验证的插件
import './utils/validate'
// 引入所有的api接口函数
import * as API from '@/api'
// 执行element-ui的代码
import './utils/elements'

// 引入图片
import loading from '@/assets/images/loading.gif'
// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'

// 声明使用插件,并进行配置
Vue.use(VueLazyload, {
  loading
})


// 把API挂载到Vue的prototype上
Vue.prototype.$API = API
// 定义全局公共组件(参数1:组件名字,参数2:组件对象)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component('Pagination',Pagination)
// 设置浏览器的控制台的默认提示信息是否显示
Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue()
// 实例化Vue
new Vue({
  // 初始化之前的生命周期回调
  beforeCreate () {
    // 定义一个事件总线的属性
    Vue.prototype.$bus = new Vue()
  },
  // 渲染组件
  render: h => h(App),
  // 配置路由器
  router,
  // 注册vuex的store
  store
}).$mount('#app')
