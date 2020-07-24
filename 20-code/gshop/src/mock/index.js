// 引入mock,要拦截ajax请求,并返回随机生成的数据
import Mock from 'mockjs'
// 引入banners数据
import banners from './banners.json'
// 引入floors数据
import floors from './floors.json'
// 参数:对象,可以设计返回的数据的格式及内容
Mock.mock('/mock/banners', { code: 200, data: banners })
Mock.mock('/mock/floors', { code: 200, data: floors })


// Mock.mock('/mock/floors', { code: 200, data: [
//   {
//     id:'1',
//     name:'小明'
//   }
// ] })