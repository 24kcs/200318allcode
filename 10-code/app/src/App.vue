<template>
  <div>
    <div class="navContainer">
      <div class="nav">
        <router-link to="/home">Home路由链接</router-link>
      </div>
      <div class="nav">
        <!-- <router-link to="/about">About路由链接</router-link> -->
        <!--params的方式传参-->
        <!-- <router-link to="/about/123">About路由链接</router-link> -->
        <!--query的方式传参-->
        <!-- <router-link to="/about?id=100">About路由链接</router-link> -->
        <!--meta的方式传参-->
        <!-- <router-link to="/about">About路由链接</router-link> -->
        <!--props的布尔方式-->
        <!-- <router-link to="/about">About路由链接</router-link> -->
        <!--props的对象模式-->
        <!-- <router-link to="/about">About路由链接</router-link> -->
        <!--props的函数模式-->
        <router-link to="/about">About路由链接</router-link>
      </div>
    </div>
    <router-view></router-view>
    <hr />
    <!-- <p>{{$route.params.id}}</p>
    <p>{{$route.query.id}}</p>
    <p>{{$route.meta.showMsg}}</p>-->
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.navContainer
  width 100%
  height 80px
  display flex
  .nav
    width 50%
    height 80px
    line-height 80px
    text-align center
    border-bottom 2px solid green
</style>