<template>
  <li
    @mouseenter="mouseHandle(true)"
    @mouseleave="mouseHandle(false)"
    :style="{color:myColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isChecked" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>
<script>
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  // 接收父级组件传递过来的数据(此时接收的List组件传递过来的)
  props: {
    // 接收的todo应该是个对象类型
    todo: Object,
    // deleteTodo: Function,
    index: Number
   
  },
  data() {
    return {
      myColor: 'black',
      bgColor: 'white',
      isShow: false
    }
  },
  computed: {
    isChecked: {
      get() {
        return this.todo.isCompleted
      },
      set() {
        // 修改父级组件中的数组中的某个对象中的某个属性的值
        // this.toggleTodo(this.todo)
        // 分发事件
        this.$bus.$emit('toggleTodo',this.todo)
      }
    }
  },
  methods: {
    // 鼠标进入和离开事件的回调函数
    mouseHandle(flag) {
      if (flag) {
        // 鼠标进入
        this.myColor = 'green'
        this.bgColor = 'pink'
        this.isShow = true
      } else {
        // 鼠标离开
        this.myColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 点击删除按钮的回调函数
    delTodo() {
      // 提示信息
      if (window.confirm('确定要删除吗')) {
        // this.deleteTodo(this.index)
        // 消息的发布
        PubSub.publish('deleteTodo', this.index)
      }
    }
  }
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
