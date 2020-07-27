<template>
  <div>
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
// 引入混合文件(混入)
import { cpMixin } from './mixins'
export default {
  name: 'Son',
  mixins: [cpMixin],
  data() {
    return {
      money: 30000,
    }
  },
  methods: {
    // // 借钱的方法
    // pullMoney(money) {
    //   this.money -= money
    // },
    // gaveMoney(money){
    //   this.money-=money
    //   // 修改父级组件的数据
    //   this.$parent.money+=money
    // }
  },
}
</script>
