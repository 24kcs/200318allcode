// 封装api接口函数
// 引入二次封装后的axios
import ajax from './ajax'
// http://182.92.128.115/api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
