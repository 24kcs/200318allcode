<template>
  <div>
    <!--路由链接,用来配置路由的链接地址的-->
    <hr />
    <h2>
      <router-link to="/about">About菜单</router-link>
    </h2>
    <h2>
      <router-link to="/home">Home菜单</router-link>
    </h2>

    <hr />
    <!--路由视图,用来展示路由组件中内容的-->
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