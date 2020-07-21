// 引入api接口函数
import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'
export default {
  state: {
    // 三级分类信息状态数据
    baseCategoryList: [],
    // 轮播图数据
    banners: [],
    // 楼层数据
    floors: []
  },
  mutations: {
    // 直接修改三级分类信息数据
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      // 数据太多了,最后两个不要了
      state.baseCategoryList = baseCategoryList.splice(0, baseCategoryList.length - 2)
    },
    // 直接修改轮播图数据
    RECEIVE_BANNERS (state, banners) {
      state.banners = banners
    },
    // 直接修改楼层数据
    RECEIVE_FLOORS (state, floors) {
      state.floors = floors
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
    },
    // 发送异步请求,获取轮播图数据
    async getBanners ({ commit }) {
      const result = await reqBanners()
      if (result.code === 200) {
        commit('RECEIVE_BANNERS', result.data)
      }
    },
    // 发送异步请求,获取楼层数据
    async getFloors ({ commit }) {
      const result = await reqFloors()
      if (result.code === 200) {
        commit('RECEIVE_FLOORS', result.data)
      }
    }
  },
  getters: {}
}