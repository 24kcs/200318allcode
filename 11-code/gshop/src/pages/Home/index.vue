<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>
<script>
// 引入所有需要的组件对象
import components from './components'
export default {
  name: 'Home',
  // 注册组件
  components
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>