
// 引入二次封装的axios,现在的名字是request
import request from '@/utils/request'
// 公共的地址
const API_NAME = '/admin/product'
// 导出默认的模块
export default {
  // 下架
  cancelSale (skuId) {
    return request.get(`${API_NAME}/cancelSale/${skuId}`)
  },
  // 根据skuId删除对应的sku对象
  deleteSkuBySkuId (skuId) {
    return request.delete(`${API_NAME}/deleteSku/${skuId}`)
  },
  // 根据spuId获取sku对象信息列表数组数据
  getSkuListBySpuId (spuId) {
    return request.get(`${API_NAME}/findBySpuId/${spuId}`)
  },
  // 根据skuId获取对应的sku对象详情信息
  getSkuInfoBySkuId (skuId) {
    return request.get(`${API_NAME}/getSkuById/${skuId}`)
  },
  // 根据页码和每页条数获取sku列表信息数据数组
  getSkuList (page, limit) {
    return request.get(`${API_NAME}/list/${page}/${limit}`)
  },
  // 上架
  onSale (skuId) {
    return request.get(`${API_NAME}/onSale/${skuId}`)
  },
  // 添加或者修改 sku对象
  addOrUpdateSkuInfo (skuInfo) {
    return request.post(`${API_NAME}/${skuInfo.id ? 'update' : 'save'}SkuInfo`, skuInfo)
  },
  // 根据spuId获取当前的spu中的所有的图片信息数据数组
  getSpuImageListBySpuId (spuId) {
    return request.get(`${API_NAME}/spuImageList/${spuId}`)
  },
  // 根据spuId获取当前的spu中的销售属性数据数组
  getSpuSaleAttrListBySpuId (spuId) {
    return request.get(`${API_NAME}/spuSaleAttrList/${spuId}`)
  }
}

