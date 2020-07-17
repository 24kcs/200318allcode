<template>
  <div class="todo-footer">
    <slot name="left" />
    <slot name="center" />
    <slot name="right" />
  </div>
</template>
<script>
export default {
  name: 'Footer',
  // props: {
  //   todos: Array,
  //   checkAllTodo: Function
  // },
  // computed: {
  //   count() {
  //     // 计算所有选中的数据的个数
  //     return this.todos.reduce(
  //       (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
  //       0
  //     )
  //   },
  //   checkAll: {
  //     get() {
  //       // 如果选中的个数和数组数据的个数相同并且数组中有数据,则全选
  //       return this.count === this.todos.length && this.todos.length > 0
  //     },
  //     set(val) {
  //       // 设置所有的数据全选或者全不选操作
  //       this.checkAllTodo(val)
  //     }
  //   }
  // },
  // mounted () {
  //   console.log(this.$bus)
  // }
}

// 1.报错 undfined 统一的问题,
// var obj = {

// }
// js是一门动态类型的语言,如果对象没有这个属性,点了(点语法),那么该对象就有了这个属性,如果该属性没有赋值,就是undefined
// 'age' of undefined---->都是前面的这个对象(name)是undefined造成的
// 什么东西可以调用属性或者方法--->对象
// console.log(obj.name.age)

// 2.reduce数组的方法(自己实现reduce的方法---关于自己实现数组方法的思路,友情提示:昨夜已经讲过了)
// var arr = [1, 2, 3, 4]
// var result = arr.reduce((pre, item) => pre + item,0)
// console.log(result)

// var pre = 0
// for (var i = 1; i <= 100; i++) {
//   pre += i
// }
</script>
<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
