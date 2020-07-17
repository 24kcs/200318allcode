<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName" />
      <button @click="searchHandle">Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      searchName: '' // 获取用户在文本框中输入的数据
    }
  },
  methods: {
    // 点击按钮的回调函数
    searchHandle() {
      // 获取文本框中的数据
      const searchName = this.searchName.trim() // 清空格
      // 判断用户是否输入了数据
      if (searchName) {
        // 发送请求---提交对应的action
        this.$store.dispatch('search',searchName)
       
        // 清空文本框
        this.searchName = ''
      }
    }
  }
}
</script>
<style scoped>
</style>