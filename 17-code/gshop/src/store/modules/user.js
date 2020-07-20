// 引入storageUtils中的uuid
import { getUUID } from '@/utils/storageUtils'
const state = {
  // 用户信息对象
  userInfo: {},
  // 临时用户id凭证
  userTempId: getUUID()
}
const mutations = {}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}