
// 包含了多个直接修改状态数据的方法的对象

// 引入type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-type'
export default {
  // 发送请求的时候,修改状态数据
  [REQUEST] (state) {
    state.firstView = false
    state.loading = true
  },

  // 响应成功后获取数据的时候,需要修改状态数据
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },

  // 如果报错了,需要修改状态数据
  [REQ_ERROR] (state, error) {
    state.loading = false
    state.errorMsg = error
  }
}