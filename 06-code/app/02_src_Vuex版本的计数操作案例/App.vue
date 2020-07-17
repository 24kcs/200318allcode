<template>
  <div>
    <h2>点击次数:{{$store.state.count}},偶数or奇数:{{$store.getters.evenOrOdd}}</h2>
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
  methods: {
    // 加的操作
    increment() {
      // 可以调用actions中的某个action来实现对应的效果,但是需要使用dispatch方法找对应的action
      // this.$store.dispatch('increment')
      // 可以直接调用mutations中某个mutation来实现对应的效果,但是需要使用commit方法找对应的mutation
      this.$store.commit('INCREMENT')
    },
    // 减的操作
    decrement() {
      this.$store.commit('DECREMENT')
    },
    // 奇数的时候加
    incrementOrOdd() {
      this.$store.dispatch('incrementOrOdd')
    },
    // 异步的加
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}

// 程序员A封装的函数
// function add(x, y) {
//   if (x && y) {
//     return Math.max(x, y)
//   }
// }
// // 这是程序员B调用程序员A的函数
// console.log(add(10, 20))
// console.log(Math.max(10, 20))
</script>
<style scoped>
</style>