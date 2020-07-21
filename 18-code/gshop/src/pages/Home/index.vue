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
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!--楼层-->
    <!--商标-->
    <Brand />
  </div>
</template>
<script>
// 引入所有需要的组件对象
import components from './components'
// 引入vuex辅助函数
import {mapState} from 'vuex'
export default {
  name: 'Home',
  // 注册组件
  components,
  computed: {
    ...mapState({
      floors:state=>state.home.floors
    })
  },
  mounted() {
    // console.log('2')
    // 提交action,发送请求,获取轮播图和楼层数据
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>