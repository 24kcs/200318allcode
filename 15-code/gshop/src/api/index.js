// 封装api接口函数
// 引入二次封装后的axios
import ajax from './ajax'
// 引入二次封装后的mockAjax
import mockAjax from './mockAjax'
// http://182.92.128.115/api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')


// 自己定义的接口,获取轮播图数据
export const reqBanners = () => mockAjax.get('/banners')
// 自己定义的接口,获取楼层的数据
export const reqFloors = () => mockAjax.get('/floors')


// 获取搜索界面的产品信息数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)