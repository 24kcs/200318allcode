// 引入二次封装的axios,现在的名字是request
import request from '@/utils/request'
// 公共的地址
const API_NAME = '/admin/product/baseTrademark'
// 导出默认的模块
export default {
  // 根据页码及每页的条数获取品牌信息列表数据
  getTrademarkList (page, limit) {
    return request({
      url: `${API_NAME}/${page}/${limit}`,
      method: 'GET',
    })
    // 或者
    // return request.get(`${API_NAME}/${page}/${limit}`)
  },
  // 添加品牌信息数据
  addTrademark (trademark) {
    return request({
      url: `${API_NAME}/save`,
      method: 'POST',
      data: trademark
    })
    // 或者
    // return request.post(`${API_NAME}/save`,trademark)
  },
  // 修改(更新)品牌信息数据
  updateTrademark (trademark) {
    return request({
      url: `${API_NAME}/update`,
      method: 'PUT',
      data: trademark
    })
    // 或者
    // return request.put(`${API_NAME}/update`,trademark)
  },

  // 移除品牌信息数据
  deleteTrademark (id) {
    return request({
      url: `${API_NAME}/remove/${id}`,
      method: 'DELETE'
    })
    // 或者
    // return request.delete(`${API_NAME}/remove/${id}`)
  }
}