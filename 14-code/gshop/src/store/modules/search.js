// 引入api接口函数
import { reqProductList } from '@/api'
const state = {
  // 商品信息数据对象
  productList: {}
}
const mutations = {
  // 直接修改商品信息数据对象
  RECEIVE_PRODUCR_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  // 获取商品信息数据对象
  async getProductList ({ commit }, searchParams) {
    // 异步请求
    const result = await reqProductList(searchParams)
    // 判断是否成功
    if (result.code === 200) {
      commit('RECEIVE_PRODUCR_LIST', result.data)
    }
  }
}
const getters = {
  // 根据状态数据获取品牌信息数据数组
  trademarkList (state) {
    return state.productList.trademarkList || []
  },
  // 根据状态数据获取平台属性数据数组
  attrsList (state) {
    return state.productList.attrsList || []
  },
  // 根据状态数据获取产品信息列表
  goodsList (state) {
    return state.productList.goodsList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}