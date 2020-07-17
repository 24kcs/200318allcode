<template>
  <div>
    <h2>点击次数:{{count}},偶数or奇数:{{evenOrOdd}}</h2>
    <hr />
    <button @click="increment">increment+</button>
    <button @click="decrement">decrement-</button>
    <button @click="incrementOrOdd">incrementOrOdd+</button>
    <button @click="incrementAsync">incrementAsync+</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      // 属性---->数据---->由于该数据的值经常发生变化,也可以认为是状态在发生变化,此时该数据我们也可以称为:状态数据
      count: 0
    }
  },
  computed: {
    evenOrOdd() {
      return this.count % 2 === 0 ? '偶数' : '奇数'
    }
  },
  methods: {
    // 加的操作
    increment() {
      this.count++
    },
    // 减的操作
    decrement() {
      this.count--
    },
    // 奇数的时候加
    incrementOrOdd() {
      if (this.count % 2 !== 0) {
        this.count++
      }
    },
    // 异步的加
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  }
}
</script>
<style scoped>
</style>