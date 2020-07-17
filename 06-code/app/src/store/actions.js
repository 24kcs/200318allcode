// 包含了多个间接修改状态数据的方法的对象
// 引入axios
import axios from 'axios'
// 引入mutation的type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-type'
export default {
  // 发送请求---异步操作的方法---称为:action
  async search ({ commit }, searchName) {
    // 发送请求,修改状态数据
    const url = `https://api.github.com/search/users`
    // 第一次更改状态数据
    commit(REQUEST)
    try {
      // 发送请求
      const response = await axios.get(url, {
        params: {
          q: searchName
        }
      })
      // 获取响应后的数据中的数组数据,同时对数组中的数据(每个对象)进行属性的筛选
      const users = response.data.items.map(user => ({
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url
      }))
      // 第二次更改状态数据
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 第三次的更改状态数据
      commit(REQ_ERROR, error)

    }
  }
}