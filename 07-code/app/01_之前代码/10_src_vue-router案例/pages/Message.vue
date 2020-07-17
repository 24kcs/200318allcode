<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/message/detail/${m.id}`"> {{m.title}}</router-link>
        ---
        <button @click="pushHandle(m.id)">push查看</button>
        ---
        <button @click="replaceHandle(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data() {
    return {
      messages: [] // 用来存储数据
    }
  },
  // 界面加载后的生命周期回调
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 3, title: 'message003' },
        { id: 5, title: 'message005' }
      ]
    }, 1000)
    console.log(this)
  },
  methods: {
    // 编程式路由---离不开路由器对象--->$router
    pushHandle(id){
      this.$router.push(`/home/message/detail/${id}`)
    },
    replaceHandle(id){
      this.$router.replace(`/home/message/detail/${id}`)
    },
  }
}
</script>
<style scoped>
</style>