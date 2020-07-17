<template>
  <h2 v-if="firstView">请输入搜索内容...</h2>
  <h2 v-else-if="loading">正在发送请求中...</h2>
  <h2 v-else-if="errorMsg">错误信息为:{{errorMsg}}</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user,index) in users" :key="index">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      firstView: true, // 第一界面是展示的
      loading: false, // 第二个界面默认不展示
      errorMsg: '', // 用来存储错误信息的
      users: [] // 用来存储用户信息的
    }
  },
  // 页面加载后的生命周期回调
  mounted() {
    // 通过事件总线绑定一个 发送请求的事件
    this.$bus.$on('search', async searchName => {
      // console.log('发送请求,获取数据,展示数据',searchName)
      // 准备请求的地址
      const url = `https://api.github.com/search/users`
      // 第一次更改状态数据
      this.firstView = false
      this.loading = true
      try {
        // 发送请求
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })
        // 获取响应后的数据中的数组数据,同时对数组中的数据(每个对象)进行属性的筛选
        const users = response.data.items.map(user => ({
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url
        }))
        // 第二次更改状态数据
        this.loading = false
        this.users = users
      } catch (error) {
        // 报错了
        // 第三次的更改状态数据
        this.loading = false
        this.errorMsg = error
      }
    })
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>