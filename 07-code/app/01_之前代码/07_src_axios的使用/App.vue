<template>
  <div>
    <h2 v-if="!repUrl">正在加载中...</h2>
    <h2 v-else>
      Most Star is
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      repUrl: '', // 存储地址的
      repName: '' // 存储的是名字
    }
  },
  // 页面加载后的生命周期回调
  mounted() {
    // 发送异步请求
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    axios
      .get(url)
      .then(response => {
        // 获取响应成功后的数据对象中的数组中的第一个对象数据
        const result = response.data.items[0]
        // 获取数组中第一个数据, 第一个数据中: 名字:Vue ,地址,Vue的地址
        // console.log(result)
        // 更新data对象中的状态数据
        this.repUrl = result.html_url
        this.repName = result.name
      })
      .catch(error => {
        // 错误信息
        console.log(error)
      })
  }
}
</script>
<style scoped>
</style>