// 和购物车相关的vuex数据
// 引入api接口函数
import { reqAddToCart } from '@/api'
const state = {
  // 获取购物车中相关的数据数组,暂且不用
  shopList: []
}
const mutations = {

}
const actions = {
  // 添加购物车操作
  async addToCart1 ({ commit }, { skuId, skuNum ,callback}) {
    // 发送异步请求添加购物车数据
    const result = await reqAddToCart(skuId,skuNum)
    // 添加购物车操作成功或者失败
    if (result.code === 200) {
      // console.log('添加成功')
      callback('')
    } else {
      // console.log(result.message || '添加失败')
      callback(result.message || '添加失败')
    }
  },
  // 添加购物车操作
  async addToCart2 ({ commit }, { skuId, skuNum }) {
    // 发送异步请求添加购物车数据
    const result = await reqAddToCart(skuId,skuNum)
    return result.code===200?'':result.message||'添加失败'
  }

}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}