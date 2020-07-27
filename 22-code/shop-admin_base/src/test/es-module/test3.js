// 1. 导入 并 导出 默认导出的模块
export { default as test1 } from './test1'
// 2. 导入 并 导出 分别导出的模块
export { num1, f1 } from './test1'
// 3. 导入 并 导出 统一导出的模块
export { name1, name2, name3, name4 } from './test1'
// 导入所有的模块是不支持导出的
// export * as obj from './test1'
