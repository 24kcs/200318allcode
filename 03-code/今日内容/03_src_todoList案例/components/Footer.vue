<template>
  <div class="todo-footer">
    <slot name="left" />
    <slot name="center" />
    <slot name="right" />
  </div>
</template>
<script>
export default {
  name: 'Footer'
  // props: {
  //   todos: Array,
  //   checkAllTodos: Function
  // },
  // computed: {
  //   count() {
  //     return this.todos.reduce(
  //       (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
  //       0
  //     )
  //   },
  //   checkAll: {
  //     get() {
  //       return this.todos.length === this.count && this.count > 0
  //     },
  //     set(val) {
  //       this.checkAllTodos(val)
  //     }
  //   }
  // }
}
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
