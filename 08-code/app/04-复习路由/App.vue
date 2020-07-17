<template>
  <div>
    <!--使用路由,实现单页面应用的开发(SPA)-->
    <h2>
      <router-link to="/add">显示Add组件内容</router-link>
    </h2>

    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style scoped>
</style>