// 导入和导出的复习
// 默认导出
export default {
  age: 18
}
// 分别导出
export const num1 = 100
export function f1 () { }

// 统一导出
const name1 = '小明'
const name2 = '小红'
export {
  name1,
  name2
}
const name3 = '小黄'
const name4 = '小绿'
export {
  name3,
  name4
}