// 引入UUID
import UUID from 'uuidjs'
// 定义一个函数---->作用:用来产生临时id
export function getUUID () {
  // 先从浏览器的缓存中读取uuid数据
  let uuid = localStorage.getItem('UUID_KEY')
  // 判断该数据是否存在
  if (!uuid) {
    // 创建uuid数据---- 唯一的,123
    uuid = UUID.generate()
    // 立刻存储到浏览器的缓存中
    localStorage.setItem('UUID_KEY', uuid)
  }
  // 最终返回
  return uuid
}