<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <!-- <Footer :todos="todos" :checkAllTodos="checkAllTodos" /> -->
      <Footer :todos="todos" :checkAllTodos="checkAllTodos">
        <label slot="left">
          <input type="checkbox" v-model="checkAll" />
        </label>
        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{this.todos.length}}
        </span>
        <button class="btn btn-danger" slot="right">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
// 引入组件
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
// 引入storage
import storage from './storage'
import PubSub from 'pubsub-js'
export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer
  },
  data() {
    return {
      // todos: [
      //   { id: 1, title: '宝马', isCompleted: false },
      //   { id: 2, title: '奔驰', isCompleted: true },
      //   { id: 3, title: '奥迪', isCompleted: false }
      // ]
      // todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      todos: storage.getStorage()
    }
  },
  mounted() {
    // 消息订阅
    this.token = PubSub.subscribe('deleteTodo', (msg, data) => {
      this.deleteTodo(data)
    })
    this.$bus.$on('toggleTodo', todo => {
      this.toggleTodo(todo)
    })
  },
  beforeDestroy() {
    // 取消消息订阅
    PubSub.unsubscribe(this.token)
    // 解绑
    this.$bus.$off()
  },
  methods: {
    // 添加todo操作
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除操作
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换选中
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 选中所有
    checkAllTodos(isChecked) {
      this.todos.forEach(item => {
        item.isCompleted = isChecked
      })
    }
  },
  watch: {
    todos: {
      deep: true,
      // handler: function(val) {
      //   localStorage.setItem('todos_key', JSON.stringify(this.todos))
      // }
      handler: storage.setStorage
    }
  },
  computed: {
    count() {
      return this.todos.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      )
    },
    checkAll: {
      get() {
        return this.todos.length === this.count && this.count > 0
      },
      set(val) {
        this.checkAllTodos(val)
      }
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
