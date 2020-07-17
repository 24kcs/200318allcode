<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--头部-->
      <Header :addTodo="addTodo" />
      <!--主体部分,列表部分-->
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <!--底部-->
      <Footer />
    </div>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入List组件
import List from './components/List'
// 引入Footer组件
import Footer from './components/Footer'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  // data是回调函数,内部是返回数据对象,现在是脚手架,
  data() {
    return {
      todos: [
        { id: 1, title: '强哥', isCompleted: false },
        { id: 2, title: '超哥', isCompleted: true },
        { id: 3, title: '峰哥', isCompleted: false }
      ]
    }
  },
  methods: {
    // 添加数组数据的方法
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除数组数据的方法
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换选中状态的方法
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    }
  }
}
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
