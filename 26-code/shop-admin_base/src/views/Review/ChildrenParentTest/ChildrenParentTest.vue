<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1">找儿子小明借100元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney2">找女儿小红借200元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney3">找所有孩子借500元钱</button>
    <br />
    <hr />
    <Son ref="son" />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data() {
    return {
      money: 1000,
    }
  },
  components: {
    Son,
    Daughter,
  },
  methods: {
    // 主动的找儿子借钱
    borrowMoney1() {
      // 父级组件直接调用子级组件的数据进行操作
      // 直接修改子级的数据
      // this.$refs.son.money -= 100

      // 比较好的方式:子级组件中有修改数据的方法,让父级组件来调用
      this.$refs.son.pullMoney(100)
      this.money += 100
    },

    // 找女儿借钱
    borrowMoney2() {
      // 父级组件直接调用子级组件的数据进行操作
      // 直接修改子级的数据
      // this.$refs.son.money -= 100

      // 比较好的方式:子级组件中有修改数据的方法,让父级组件来调用
      this.$refs.dau.pullMoney(200)
      this.money += 200
    },

    // 找所有的子女借钱
    borrowMoney3() {
      // 把所有的子级组件都获取到----$children
      this.$children.forEach((child) => {
        child.pullMoney(500)
        this.money += 500
      })
    },
  },
}
</script>

<style>
</style>
