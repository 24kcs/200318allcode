// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 包含了所有的状态数据的对象
const state = {
  count: 0
}
// 包含了直接修改状态数据的方法的对象
const mutations = {
  // mutations对象中的每个方法都可以叫mutation,所以,mutations对象中可以有多个mutation
  // 加的操作
  INCREMENT (state) {
    state.count++
  },
  // 减的操作
  DECREMENT (state) {
    state.count--
  }
}
// 包含了间接修改状态数据的方法的对象
const actions = { // actions 中可以放异步操作的代码
  // actions对象中可以有多个action,每个方法都可以叫action
  // 加的操作
  increment (context) {
    // 提交的是mutations对象中的某个方法的名字
    context.commit('INCREMENT')
  },
  // 减的操作
  decrement ({ commit }) {
    commit('DECREMENT')
  },
  // 奇数的时候加
  incrementOrOdd ({ state, commit }) {
    if (state.count % 2 !== 0) {
      commit('INCREMENT')
    }
  },
  // 异步的加
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  }
}
// 包含了状态数据的计算属性的get方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}
// 实例化Vuex的Store并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
