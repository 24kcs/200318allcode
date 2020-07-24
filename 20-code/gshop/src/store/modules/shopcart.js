// 和购物车相关的vuex数据
// 引入api接口函数
import { reqAddToCart, reqShopCartList, reqDeleteCartItem, reqChangeCheckedCartItem } from '@/api'
const state = {
  // 获取购物车中相关的数据数组
  shopCartList: []
}
const mutations = {
  // 直接修改购物车商品信息数据列表
  RECEIVE_SHOP_CART_LIST (state, shopCartList) {
    state.shopCartList = shopCartList
  }

}
const actions = {
  // 添加购物车操作
  async addToCart1 ({ commit }, { skuId, skuNum, callback }) {
    // 发送异步请求添加购物车数据
    const result = await reqAddToCart(skuId, skuNum)
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
    const result = await reqAddToCart(skuId, skuNum)
    return result.code === 200 ? '' : result.message || '添加失败'
  },
  // 添加购物车操作---进行数量的修改
  async addToCart3 ({ commit,dispatch }, { skuId, skuNum }) {
    // 发送异步请求添加购物车数据
    const result = await reqAddToCart(skuId, skuNum)
    if(result.code===200){
      // 成功了---直接调用其他的action也可以的
      dispatch('getShopCartList') 
    }else{
      // 直接内部处理错误信息,外部就不需要处理了
      alert(result.message||'修改数量操作失败')
      // 失败了----返回了,外部需要做处理
      // return result.message||'操作失败'
    }
  },
  // 获取购物车商品信息数据列表
  async getShopCartList ({ commit }) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit('RECEIVE_SHOP_CART_LIST', result.data)
    }
  },
  // 删除购物车中某个购物项的操作
  async deleteCartItem1 ({ commit }, skuId) {
    // 调用删除购物车当中某一项商品的api接口函数---删除某个购物项
    const result = await reqDeleteCartItem(skuId)
    return result.code === 200 ? '' : result.message || '删除失败'
  },
  // 删除购物车中某个购物项的操作
  async deleteCartItem2 ({ commit }, skuId) {
    // 调用删除购物车当中某一项商品的api接口函数---删除某个购物项
    const result = await reqDeleteCartItem(skuId)
    // return result.code === 200 ? '' : result.message || '删除失败'
    if (result.code !== 200) {
      // 失败了,返回一个失败的promise
      throw new Error('删除失败了')
      // return new Error('删除失败了') // 不行
      // 下面的方式是可以返回一个失败的promise
      // return Promise.reject(new Error('删除失败了'))
    }
  },
  // 修改某个购物项的操作
  async checkCartItem ({ commit }, { skuId, isChecked }) {
    // 修改状态
    const result = await reqChangeCheckedCartItem(skuId, isChecked)
    if (result.code !== 200) {
      throw new Error('修改购物项选中状态失败')
    }
  }

}
const getters = {

  // 总数量
  totalCount (state) {
    // 遍历数据,判断当前的商品的isChecked===1 计算总数量
    return state.shopCartList.reduce((pre, item) => {
      // if (item.isChecked === 1) {
      //   return pre + item.skuNum
      // } else {
      //   return pre
      // }
      return item.isChecked === 1 ? pre + item.skuNum : pre
    }, 0)
  },
  // 总价格
  totalPrice (state) {
    // 获取总价格,还是要先判断当前的这个商品是否被选中,只有选中的情况下,才计算总价格
    return state.shopCartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuNum * item.skuPrice : pre
    }, 0)
  },
  // 是否全选
  isAllCheck (state) {
    // 只要是数组中的每个数据的isChecked 都是1,那么就证明都被选中了,所以,全选的复选框的✔就该选中,只要是有一个商品的isChecked是0,那么就返回false
    return state.shopCartList.length > 0 && state.shopCartList.every(item => item.isChecked === 1)
  },
  // 获取所有选中的商品
  selectedCartItems (state) {
    return state.shopCartList.filter(item => (item.isChecked === 1))
    // 遍历购物项数组的过程中,判断当前的购物项是否选中,如果选中了,我就把这个选中的购物项放在一个pre数组中
    // return state.shopCartList.reduce((pre, item) => {
    //   return item.isChecked === 1 ? pre.push(item) : pre
    // }, [])
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}