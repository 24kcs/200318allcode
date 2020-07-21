// 引入storageUtils中的uuid
import { getUUID } from '@/utils/storageUtils'
// 引入api接口函数
import { reqLogin, reqRegister, reqLoginOut } from '@/api'
const state = {
  // 用户信息对象
  userInfo: {},
  // 临时用户id凭证
  userTempId: getUUID()
}
const mutations = {
  // 登录后直接修改用户的相关信息
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 退出后直接修改用户的相关信息----清空用户信息
  RESET_USER_INFO (state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login ({ commit }, { mobile, password }) {
    // 调用api接口实现登录操作
    const result = await reqLogin(mobile, password)
    if (result.code === 200) {
      // 获取用户信息
      const userInfo = result.data
      // 提交mutation
      commit('RECEIVE_USER_INFO', userInfo)
    } else {
      // 失败了
      throw new Error(result.message || '登录失败了')
    }
  },
  // 注册
  async register ({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    // 只处理失败情况
    if (result.code !== 200) {
      throw new Error(result.message || '注册失败了')
    }
  },

  // 退出
  async loginOut ({ commit }) {
    const result = await reqLoginOut()
    if (result.code === 200) {
      // 退出成功
      commit('RESET_USER_INFO')
    } else {
      // 失败了
      throw new Error(result.message || '退出失败')
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}