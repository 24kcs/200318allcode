// 引入api接口函数
import { reqDetailInfo } from '@/api'
const state = {
  // 商品详情对象
  detailInfo: {}
}
const mutations = {
  // 直接修改商品详情信息对象数据
  RECEIVE_DETAIL_INFO (state, detailInfo) {
    state.detailInfo = detailInfo
  }
}
const actions = {
  // 获取商品详情信息对象数据
  async getDetailInfo ({ commit }, skuId) {
    const result = await reqDetailInfo(skuId)
    if (result.code === 200) {
      commit('RECEIVE_DETAIL_INFO', result.data)
    }
  }
}
const getters = {
  // 三个级别的分类信息
  categoryView (state) {
    return state.detailInfo.categoryView || {}
  },
  // 销售属性信息数据数组
  spuSaleAttrList (state) {
    return state.detailInfo.spuSaleAttrList || []
  },
  // 产品信息对象
  skuInfo (state) {
    return state.detailInfo.skuInfo || {}
  },
  // 轮播图数据数组
  skuImageList (state) {
    const skuInfo = state.detailInfo.skuInfo || {}
    return skuInfo.skuImageList ? skuInfo.skuImageList : []
  }

 
}
export default {
  state,
  mutations,
  actions,
  getters
}