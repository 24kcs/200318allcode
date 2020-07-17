<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.13="add" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  // 接收父级组件的数据
  props: {
    addTodo: {
      type: Function, // 类型
      required: true // 必须的
    }
  },
  data() {
    return {
      title: '' // 文本框中的输入数据
    }
  },
  methods: {
    // 回车实现添加数据操作的回调函数
    add() {
      // 1. 获取文本框输入的数据
      const title = this.title.trim() // 切掉两端的空格
      // 2. 判断文本框是否有数据
      if (title) {
        // 3. 定义对象
        const todo = {
          id: Date.now(),
          title,
          isCompleted: false
        }
        // 4. 调用父级组件的方法添加对象
        this.addTodo(todo)
        // 5. 清空文本框数据
        this.title = ''
      }
    }
  }
}
</script>
<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
