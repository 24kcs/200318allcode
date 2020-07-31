// 1. 导入 默认导出的
import test1 from './test1'
import { default as test11 } from './test1'

// 2. 导入 分别导出的
import { num1, f1 } from './test1'

// 3. 导入 统一导出来的
import {name1,name2,name3,name4} from './test1'

// 4. 导入所有的模块
import * as obj from './test1'
console.log(test1)
console.log(test11)
console.log('==================')
console.log(num1)
console.log(f1)
console.log('=====================')
console.log(name1,name2,name3,name4)
console.log('=====================')
console.log(obj)
console.log('===============')
console.log(obj.default.age)

// 如果导入的是所有的模块,返回来的是一个对象,通过该对象可以调用所有模块中的内容