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
// 引入Vuex的辅助函数
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
// 引入mutation的type
import {INCREMENT,DECREMENT} from './vuex/mutation-type'
export default {
  name: 'App',
  computed: {
   
    // count(){
    //   return this.$store.state.count
    // },
    // evenOrOdd(){
    //   return this.$store.getters.evenOrOdd
    // }
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  
  },
  methods: {
    // 加的操作
    // increment() {
    //   // 可以调用actions中的某个action来实现对应的效果,但是需要使用dispatch方法找对应的action
    //   // this.$store.dispatch('increment')
    //   // 可以直接调用mutations中某个mutation来实现对应的效果,但是需要使用commit方法找对应的mutation
    //   this.$store.commit('INCREMENT')
    // },
    // // 减的操作
    // decrement() {
    //   this.$store.commit('DECREMENT')
    // },
    ...mapMutations({increment:INCREMENT,decrement:DECREMENT}),
    ...mapActions(['incrementOrOdd','incrementAsync'])
    // ...mapActions({incrementOrOdd:'incrementOrOdd',incrementAsync:'incrementAsync'})
    // 奇数的时候加
    // incrementOrOdd() {
    //   this.$store.dispatch('incrementOrOdd')
    // },
    // // 异步的加
    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // }
  }
}
</script>
<style scoped>
</style>