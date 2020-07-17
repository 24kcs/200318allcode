<template>
  <ul>
    <!-- <li>ID:{{$route.params.id}}</li> -->
    <li>ID:{{id}}</li>
    <li>TITLE:{{detail.title}}</li>
    <li>CONTENT:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  name: 'MessageDetail',
  props:['id'],
  data() {
    return {
      messageDetails: [
        { id: 1, title: 'message001', content: 'detail001' },
        { id: 3, title: 'message003', content: 'detail003' },
        { id: 5, title: 'message005', content: 'detail005' }
      ],
      detail: {} // 用来存储找到的数据
    }
  },
  // 页面加载后的生命周期回调----只执行一次
  mounted() {
    // console.log(this.$route.params.id)
    // 获取路由跳转的时候传过来的id值
    // const id = this.$route.params.id * 1
    // this.detail = this.messageDetails.find(message => message.id === id)
    this.showDetail(this.$route)
  },
  // 监视$route
  watch: {
    $route(val) {
      // val ---->$route
      // const id = val.params.id * 1
      // this.detail = this.messageDetails.find(message => message.id === id)
      this.showDetail(val)
    }
  },
  methods: {
    showDetail(route) {
      const id = route.params.id * 1
      this.detail = this.messageDetails.find(message => message.id === id)
    }
  }
}
</script>
<style scoped>
</style>