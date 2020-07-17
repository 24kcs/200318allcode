// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 引入modules
import modules from './modules'
// 声明使用Vuex
Vue.use(Vuex)
// 暴露Vuex
export default new Vuex.Store({
  // 此时这里的总的state和mutations和actions和getters可以删除
  state, // 总的state
  mutations, // 总的mutations
  actions, // 总的actions
  getters, // 总的getters
  modules
})
// home就是modulesA模块的名字
// 如何访问home模块中的状态数据
// store.state.home.age
// vuex一旦模块化之后,组件中获取该状态数据的时候,写法也会有一些变化
// 原来写法:  computed:{...mapState(['age'])}
// 有了模块化之后,状态数据在组件中如何获取
// 现在的写法:computed:{ ...mapState({age:state=>state.home.age})}