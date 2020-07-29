// 引入二次封装的axios,现在的名字是request
import request from '@/utils/request'
// 公共的地址
const API_NAME = '/admin/product'
// 导出默认的模块
export default {
  // 获取所有的销售属性数据
  getBaseSaleAttrList () {
    return request.get(`${API_NAME}/baseSaleAttrList`)
  },
  // 根据spuId来删除某个对应的spu对象
  deleteSpu (spuId) {
    return request.delete(`${API_NAME}/deleteSpu/${spuId}`)
  },

  // 根据spuId获取spu详情信息---对象信息
  getSpuInfoBySpuId (spuId) {
    return request.get(`${API_NAME}/getSpuById/${spuId}`)
  },
  // 添加/修改spu信息数据
  addOrUpdateSpuInfo (spuInfo) {
    return request.post(`${API_NAME}/${spuInfo.id ? 'update' : 'save'}SpuInfo`, spuInfo)
  },
  // 根据页码/每页的条数/三级分类的id来获取 spu信息数据列表数组
  getSpuList (page, limit, category3Id) {
    return request.get(`${API_NAME}/${page}/${limit}`, { params: { category3Id } })
  }
}