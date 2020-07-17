// 引入api接口函数
import { reqBaseCategoryList } from '@/api'
export default {
  state: {
    // 三级分类信息状态数据
    baseCategoryList: []
  },
  mutations: {
    // 直接修改三级分类信息数据
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      // 数据太多了,最后两个不要了
      state.baseCategoryList = baseCategoryList.splice(0,baseCategoryList.length-2)
    }
  },
  actions: {
    // 发送异步请求,获取三级分类信息状态数据
    async getBaseCategoryList ({ commit }) {
      // 调用api接口函数
      const result = await reqBaseCategoryList()
      if (result.code === 200) {
        // 获取响应回来的状态数据
        const baseCategoryList = result.data
        commit('RECEIVE_BASE_CATEGORY_LIST', baseCategoryList)
      }
    }
  },
  getters: {}
}