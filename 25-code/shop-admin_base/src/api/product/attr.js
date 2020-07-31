// 引入二次封装的axios,现在的名字是request
import request from '@/utils/request'
// 公共的地址
const API_NAME = '/admin/product'
// 导出默认的模块
export default {
  // 根据三级分类的id获取平台属性列表数据
  getAttrList (category1Id, category2Id, category3Id) {
    // return request({
    //   url: `${API_NAME}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    //   method: 'GET'
    // })
    return request.get(`${API_NAME}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
  },
  // 添加/修改平台属性
  addOrUpdateAttr (attr) {
    // return request({
    //   url:`${API_NAME}/saveAttrInfo`,
    //   method:'POST',
    //   data:attr
    // })
    return request.post(`${API_NAME}/saveAttrInfo`, attr)
  },
  // 删除平台属性
  deleteAttr (attrId) {
    return request.delete(`${API_NAME}/deleteAttr/${attrId}`)
  }
}