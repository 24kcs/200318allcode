// /*
// 包含项目中n个组件可复用的js配置
// */
// 向外部暴露一个对象----多个组件中相同的结构的代码
export const cpMixin = {
  methods: {
    // 借钱的方法
    pullMoney(money) {
      this.money -= money
    },
    gaveMoney(money){
      this.money-=money
      // 修改父级组件的数据
      this.$parent.money+=money
    }
  }
}