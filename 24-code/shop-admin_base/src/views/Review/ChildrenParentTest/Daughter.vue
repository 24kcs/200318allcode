<template>
  <div>
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
// 引入混合文件(混入)
import { cpMixin } from './mixins'
export default {
  name: 'Daughter',
  mixins: [cpMixin],
  data() {
    return {
      money: 20000,
    }
  },
  methods: {
    // pullMoney(money) {
    //   this.money -= money
    // },
    // gaveMoney(money) {
    //   this.money -= money
    //   // 修改父级组件的数据
    //   this.$parent.money += money
    // },
  },
}
</script>
